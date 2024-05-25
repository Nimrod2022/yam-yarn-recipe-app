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
    <div className="md:px-28 px-5 h-screen bg-center md:bg-cover flex-col gap-10 bg-[#D9D9D9] roboto">
      {!type ? (
        <>
          <Popular />
          <Vegetarian />
        </>
      ) : (
        <div className="md:flex gap-5 text-white">
          {cuisine.length > 0 ? (
            cuisine.map((recipe) => (
              <Link to={"/recipe/" + recipe.id} key={recipe.id} className="block">
            <div className="relative md:py-0 py-3 rounded-2xl overflow-hidden w-full">
              <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 p-2">
                <p className="md:text-xl font-semibold">{recipe.title}</p>
              </div>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
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
