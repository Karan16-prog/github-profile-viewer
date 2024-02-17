import Placeholder from "./components/placeholder/placeholder";
import UserProfile from "./components/userProfile/userProfile";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let currentURL = window.location.href;
  const username = urlParams.get("username");

  return (
    <>
      {!username ? (
        <Placeholder url={currentURL} />
      ) : (
        <UserProfile username={username} />
      )}
    </>
  );
}

export default App;
