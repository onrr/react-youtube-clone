import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <BrowserRouter>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route path="/video/:id" element={<Detail isOpen={isOpen} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
