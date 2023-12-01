import fs from 'fs'
import cron from 'node-cron';
import axios from 'axios';
import { getGitHubFolderContent } from '../utils/githubApi';
import { filterMdFiles, getMetadataInfo } from '../utils/filters';
import { Product } from '../interfaces/IProduct';

const updateFileList = async (incubator: string) => {
  try {
    const response = await getGitHubFolderContent('betagouv', 'beta.gouv.fr', 'content/_startups');
    const folderContent = response.data.map(({ name, path, type }) => ({ name, path, type }));
    const mdFiles = filterMdFiles(folderContent);
    const host = 'https://raw.githubusercontent.com/betagouv/beta.gouv.fr/master/';
    const products: Product[] = [];

    await Promise.all(
      mdFiles.map(async ({ path }) => {
        try {
          const fileContentResponse = await axios.get(`${host}${path}`);
          const metadata = getMetadataInfo (fileContentResponse.data)

          if (metadata?.incubator === incubator) {
            console.log(`Matching file for incubator ${incubator}: ${path} status: ${metadata.phases[metadata.phases.length-1]}`);
            products.push({ title: metadata.title, path, phase: metadata.phases[metadata.phases.length - 1]});
          }
        } catch (error) {
          console.error(`Error fetching content for file at ${host}${path}:`, error);
        }
      })
    )

    // Store the matching file names in a JSON file
    const jsonFilePath = 'data/tmp.json';
    fs.writeFileSync(jsonFilePath, JSON.stringify([ ...products ], null, 2));

    console.log(`Matching files names stored in ${jsonFilePath}`);
  } catch (error) {
    console.error('Error fetching GitHub folder content:', error);
    throw error;
  }
};


// Schedule the cron job to run every 10 minutes
cron.schedule('*/1 * * * *', () => {
  console.log('Updating file list...');
  updateFileList("mission-apprentissage")
});

