import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";

import Register from "./Pages/Register";
import Home from "./Pages/home";
import { CreateRecipe } from "./Pages/create-recipe";
import { SavedRecipes } from "./Pages/saved-recipes";
import Navbar from "./Components/navbar";
import Login from ". /Pages/login";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("username");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div className="App">
    <Router>
      <Navbar isLoggedIn={isLoggedIn}/>
      <Routes>
        {/* Redirect to Login if not logged in */}
        <Route path="/" element={<Home /> } />
        <Route path="/create-recipe" element={<CreateRecipe/>} />
          <Route path="/saved-recipes" element={<SavedRecipes/>} />
          <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
