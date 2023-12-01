import fs from 'fs'
import cron from 'node-cron';
import { fetchProductMetadata } from '../utils/filters';

const jsonFilePath = 'data/tmp.json';

const updateFileList = async () => {
  try {
    const products =  await fetchProductMetadata('betagouv', 'beta.gouv.fr', 'content/_startups');
    // Store the matching file names in a JSON file
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
  updateFileList()
});

