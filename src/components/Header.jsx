import React, { useState } from "react";

import YoutubeLogo from "./YoutubeLogo.jsx";
import { useNavigate } from "react-router-dom";

const Header = ({ isOpen, setIsOpen }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      navigate(`/search/${query}`);
      setQuery("");
    }
  };

  return (
    <header>
      <div className="header-left">
        <i
          className="fa-solid fa-bars cursor-pointer text-lg p-2"
          onClick={() => setIsOpen(!isOpen)}
        ></i>
        <a href="/">
          <YoutubeLogo />
        </a>
        <a
          href="/"
          className="sm:hidden -ml-2 flex items-center justify-center mt-1"
        >
          <i className="fa-brands fa-youtube cursor-pointer text-2xl text-red-500"></i>
        </a>
      </div>
      <form className="header-center" onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <i className="fa-solid fa-search"></i>
        </button>
      </form>
      <div className="header-right">
        <a href="#" className=" hidden sm:inline-block">
          <i className="fa-solid fa-ellipsis-vertical cursor-pointer text-lg p-2"></i>
        </a>
        <div className="log-in">
          <i className="fa-solid fa-user-circle text-2xl"></i>
          <span>Log in</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
