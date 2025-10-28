import React from "react";
import categories from "../data/categories.json";

const Sidebar = ({ isOpen, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="sidebar" style={{ display: isOpen ? "block" : "none" }}>
      <nav>
        <ul className="category">
          {categories.categories.map((category, i) => (
            <li key={i}>
              <a
                href="/"
                className={`cursor-pointer ${
                  category.name === selectedCategory ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <i className={`fa-solid ${category.icon}`}></i>
                <span>{category.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <hr className="sm:mr-8 my-8" />
        <ul className="channels">
          <h3>Followed Channels</h3>
          <li>
            <a href="#">
              <i className="fa-solid fa-user-circle text-xl"></i>
              <span>Onur</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-user-circle text-xl"></i>
              <span>Onur 2</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-user-circle text-xl"></i>
              <span>Onur 3</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-user-circle text-xl"></i>
              <span>Onur 4</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
