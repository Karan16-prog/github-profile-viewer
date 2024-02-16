import React, { useState, useEffect } from "react";
import { githubAPI } from "../../constants";
import { GitHubUserProfile, GitHubUserRaw } from "../../interface";

const UserProfile = (username: string) => {
  const [userData, setUserData] = useState<GitHubUserProfile | null>(null);
  const [repositories, setRepositories] = useState([]);
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

  const fetchRepositories = async () => {
    try {
      const response = await fetch(`${githubAPI}${username}/repos`);
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const data = await response.json();
      setRepositories(data);
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

  if (!userData && errors.length === 0) {
    return <div>Loading...</div>;
  }
  return <div>UserProfile</div>;
};

export default UserProfile;
