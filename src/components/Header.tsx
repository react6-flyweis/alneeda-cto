import React from "react";
import { ChevronDown, Menu } from "lucide-react";
import searchIcon from "../assets/icons/SearchIcon.svg";
import greyChatIcon from "../assets/icons/greyChatIcon.svg";
import greyNotificationIcon from "../assets/icons/greyNotificationIcon.svg";
interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-19 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      <div className="flex items-center">
        {/* Hamburger for Mobile */}
        <button
          onClick={onMenuClick}
          className="md:mr-4 mr-2 md:p-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Search Section */}
        <div className="sm:block hidden flex-1 max-w-sm h-[45px] rounded-full bg-(--bg-light-blue) ml-2">
          <div className="relative">
            <img src={searchIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px]" />
            <input
              type="text"
              placeholder="Search"
              className="md:w-md w-full max-w-sm border-none rounded-full py-2 pl-10 h-[45px] pr-4 text-md text-black placeholder:text-black placeholder:font-medium focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 md:space-x-6">
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="text-gray-500 hover:text-gray-700 transition-colors p-2 md:p-0">
            <img src={greyChatIcon} alt="" className="w-6 h-6"/>
          </button>
          <button className="text-gray-500 hover:text-gray-700 transition-colors relative p-2 md:p-0">
            <img src={greyNotificationIcon} alt="" className="w-6 h-6"/>
            {/* <span className="absolute top-2 right-2 md:-top-1 md:-right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
          </button>
        </div>

        <div className="flex items-center space-x-2 md:space-x-3 cursor-pointer group">
          <div className="md:w-14 w-10 md:h-14 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all">
            <span className="text-blue-600 font-bold text-xs">CTO</span>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xl font-medium text-black">CTO</span>
          </div>
          <ChevronDown
            size={20}
            className="text-black group-hover:text-gray-600"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
