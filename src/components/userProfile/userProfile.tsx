import { useState, useEffect, useCallback } from "react";
import { githubAPI } from "../../constants";
import { GitHubUserProfile, GitHubUserRaw, GithubRepo } from "../../interface";
import RepoTable from "../repoTable/repoTable";
import loader from "../../assets/loader.gif";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserProfile({ username }: { username: string }) {
  const [userData, setUserData] = useState<GitHubUserProfile | null>(null);
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const fetchUserData = useCallback(async () => {
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
        console.error("Error fetching repositories:", error);
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
    fetchRepositories();
  }, [fetchUserData, fetchRepositories]);

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
          <div className="profile-detail">
            <div>
              <img
                className="avatar"
                src={userData?.avatar_url}
                alt="User avatar"
              />
            </div>
            <div>
              <h2>{userData?.username}</h2>
              <p>{userData?.bio}</p>
              <h3>{userData?.public_repos} public repos!</h3>
            </div>
          </div>
          <div>
            <RepoTable
              repoData={repositories}
              repoCount={userData?.public_repos ?? 0}
              fetchPage={fetchRepositories}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="error-container">
            <p>
              "Oops! Something went wrong. We're sorry, but it looks like there
              was an error processing your request. Please try again later.
            </p>
            <div>
              <a href="/">&nbsp; Go Back</a>
            </div>
          </div>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Bounce}
            theme="dark"
          />
        </>
      )}
    </>
  );
}

export default UserProfile;
