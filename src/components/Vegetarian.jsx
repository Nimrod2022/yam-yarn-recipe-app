import React, { useEffect, useState } from "react";

function Vegetarian() {
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3`;

  const [vegetarian, setVegetarian] = useState([]);

  useEffect(() => {
    getVegeterian();
  }, []);

  const getVegeterian = async () => {
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
          localStorage.setItem("vegeterian", JSON.stringify(data.recipes));
        } else {
          console.error("No recipes found in the API response");
        }
      } catch (error) {
        console.error("Error fetching the recipes:", error);
      }
    }
  };

  return (
    <div className="flex gap-5 pt-20 text-white" >

      {vegetarian.length > 0 ? (
        vegetarian.map((recipe) => (
          <div key={recipe.id} >
            <p className="">{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} className="rounded-2xl " />
          </div>
        ))
      ) : (
        <div>No recipes found.</div>
      )}
    </div>
  );
}

export default Vegetarian;
