import React from "react";

import YoutubeLogo from "./YoutubeLogo.jsx";

const Header = () => {
  return (
    <header>
      <div className="header-left">
        <i class="fa-solid fa-bars cursor-pointer text-lg p-2"></i>
        <a href="/">
          <YoutubeLogo />
        </a>
      </div>
      <div className="header-center">
        <input type="text" placeholder="Search" />
        <button>
          <i class="fa-solid fa-search"></i>
        </button>
      </div>
      <div className="header-right">
        <button>
          <i class="fa-solid fa-ellipsis-vertical cursor-pointer text-lg p-2"></i>
        </button>
        <div className="log-in">
          <i class="fa-solid fa-user text-xs p-2 border-2 rounded-full"></i>
          <span>Log in</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
