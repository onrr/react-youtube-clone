import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Search from "./pages/Search.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "All";
  });

  return (
    <BrowserRouter>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              isOpen={isOpen}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route path="/video/:id" element={<Detail />} />
        <Route
          path="/search/:query"
          element={
            <Search
              isOpen={isOpen}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
