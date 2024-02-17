import Placeholder from "./components/placeholder/placeholder";

function App() {
  let currentURL = window.location.href;

  return (
    <>
      <Placeholder url={currentURL} />
    </>
  );
}

export default App;
