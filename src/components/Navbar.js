import React from "react";
import { ReactComponent as Logo } from "../assets/flight-svgrepo-com.svg";

const Navbar = () => {
  return (
    <nav className="nav flex flex-wrap sticky top-0 bg-white z-20 items-center justify-between px-4 shadow-md	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);">
      <div className="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest">
        <Logo />
        <span className="font-semibold text-xl tracking-tight">
          Find you flight
        </span>
      </div>

      <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
      <label
        className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
        for="menu-btn"
      >
        <span className="navicon bg-grey-darkest flex items-center relative"></span>
      </label>

      <ul className="menu border-b md:border-none flex justify-end items-center list-reset m-0 w-full md:w-auto">
        <li className="border-t md:border-none">
          <a
            href="#"
            className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
          >
            Home
          </a>
        </li>

        <li className="border-t md:border-none">
          <a
            href="#"
            className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
          >
            <div className="bg-indigo-950 flex justify-center py-2  text-white w-20 text-center hover:opacity-80  focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 text-center inline-flex items-center ">
              Login
            </div>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
