import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

function Vegetarian() {
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9&tags=breakfast`;

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

  const capitalizeFirstDietLetter = (diets) => {
    if (!Array.isArray(diets) || diets.length === 0) {
      return "";
    }

    return diets
      .map((diet) => diet.charAt(0).toUpperCase() + diet.slice(1))
      .join(",  ");
  };

  return (
    <>
      <h1 className="text-2xl  py-5">Our Vegetarian Picks</h1>

      <Splide
        options={{
          type: "slide",
          perPage: 3,
          padding: 10,
          autoplay: true,
          arrows: false,
          drag: "free",
          gap: "3rem",

          pagination: false,
          breakpoints: {
            768: {
              perPage: 1,
            },
          },
        }}
      >
        {vegetarian.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Link to={"/recipe/" + recipe.id} className="block">
              <div className="text-black text-center  md:h-[380px] rounded-2xl overflow-hidden shadow-lg">
                <div className="h-[203px] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#FFFBF2] p-4 h-full">
                  <p className="md:text-md  font-semibold">{recipe.title}</p>
                  <p className="mt-3 text-sm">
                    {capitalizeFirstDietLetter(recipe.diets)}
                  </p>
                  <div className="flex-col justify-center  mt-2 mb-3">
                    <p className="text-xs font-semibold md:text-md mt-2">{`${recipe.readyInMinutes} - EASY PREP - ${recipe.servings} SERVINGS`}</p>
                    <button className="border rounded-lg text-xs md:text-sm px-2 my-2 hover:bg-[#D9D9D9] bg-[#F29C33] p-2">
                      View recipe
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
}

export default Vegetarian;
