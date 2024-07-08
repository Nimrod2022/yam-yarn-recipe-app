import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Searched() {
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  let params = useParams();

  const [searchedRecipe, setSearchedRecipe] = useState([]);

  useEffect(() => {
    getSearchedRecipe(params.search);
  }, [params.search]);

  const getSearchedRecipe = async (searchName) => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=3&query=${searchName}`
      );
      if (!api.ok) {
        throw new Error(`HTTP error! status: ${api.status}`);
      }
      const searchedData = await api.json();
      setSearchedRecipe(searchedData.results);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-[#D9D9D9] h-screen ">
      <div className="md:flex justify-between text-white md:w-5/6 xl:w-4/6 mx-auto  md:pt-20 ">
        {searchedRecipe.length > 0 ? (
          searchedRecipe.map((recipe) => (
            <Link to={"/recipe/" + recipe.id} key={recipe.id} className="block">
              <div className="text-black md:w-[410px] md:h-[400px] text-center rounded-2xl overflow-hidden shadow-lg">
                <div className="h-[203px] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#FFFBF2] p-4 h-full">
                  <p className="md:text-xl font-semibold mt-3">
                    {recipe.title}
                  </p>
                  {/* <p className="mt-3 text-sm">{` ${recipe.diets}`}</p> */}

                  <div className=" mt-3">
                    {/* <p className="text-md mt-2">{`${recipe.readyInMinutes} - EASY PREP - ${recipe.servings} SERVINGS`}</p> */}

                    <button className="border rounded-lg text-sm hover:bg-[#D9D9D9] bg-[#F29C33] md:text-lg md:px-3 p-2">
                      View recipe
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>
            <p>No recipes found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Searched;
