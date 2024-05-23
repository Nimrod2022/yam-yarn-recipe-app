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
    <div className="md:flex gap-5 text-white">
      
      { searchedRecipe.length > 0 ? (
        searchedRecipe.map((recipe) => (
         <Link to={"/recipe/" + recipe.id}
         key={recipe.id}
         >
          <div
            
            className="position relative md:py-0 py-3 md:w-[1400px] md:h-[400px] rounded-2xl overflow-hidden"
          >
            <div className="position-absolute top-0 left-0 w-full bg-black bg-opacity-50 p-2">
              <p className="md:text-xl font-semibold">{recipe.title}</p>
            </div>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full"
            />
          </div>
         
         </Link>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}
export default Searched;
