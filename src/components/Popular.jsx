import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

function Popular() {
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`;

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
      <h1 className="text-2xl py-5">Popular Picks</h1>

      <Splide
        options={{
          type: "slide",
          perPage: 3,
          gap: "1rem",
          autoplay: false,
          arrows: false,
          drag:"free",
          gap: "5rem",
          pagination: true,
          breakpoints: {
            640: {
              perPage: 1,
            },
            768: {
              perPage: 5,
            },
            1024: {
              perPage: 5,
            },
          },
        }}
      >
        {popular.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Link to={"/recipe/" + recipe.id} className="block">
              <div className="text-black w-[410px] h-[380px] rounded-2xl overflow-hidden shadow-lg">
                <div className="h-[203px] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#FFFBF2] p-4 h-full">
                  <p className="text-xl font-semibold mt-3">{recipe.title}</p>
                  <p className="mt-3 text-sm">{` ${recipe.diets}`}</p>
                  <div className="flex justify-between items-start mt-3">
                    <p className="text-md mt-2">{`${recipe.readyInMinutes} - EASY PREP - ${recipe.servings} SERVINGS`}</p>
                    <button className="border rounded-lg text-sm border-black hover:border-none hover:bg-[#F29C33] p-2">View recipe</button>
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

export default Popular;
