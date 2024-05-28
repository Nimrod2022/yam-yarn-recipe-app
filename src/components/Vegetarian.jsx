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
      320: {
        perPage: 1,
      },
      640: {
        perPage: 1,
      },
      768: {
        perPage: 2,
      },
      1024: {
        perPage: 3,
      },
      1280: {
        perPage: 3,
      },
      1366: {
        perPage: 3,
      },
      1536: {
        perPage: 3,
      },
      1920: {
        perPage: 4,
      },
      2560: {
        perPage: 4,
      },
      3840: {
        perPage: 5,
      },
    },
  }}
>
        {vegetarian.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Link to={"/recipe/" + recipe.id} className="block">
              <div className="text-black md:w-[410px] md:h-[380px] rounded-2xl overflow-hidden shadow-lg">
                <div className="h-[203px] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#FFFBF2] p-4 h-full">
                  <p className="md:text-xl font-semibold mt-3">{recipe.title}</p>
                  <p className="mt-3 text-sm">{` ${recipe.diets}`}</p>
                  <div className="flex justify-between items-start mt-3">
                    <p className="text-xs md:text-md mt-2">{`${recipe.readyInMinutes} - EASY PREP - ${recipe.servings} SERVINGS`}</p>
                    <button className="border rounded-lg text-xs md:text-sm border-black hover:border-none hover:bg-[#F29C33] p-2">View recipe</button>
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
