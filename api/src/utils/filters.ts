import matter from "gray-matter";
import { GitHubContent } from "../interfaces/IGitHubContent";
import { Product } from "../interfaces/IProduct";
import { getGitHubFolderContent } from "./githubApi";
import axios from "axios";

/**
 * Filter GitHub content to include only .md files.
 * @param content - GitHub content to filter.
 * @returns GitHub content containing only .md files.
 */
export function filterMdFiles(content: GitHubContent[]): GitHubContent[] {
  return content
    .filter((item) => item.type === 'file' && item.name.endsWith('.md'))
    .map((item) => ({
      name: item.name,
      path: item.path,
      type: item.type,
    }));
}

/**
 * Get title, incubator and phases information from the front matter of a Markdown file.
 * @param markdownContent - Content of the Markdown file.
 * @returns Object with 'incubator' and 'phases' properties or null if not found.
 */
export function getMetadataInfo(markdownContent: string): { title: string; incubator: string; phases: string[] } | null {
  try {
    const { data } = matter(markdownContent);

    const metadata = {
      title: data.title,
      incubator: data.incubator,
      phases: data.phases.map((phase: { name: string }) => phase.name)
    };

    return metadata
  } catch (error) {
    console.error('Error parsing front matter:', error);
    return null;
  }
}


export async function fetchProductMetadata(owner: string, repository: string, path: string): Promise<Product[]> {
  const host = `https://raw.githubusercontent.com/${owner}/${repository}/master/`;
  const products: Product[] = [];

  const githubApiResponse = await getGitHubFolderContent(owner, repository, path);
  const mdFiles = filterMdFiles(githubApiResponse.data.map(({ name, path, type }) => ({ name, path, type })));

  await Promise.all(
    mdFiles.map(async ({ path }) => {
      try {
        const fileContentResponse = await axios.get(`${host}${path}`);
        const metadata = getMetadataInfo(fileContentResponse.data);

        if (metadata?.incubator === 'mission-apprentissage') {
          products.push({ title: metadata.title, path: `${host}${path}`, phase: metadata.phases[metadata.phases.length - 1] });
        }
      } catch (error) {
        console.error(`Error fetching content for file at ${host}${path}:`, error);
      }
    })
  );

  return products;
}
