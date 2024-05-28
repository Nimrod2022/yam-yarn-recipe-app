import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Recipe() {
  let params = useParams();
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  const [recipeDetails, setRecipeDetails] = useState({});
  const [activeTab, setActiveTab] = useState("summary");

  const toggleActive = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    getRecipeDetails();
  }, [params.id]);

  const getRecipeDetails = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${apiKey}`
    );
    const data = await api.json();
    console.log("recipe", data);
    setRecipeDetails(data);
  };

  const capitalizeFirstIngridientLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="bg-[#D9D9D9] md:px-0 px-5 md:h-screen">
      <div className="flex flex-col justify-center items-center pt-7">
        <div className="bg-[#F29C33] md:w-[8%] rounded-xl text-center">
          <p className="px-4 text-white py-2">RECIPE</p>
        </div>

        <h1 className="text-2xl text-center font-bold pt-5">
          {recipeDetails.title?.toUpperCase()}
        </h1>

        <p className="text-[#6e6d6b] md:w-[40%] text-center pt-5">
          Welcome to Cooks Yum Yarn, where culinary dreams come alive! Today, we
          embark on a journey of flavors with a dish that promises to elevate
          your dining experience – our Citrus Infusion Delight: Lemon Garlic
          Roasted Chicken.
        </p>

        <div className="flex md:gap-10 gap-5 pt-10">
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src="/assets/timer.svg"
              alt="timer"
              className="md:size-auto size-4"
            />
            <p className="md:text-lg text-xs">
              {recipeDetails.readyInMinutes} MINUTES
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <img
              src="/assets/prep.svg"
              alt="prep time"
              className="md:size-auto size-5"
            />
            <p className="md:text-lg text-xs">
              {parseInt(recipeDetails.readyInMinutes, 10) >= 60
                ? "HARD PREP"
                : "EASY PREP"}
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <img
              src="/assets/serving.svg"
              alt="servings"
              className="md:size-auto size-5"
            />
            <p className="md:text-lg text-xs">
              {recipeDetails.servings} SERVINGS
            </p>
          </div>
        </div>
      </div>

      <div className="md:flex justify-center gap-20 mt-10">
        <div className="md:w-1/2 max-w-lg">
          <img
            src={recipeDetails.image}
            alt={recipeDetails.title}
            className="w-full md:h-[400px] h-[280px] object-cover rounded-lg"
          />
        </div>

        <div className="md:pt-0 pt-5 md:w-1/2 px-3 md:text-[16px] md:pb-0 pb-10  text-sm max-w-lg">
          <div className="flex gap-5  mb-5 ">
            <button
              className={`md:px-3 md:text-lg text-xs px-2 py-1 ${
                activeTab === "summary"
                  ? "bg-[#F29C33] text-white"
                  : "border-2 border-black"
              }`}
              onClick={() => toggleActive("summary")}
            >
              Summary
            </button>
            <button
              className={`md:px-3 md:text-lg text-xs px-2 py-1 ${
                activeTab === "ingredients"
                  ? "bg-[#F29C33] text-white"
                  : "border-2 border-black"
              }`}
              onClick={() => toggleActive("ingredients")}
            >
              Ingredients
            </button>
            <button
              className={`md:px-3 md:text-lg text-xs px-2 py-1 ${
                activeTab === "instructions"
                  ? "bg-[#F29C33] text-white"
                  : "border-2 border-black"
              }`}
              onClick={() => toggleActive("instructions")}
            >
              Instructions
            </button>
          </div>

          <div className="h-[400px] overflow-y-auto">
            {activeTab === "summary" && (
              <div>
                <p
                  dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}
                ></p>
              </div>
            )}
            {activeTab === "ingredients" && (
              <div>
                <ul className="list-disc list-inside">
                  {recipeDetails.extendedIngredients?.map(
                    (ingredient, index) => (
                      <li key={index}>
                        {capitalizeFirstIngridientLetter(ingredient.name)}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            {activeTab === "instructions" && (
              <div>
                <ol
                  className="list-decimal list-inside"
                  dangerouslySetInnerHTML={{
                    __html: recipeDetails.instructions,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
