import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";

// Import your local images
import cheeseburgerImage from "./assets/cheeseburger.jpg";
import frenchtoastImage from "./assets/frenchtoast.jpg";
import friedricenigerianImage from "./assets/friedricenigerian.jpg";
import pancakesImage from "./assets/pancakes.jpg";
import riceandstewImage from "./assets/riceandstew.jpg";
import jollofriceImage from "./assets/jollofrice.jpg";
import steakwithmashedpotatoesImage from "./assets/steakwithmashedpotatoes.jpg";

const imageMap = {
  1: cheeseburgerImage,
  2: frenchtoastImage,
  3: friedricenigerianImage,
  4: pancakesImage,
  5: riceandstewImage,
  6: jollofriceImage,
  7: steakwithmashedpotatoesImage,
};

const RecipeDetailsPage = () => {
  const { id } = useParams(); // Get recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/recipes/${id}`
        );
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching recipe details.");
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const imageToDisplay = imageMap[id] || cheeseburgerImage; // Fallback image

  return (
    <div className="recipe-details-container">
      {recipe && (
        <>
          <h1>{recipe.title}</h1>
          <img
            src={imageToDisplay}
            alt={recipe.title}
            className="recipe-details-img"
          />
          <div className="recipe-info">
            <p>
              <strong>Prep Time:</strong> {recipe.prep_time}
            </p>
            <p>
              <strong>Cook Time:</strong> {recipe.cook_time}
            </p>
            <div className="tags">
              <strong>Tags:</strong>
              <p>{recipe.tags}</p>
            </div>
          </div>
          <h3>Ingredients</h3>
          <ul>
            {Array.isArray(recipe.ingredients) ? (
              recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))
            ) : (
              <p>{recipe.ingredients}</p>
            )}
          </ul>
          <h3>Instructions</h3>
          <p>{recipe.instructions}</p>
        </>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Chef App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RecipeDetailsPage;
