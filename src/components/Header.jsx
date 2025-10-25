import React from "react";

import YoutubeLogo from "./YoutubeLogo.jsx";

const Header = ({ isOpen, setIsOpen }) => {
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
      </div>
      <div className="header-center">
        <input type="text" placeholder="Search" />
        <button>
          <i className="fa-solid fa-search"></i>
        </button>
      </div>
      <div className="header-right">
        <a href="#">
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
