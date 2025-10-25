import "./App.css";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <Home isOpen={isOpen} />
    </>
  );
}

export default App;
