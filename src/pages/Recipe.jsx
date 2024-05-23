
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"




function Recipe() {

  let params = useParams()
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;


  const [recipeDetails, setRecipeDetails] = useState({})

  useEffect(()=>{
    getRecipeDetails()
  }, [params.id])

  const getRecipeDetails = async ()=>{
    const api = await fetch (`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${apiKey}`)
    const data = await api.json()
    setRecipeDetails(data)
  }
  return (
    <div>

      {recipeDetails.title}
      
    </div>
  )
}

export default Recipe
