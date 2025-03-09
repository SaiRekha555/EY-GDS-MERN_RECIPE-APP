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

    const fetchSavedRecipes = async () => {
      if (!userID) return;
      try {
        const response = await axios.get(
          `https://ey-gds-mern-recipe-app.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes || []);
      } catch (err) {
        console.error("Error fetching saved recipes:", err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://ey-gds-mern-recipe-app.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error("Error saving recipe:", err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4" style={{ fontSize: "30px", fontWeight: "bold" }}>
        👨‍🍳 The Perfect Nest for Every Chef to Create, Share 🍽️
      </h3>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recipeData.map((recipe) => (
          <div className="col" key={recipe._id}>
            <div className="card h-100 shadow-sm border-0 rounded-4 p-3 text-center">
              <img
                src={recipe.image}
                className="card-img-top"
                alt={recipe.title}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "22px", fontWeight: "bold" }}>{recipe.title}</h5>
                <p className="card-text" style={{ fontSize: "16px" }}>{recipe.description}</p>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  className="btn btn-success mt-2"
                >
                  {isRecipeSaved(recipe._id) ? "Saved ✅" : "Save Recipe"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const recipeData = [
  {
    _id: "1",
    title: "Veg Recipes 🥗",
    image: "https://3.imimg.com/data3/NX/GF/MY-9178041/veg-meal-250x250.png",
    description: "Enjoy delicious, healthy, and vibrant vegetarian dishes! 🥦🍛",
  },
  {
    _id: "2",
    title: "Non-Veg Recipes 🍗",
    image: "https://i.ytimg.com/vi/2u983B2wD1k/hq720.jpg",
    description: "Succulent chicken, tender lamb, fresh seafood, and flavorful beef. 🍖🔥",
  },
  {
    _id: "3",
    title: "Breakfast Recipes ☕",
    image: "https://farm8.staticflickr.com/7613/17099547052_8dc47c1c0d_z.jpg",
    description: "Start your day with nutritious and easy-to-make breakfast recipes! 🍳🥞",
  },
  {
    _id: "4",
    title: "Desserts & Sweets 🍰",
    image: "https://www.cookwithkushi.com/wp-content/uploads/2018/08/best_easy_indian_desserts_sweets.jpg",
    description: "Satisfy your sweet cravings with delightful desserts! 🍩🍫",
  },
  {
    _id: "5",
    title: "Beverages & Drinks🥤",
    image: "https://vaya.in/careers/wp-content/uploads/2019/03/5-protein-drinks-and-beverages-to-have-post-work-out.jpg",
    description: "Quench your thirst with refreshing, flavorful, and energizing beverages! 🍹☕",
  },
  {
    _id: "6",
    title: "Snacks & Appetizers 🍟",
    image: "https://www.seriouseats.com/thmb/VoScDEdtkVqzGbhekl1qYowMv5o=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2012__05__20120525-grilled-side-dishes-appetizers-memorial-day-primary-1378b5ab57ff431f9da061306f71a4eb.jpeg",
    description: "Delight in crispy, savory, and mouthwatering snacks! 🍿🧀",
  },
];

export default Home;
