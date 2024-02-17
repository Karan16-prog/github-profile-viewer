import { useCallback, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loader from "../../assets/loader.gif";
import { githubAPI } from "../../constants";
import { GitHubUserProfile, GithubRepo } from "../../interface";
import ErrorWidget from "../errorWidget/errorWidget";
import RepoTable from "../userRepoTable/repoTable";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { username } = useParams();

  const [userData, setUserData] = useState<GitHubUserProfile | null>(null);
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [userExists, setUserExists] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`${githubAPI}${username}`);
      const data = await response.json();
      if (data?.message === "Not Found") {
        setUserExists(false);
        // throw new Error("User does not exist!");
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      setUserData({
        login: data?.login,
        bio: data?.bio ?? "",
        avatar_url: data?.avatar_url,
        public_repos: data?.public_repos,
      });
    } catch (error) {
      setErrors((prevErrors) => [
        ...prevErrors,
        error instanceof Error ? error.message : "Unknown error",
      ]);

      triggerErrorAlert(
        error instanceof Error ? error.message : "Unknown error"
      )();
    }
  }, [username]);

  const fetchRepositories = useCallback(
    async <T extends GithubRepo>(
      pageNumber: number = 1,
      pageCount: number = 10
    ) => {
      try {
        const response = await fetch(
          `${githubAPI}${username}/repos?per_page=${pageCount}&page=${pageNumber}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data: T[] = await response.json();

        const massagedData: GithubRepo[] = data.map((repo, idx) => ({
          id: `${pageNumber == 1 ? idx + 1 : idx + 1 + (pageNumber - 1) * 10}`,
          name: repo?.name,
          description: repo?.description || "",
          topics: repo?.topics || [],
          node_id: repo?.node_id,
        }));
        setRepositories(massagedData);
      } catch (error) {
        setErrors((prevErrors) => [
          ...prevErrors,
          error instanceof Error ? error.message : "Unknown error",
        ]);

        triggerErrorAlert(
          error instanceof Error ? error.message : "Unknown error"
        )();
      }
    },
    [username]
  );

  let errorAlertExecuted = false;

  // trigger error alert
  const triggerErrorAlert = (errorMessage: string) => {
    return () => {
      if (!errorAlertExecuted) {
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        // errorAlertExecuted = true;
      }
    };
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  if (!userData && errors.length === 0) {
    return (
      <div className="loader">
        <img src={loader} alt="Loading..." />
        <h4>One moment please...</h4>
      </div>
    );
  }

  return (
    <>
      {errors.length === 0 ? (
        <div className="profile-container">
          <UserDetails userData={userData} />

          <RepoTable
            repoData={repositories}
            repoCount={userData?.public_repos ?? 0}
            _fetchPage={fetchRepositories}
          />
        </div>
      ) : (
        <ErrorWidget userNotFound={userExists} />
      )}
    </>
  );
}

const UserDetails = ({ userData }: { userData: GitHubUserProfile | null }) => {
  return (
    <div className="profile-detail">
      <div>
        <img className="avatar" src={userData?.avatar_url} alt="User avatar" />
      </div>
      <div>
        <h2>{userData?.login}</h2>
        <p>{userData?.bio}</p>
        <h3>{userData?.public_repos} public repos!</h3>
      </div>
    </div>
  );
};

export default UserProfile;
