import React, { useState } from "react";

const GitHubUserSearch: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (error) {
      //  setError(error.message);
      setUserData(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <div>Error: {error}</div>}

      {userData && (
        <div>
          <h2>User: {userData.login}</h2>
          <img
            src={userData.avatar_url}
            alt="User Avatar"
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <p>Bio: {userData.bio}</p>
          <p>Number of Repos: {userData.public_repos}</p>
          <p>
            Profile URL: <a href={userData.html_url}>{userData.html_url}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default GitHubUserSearch;
