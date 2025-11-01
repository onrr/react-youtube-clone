import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Search from "./pages/Search.jsx";
import Channel from "./pages/Channel.jsx";
import { useSelector } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/video/:id" element={<Detail />} />
        <Route path="/channel/:id" element={<Channel />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
