import React, { useState, useEffect } from "react";
import Vegetarian from "../components/Vegetarian";
import Popular from "../components/Popular";
import Categories from "../components/Categories";
import { useParams } from "react-router-dom";
import Search from "../components/Search";
import { Link } from "react-router-dom";

function Cuisines() {
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const { type } = useParams();
  const [cuisine, setCuisine] = useState([]);

  useEffect(() => {
    if (type) {
      console.log(`Fetching cuisine type: ${type}`);
      getCuisine(type);
    }
  }, [type]);

  const getCuisine = async (cuisineType) => {
    const checkCuisine = localStorage.getItem(cuisineType);

    if (checkCuisine) {
      console.log(`Found ${cuisineType} in localStorage`);
      setCuisine(JSON.parse(checkCuisine));
    } else {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=3&cuisine=${cuisineType}`;
      try {
        console.log("Fetching URL:", url);
        const api = await fetch(url);

        if (!api.ok) {
          throw new Error(`HTTP error! status: ${api.status}`);
        }

        const data = await api.json();
        console.log("API response data:", data);

        if (data && data.results) {
          setCuisine(data.results);
          console.log("API response data:", );
          localStorage.setItem(cuisineType, JSON.stringify(data.results));
        } else {
          console.error("No recipes found in the API response");
        }
      } catch (error) {
        console.error("Error fetching the recipes:", error);
      }
    }
  };

  return (
    <div className="md:px-28 px-5  bg-center md:bg-cover flex-col gap-10 bg-[#D9D9D9] roboto pb-28">
      <h1 className="text-center text-2xl font-semibold pt-8">CATEGORIES</h1>
      <p className="text-center text-xl text-[#4A4947] pt-3">With our diverse collection of recipes we have something to satisfy every palate.</p>
      <div className="flex justify-center gap-8 pt-5">
     
        
       
      </div>
      {!type ? (
        <>
        <Categories/>
          <Popular />
          <Vegetarian />
        </>
      ) : (
        <div className="md:flex justify-between text-white">
          {cuisine.length > 0 ? (
            cuisine.map((recipe) => (
              <Link
                to={"/recipe/" + recipe.id}
                key={recipe.id}
                className="block"
              >
                <div className="text-black md:w-[410px] md:h-[380px] rounded-2xl overflow-hidden shadow-lg">
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
                    <p className="mt-3 text-sm">{` ${recipe.diets}`}</p>

                    <div className="flex justify-between items-start mt-3">
                      <p className="text-md mt-2">
                        {`${recipeDetails.readyInMinutes} - ${
                         parseInt(recipeDetails.readyInMinutes, 10)
                            ? "HARD PREP"
                            : "EASY PREP"
                        } - ${recipeDetails.servings} SERVINGS`}
                      </p>

                      <button className="border rounded-lg text-sm border-black hover:border-none hover:bg-[#F29C33] p-2">
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
      )}
    </div>
  );
}

export default Cuisines;
