import React, { useState, useEffect } from "react";
import { githubAPI } from "../../constants";
import { GitHubUserProfile, GitHubUserRaw, GithubRepo } from "../../interface";
import RepoTable from "../repoTable/repoTable";

function UserProfile({ username }: { username: string }) {
  const [userData, setUserData] = useState<GitHubUserProfile | null>(null);
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${githubAPI}${username}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data: GitHubUserRaw = await response.json();
      setUserData({
        username: data?.login,
        bio: data?.bio ?? "",
        avatar_url: data?.avatar_url,
        public_repos: data?.public_repos,
        private_profile: data?.type === "User" ? false : true,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrors((prevErrors) => [
        ...prevErrors,
        error instanceof Error ? error.message : "Unknown error",
      ]);
    }
  };

  const fetchRepositories = async <T extends GithubRepo>(
    pageNumber: number = 1,
    pageCount: number = 10
  ) => {
    try {
      // repos?per_page=10&page=1
      const response = await fetch(
        `${githubAPI}${username}/repos?per_page=${pageCount}&page=${pageNumber}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const data: T[] = await response.json();

      const simplifiedDat: GithubRepo[] = data.map((repo) => ({
        id: repo?.id,
        name: repo?.name,
        description: repo?.description || "", // Handling null description
        topics: repo?.topics || [], // Handling undefined topics
      }));
      setRepositories(simplifiedDat);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setErrors((prevErrors) => [
        ...prevErrors,
        error instanceof Error ? error.message : "Unknown error",
      ]);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchRepositories();
  }, [username]);

  useEffect(() => {
    console.log(repositories);
  }, [repositories]);

  if (!userData && errors.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <h2>{userData?.username}</h2>
        <p>Bio: {userData?.bio}</p>
        <p>Avatar: {userData?.avatar_url}</p>
        <h3>Repositories:{userData?.public_repos}</h3>
      </div>
      <div>
        <RepoTable
          repoData={repositories}
          repoCount={userData?.public_repos ?? 0}
        />
      </div>
    </div>
  );
}

export default UserProfile;
