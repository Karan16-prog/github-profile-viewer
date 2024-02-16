import "./App.css";
import Navbar from "./components/navbar/navbar";
import Placeholder from "./components/placeholder/placeholder";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  return (
    <>
      <Navbar />
      {!username && <Placeholder />}
    </>
  );
}

export default App;
