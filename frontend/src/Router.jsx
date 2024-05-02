import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import { Home, Recepies, Recipe } from "./pages/Pages";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recepies />} />
        <Route path="/recipes/:id" element={<Recipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
