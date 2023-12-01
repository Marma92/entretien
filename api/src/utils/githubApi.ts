// helpers/githubApi.ts
import axios, { AxiosResponse } from 'axios';
import { GitHubContent } from '../interfaces/IGitHubContent';

const GITHUB_API_BASE_URL = 'https://api.github.com';

/**
 * Get the content of a folder in a GitHub repository.
 * @param owner - Owner of the GitHub repository.
 * @param repo - GitHub repository name.
 * @param path - Path to the folder in the repository.
 * @returns Promise<AxiosResponse<GitHubContent[]>>
 */
export async function getGitHubFolderContent(owner: string, repo: string, path: string): Promise<AxiosResponse<GitHubContent[]>> {
  const url = `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/contents/${path}`;
  try {
    const response = await axios.get<GitHubContent[]>(url);
    return response;
  } catch (error) {
    throw error;
  }
}