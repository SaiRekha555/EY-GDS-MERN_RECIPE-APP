import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://ey-gds-mern-recipe-app.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    if (userID) {
      const fetchSavedRecipes = async () => {
        try {
          const response = await axios.get(
            `https://ey-gds-mern-recipe-app.onrender.com/recipes/savedRecipes/ids/${userID}`
          );
          setSavedRecipes(response.data?.savedRecipes || []);
        } catch (err) {
          console.error("Error fetching saved recipes:", err);
        }
      };

      fetchSavedRecipes();
    }

    fetchRecipes();
  }, [userID]); // Added dependency on userID

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://ey-gds-mern-recipe-app.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data?.savedRecipes || []);
    } catch (err) {
      console.error("Error saving recipe:", err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h3 className="text-center">👨‍🍳The Perfect Nest for Every Chef to Create, Share🍽️</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4 m-3">
        {recipes.map((recipe) => (
          <div className="col" key={recipe._id}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <img
                src={recipe.image}
                className="card-img-top"
                alt={recipe.title}
                style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                  className="btn btn-primary"
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
