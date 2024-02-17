import "./App.css";
import Navbar from "./components/navbar/navbar";
import Placeholder from "./components/placeholder/placeholder";
import UserProfile from "./components/userProfile/userProfile";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  return (
    <>
      <Navbar />
      {!username ? <Placeholder /> : <UserProfile username={username} />}
    </>
  );
}

export default App;
