import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Popular() {
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3`;

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const checkPopular = localStorage.getItem("popular");

    if (checkPopular) {
      setPopular(JSON.parse(checkPopular));
    } else {
      try {
        console.log("Fetching URL:", url);
        const api = await fetch(url);

        if (!api.ok) {
          throw new Error(`HTTP error! status: ${api.status}`);
        }

        const data = await api.json();

        console.log("API response data:", data);

        if (data && data.recipes) {
          setPopular(data.recipes);
          localStorage.setItem("popular", JSON.stringify(data.recipes));
        } else {
          console.error("No recipes found in the API response");
        }
      } catch (error) {
        console.error("Error fetching the recipes:", error);
      }
    }
  };

  return (
    <>
      <h1 className="text-2xl  py-5">Popular Picks</h1>

      <div className="md:flex gap-7 text-white">
        {popular.length > 0 ? (
          popular.map((recipe) => (
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
    </>
  );
}

export default Popular;
