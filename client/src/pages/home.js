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
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://ey-gds-mern-recipe-app.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://ey-gds-mern-recipe-app.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
        <h3 className="text-center">👨‍🍳The Perfect Nest for Every Chef to Create, Share🍽️</h3>
     <div className="row row-cols-1 row-cols-md-3 g-4 m-3">
  {recipeData.map((recipe, index) => (
    <div className="col" key={index}>
      <div className="card h-100 shadow-sm border-0 rounded-4">
        <img src={recipe.image} className="card-img-top" alt={recipe.title} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }} />
        <div className="card-body text-center">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">{recipe.description}</p>
        </div>
      </div>
    </div>
  ))}
  <button
    onClick={() => saveRecipe(recipe._id)}
    disabled={isRecipeSaved(recipe._id)}
  >
    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
  </button>
</div>
    </div>
  )
}

const recipeData = [
  {
    title: "Veg Recipes",
    image: "https://3.imimg.com/data3/NX/GF/MY-9178041/veg-meal-250x250.png",
    description: "Enjoy delicious, healthy, and vibrant vegetarian dishes! Cook, Share & Savor the Goodness! 🥗🍛🥦"
  },
  {
    title: "Non-Veg Recipes 🍗",
    image: "https://i.ytimg.com/vi/2u983B2wD1k/hq720.jpg",
    description: "Enjoy succulent chicken, tender lamb, fresh seafood, and flavorful beef. Cook, Savor & Enjoy the Best Non-Veg Delights! 🍖🔥🍗"
  },
  {
    title: "Breakfast Recipes ☕",
    image: "https://farm8.staticflickr.com/7613/17099547052_8dc47c1c0d_z.jpg",
    description: "Start your day with delicious, nutritious, and easy-to-make breakfast recipes! 🍳🥞🥤"
  },
  {
    title: "Desserts & Sweets 🍰",
    image: "https://www.cookwithkushi.com/wp-content/uploads/2018/08/best_easy_indian_desserts_sweets.jpg",
    description: "Satisfy your sweet cravings with delightful desserts and irresistible sweets! 🍩🍫🎂"
  },
  {
    title: "Beverages & Drinks🥤",
    image: "https://vaya.in/careers/wp-content/uploads/2019/03/5-protein-drinks-and-beverages-to-have-post-work-out.jpg",
    description: "Quench your thirst with refreshing, flavorful, and energizing beverages! 🍹☕🥛"
  },
  {
    title: "Snacks & Appetizers 🍟",
    image: "https://www.seriouseats.com/thmb/VoScDEdtkVqzGbhekl1qYowMv5o=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2012__05__20120525-grilled-side-dishes-appetizers-memorial-day-primary-1378b5ab57ff431f9da061306f71a4eb.jpeg",
    description: "Delight in crispy, savory, and mouthwatering snacks and appetizers! 🍿🧀🌮"
  }
]

