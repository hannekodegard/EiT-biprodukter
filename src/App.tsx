// views
import Home from "./views/Home";

// styles
import "./App.css";
import About from "./views/About";

function App() {
  const path = document.location.pathname.replace("/", "");
  return <div>{path === "about-us" ? <About /> : <Home />}</div>;
}

export default App;
