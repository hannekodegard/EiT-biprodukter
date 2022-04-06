// views
import Home from "./views/Home";

// styles
import "./App.css";
import About from "./views/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Recipes from "./views/Recipes";
import Parts from "./components/parts";
import Recipe from "./views/Recipe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parts" element={<Parts />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
