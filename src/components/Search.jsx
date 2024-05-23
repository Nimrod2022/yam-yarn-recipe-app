import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    navigate(`/cuisines/searched/${inputValue}`);
  };

  return (
    <div className="pt-10 flex flex-col justify-center items-center">
      <form
        onSubmit={handleInput}
        className="bg-blue-200 border rounded-lg w-[80%] md:w-[30%] p-2 flex items-center"
      >
        <FiSearch className="mr-2" />
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          className="outline-none bg-transparent"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Search;
