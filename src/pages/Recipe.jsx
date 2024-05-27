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
    console.log(data);
    setRecipeDetails(data);
  };

  const capitalizeFirstIngridientLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="bg-[#D9D9D9] md:h-screen">
      <div className="flex flex-col justify-center items-center pt-7">
        <div className="bg-[#F29C33] w-[8%] rounded-xl text-center">
          <p className="px-4 text-white py-2">RECIPE</p>
        </div>

        <h1 className="text-2xl font-bold pt-5">
          {recipeDetails.title?.toUpperCase()}
        </h1>

        <p className="text-[#6e6d6b] w-[40%] text-center pt-5">
          Welcome to Cooks Yum Yarn, where culinary dreams come alive! Today, we
          embark on a journey of flavors with a dish that promises to elevate
          your dining experience – our Citrus Infusion Delight: Lemon Garlic
          Roasted Chicken.
        </p>

        <div className="flex gap-20 pt-10">
          <p className="flex">
            {" "}
          <img src="/assets/timer.svg" alt="timer" /> {recipeDetails.readyInMinutes} MINUTES
          </p>
          <p className="flex">
            {" "}
          <img src="/assets/serving.svg" alt="timer" /> {recipeDetails.servings} SERVINGS
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-20 mt-10">
        <div className="w-1/2 max-w-lg">
          <img
            src={recipeDetails.image}
            alt={recipeDetails.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>

        <div className="w-1/2 max-w-lg">
          <div className="flex gap-5 mb-5">
            <button
              className={`px-3 py-1 ${
                activeTab === "summary"
                  ? "bg-[#F29C33] text-white"
                  : "border-2 border-black"
              }`}
              onClick={() => toggleActive("summary")}
            >
              Summary
            </button>
            <button
              className={`px-3 py-1 ${
                activeTab === "ingredients"
                  ? "bg-[#F29C33] text-white"
                  : "border-2 border-black"
              }`}
              onClick={() => toggleActive("ingredients")}
            >
              Ingredients
            </button>
            <button
              className={`px-3 py-1 ${
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
                <ol className="list-decimal list-inside">
                  {recipeDetails.instructions
                    ?.split("\n")
                    .map((instruction, index) => (
                      <li className="pt-2" key={index}>
                        {instruction}
                      </li>
                    ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
