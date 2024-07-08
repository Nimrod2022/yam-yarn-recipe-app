import React, { useState, useEffect } from "react";
import Vegetarian from "../components/Vegetarian";
import Popular from "../components/Popular";
import Categories from "../components/Categories";
import { useParams } from "react-router-dom";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import NoData from "../components/NoData";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

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
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=4&cuisine=${cuisineType}`;
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
          console.log("API response data:");
          // localStorage.setItem(cuisineType, JSON.stringify(data.results));
        } else {
          console.error("No recipes found in the API response");
        }
      } catch (error) {
        console.error("Error fetching the recipes:", error);
      }
    }
  };

  return (
    <div className="bg-[#D9D9D9]">
      <div className="px-5  bg-center md:bg-cover flex-col gap-10 md:w-5/6 xl:w-4/6 mx-auto roboto pb-28">
        <h1 className="text-center text-2xl font-semibold pt-8">CATEGORIES</h1>
        <p className="text-center md:text-xl text-[#4A4947] pt-3">
          With our diverse collection of recipes we have something to satisfy
          every palate.
        </p>
        <div className="flex justify-center gap-8 pt-5">
          <div className="md:pb-10 pb-5">
            {" "}
            <Categories />
          </div>
        </div>
        {!type ? (
          <>
            <Popular />
            <Vegetarian />
          </>
        ) : (
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
             
            }}
          >
            <div className="md:flex justify-between text-white">
              {cuisine.length > 0 ? (
                cuisine.map((recipe) => (
                  <SplideSlide
                    key={recipe.id}
                    className="md:px-7 md:py-0 py-5 "
                  >
                    <Link to={"/recipe/" + recipe.id} className="block ">
                      <div className="text-black  md:h-[380px] md:w-[380px] w-full rounded-2xl overflow-hidden  shadow-lg">
                        <div className="h-[203px] overflow-hidden">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="bg-[#FFFBF2] p-4 h-full">
                          <p className="md:text-lg font-semibold mt-3 text-center ">
                            {recipe.title}
                          </p>
                          {type === "All" && recipe.diets && (
                            <p className="mt-3 text-sm">{recipe?.diets}</p>
                          )}
                          <div className="mt-3 md:mt-5 flex justify-center items-center">
                            {type === "All" && recipe.readyInMinutes && (
                              <p className="text-md mt-2">{`${
                                recipe.readyInMinutes
                              } - ${
                                parseInt(recipe.readyInMinutes, 10)
                                  ? "HARD PREP"
                                  : "EASY PREP"
                              } - ${recipe.servings} SERVINGS`}</p>
                            )}
                            <button className="border  rounded-lg text-sm hover:bg-[#D9D9D9] bg-[#F29C33] p-2  md:text-lg md:px-3">
                              View recipe
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SplideSlide>
                ))
              ) : (
                <div>
                  <NoData />
                </div>
              )}
            </div>
          </Splide>
        )}
      </div>
    </div>
  );
}

export default Cuisines;
