import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInput = (e) => {
    e.preventDefault();
    navigate(`/cuisines/searched/${inputValue}`);
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex  gap-4">
      {isExpanded ? (
        <form
          onSubmit={handleInput}
          className="flex items-center  px-10"
        >
          <input
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="outline-none rounded-md px-2 py-2  w-full  h-8"
          />
          <button type="submit" className="p-2">
            <img src="/assets/Search.svg" alt="" className="h-full" />
          </button>
        </form>
      ) : (
        <button onClick={toggleSearch} className="p-2">
          <img src="/assets/Search.svg" alt="" className="h-full" />
        </button>
      )}
    </div>
  );
}

export default Search;
