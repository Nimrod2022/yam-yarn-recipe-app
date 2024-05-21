import React, { useEffect, useState } from "react";

function Vegetarian() {
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3&tags=vegetarian`;

  const [vegetarian, setVegetarian] = useState([]);

  useEffect(() => {
    getVegetarian();
  }, []);

  const getVegetarian = async () => {
    const checkVegetarian = localStorage.getItem("vegetarian");

    if (checkVegetarian) {
      setVegetarian(JSON.parse(checkVegetarian));
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
          setVegetarian(data.recipes);
          localStorage.setItem("vegetarian", JSON.stringify(data.recipes));
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
    <h1 className="text-2xl text-white py-5">Our Vegetarian Picks</h1>
   
    <div className="flex gap-5 text-white">
      
      {vegetarian.length > 0 ? (
        vegetarian.map((recipe) => (
          <div key={recipe.id}>
            <p className="text-xl font-semibold">{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} className="rounded-2xl" />
          </div>
        ))
      ) : (
        <div><p>No recipes found.</p></div>
      )}
    </div>
    </>
  );
}

export default Vegetarian;
