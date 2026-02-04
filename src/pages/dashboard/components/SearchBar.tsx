import searchIcon from "../../../assets/icons/SearchIcon.svg";

const SearchBar = () => {
    return (
        <div className="flex-1 max-w-sm h-[45px] mb-5 rounded-xl border border-[#D1D5DC]">
          <div className="relative">
            <img src={searchIcon} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px]" />
            <input
              type="text"
              placeholder="Search"
              className="md:w-md w-full rounded-xl max-w-sm border-none py-2 pl-10 h-[45px] pr-4 text-md text-black placeholder:text-(--dark-text-gray) placeholder:font-medium focus:ring-2 focus:ring-transparent transition-all outline-none"
            />
          </div>
        </div>
    )
}

export default SearchBar
