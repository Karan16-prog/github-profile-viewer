import "./App.css";
import Placeholder from "./components/placeholder/placeholder";
import UserProfile from "./components/userProfile/userProfile";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  return (
    <>{!username ? <Placeholder /> : <UserProfile username={username} />}</>
  );
}

export default App;
