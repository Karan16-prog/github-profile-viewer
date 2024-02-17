export interface GitHubUserProfile {
  login: string;
  bio?: string | null;
  avatar_url: string;
  public_repos: number;
}

export interface GithubRepo {
  name: string;
  description: string;
  topics: string[];
  id: string;
  node_id: string;
}
