import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Recipe() {
  let params = useParams();
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

  const [recipeDetails, setRecipeDetails] = useState({});
  const [activeTab, setActiveTab] = useState("");

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

  return (
    <div className="flex gap-20 bg-[#D9D9D9] md:h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-5">{recipeDetails.title}</h1>
        <img
          src={recipeDetails.image}
          alt={recipeDetails.title}
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </div>

      <div>
        <div className="flex gap-5 mb-5">
          <button
            className={`border px-3 py-1 ${activeTab === "ingredients" ? "bg-blue-500 text-white" : ""}`}
            onClick={() => toggleActive("ingredients")}
          >
            Ingredients
          </button>
          <button
            className={`border px-3 py-1 ${activeTab === "instructions" ? "bg-blue-500 text-white" : ""}`}
            onClick={() => toggleActive("instructions")}
          >
            Instructions
          </button>
        </div>

        <div className="mt-5">
          {activeTab === "" && (
            <div>
             
              <p dangerouslySetInnerHTML={{ __html: recipeDetails.summary }}></p>
            </div>
          )}
          {activeTab === "ingredients" && (
            <div>
             
              <ul className="list-disc list-inside">
                {recipeDetails.extendedIngredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient.name}</li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "instructions" && (
            <div>
             
              <ol className="list-decimal list-inside">
                {recipeDetails.instructions?.split('\n').map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
