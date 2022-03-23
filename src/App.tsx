// views
import Home from "./views/Home";

// styles
import "./App.css";
import About from "./views/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Recipes from "./views/Recipes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </BrowserRouter>
  );
  // return <div>{path === "about-us" ? <About /> : <Home />}</div>;
}

export default App;
