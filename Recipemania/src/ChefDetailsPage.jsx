import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";

// Local profile images
import chef1Image from "./assets/chef1.jpg";
import chef2Image from "./assets/chef2.jpg";
import chef3Image from "./assets/chef3.jpg";
import chef4Image from "./assets/chef4.jpg";
import chef5Image from "./assets/chef5.jpg";
import chef6Image from "./assets/chef6.jpg";
import chef7Image from "./assets/chef7.jpg";
import chef8Image from "./assets/chef8.jpg";
import chef9Image from "./assets/chef9.jpg";

const imageMap = {
  1: chef1Image,
  2: chef2Image,
  3: chef3Image,
  4: chef4Image,
  5: chef5Image,
  6: chef6Image,
  7: chef7Image,
  8: chef8Image,
  9: chef9Image,
};

const ChefDetailsPage = () => {
  const { id } = useParams();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${id}`
        );
        setChef(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching chef details.");
        setLoading(false);
      }
    };

    fetchChef();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const imageToDisplay = imageMap[id] || chef1Image;

  return (
    <div className="chef-details-container">
      {chef && (
        <>
          <h1>{chef.fullName}</h1>
          <img
            src={imageToDisplay}
            alt={chef.fullName}
            className="chef-details-img"
          />
          <div className="chef-info">
            <h3>Full Bio</h3>
            <p>{chef.fullBio}</p>
          </div>

          <div className="chef-recipes">
            <h3>Recipes</h3>
            {Array.isArray(chef.recipes) ? (
              <ul>
                {chef.recipes.map((recipe, index) => (
                  <li key={index}>{recipe}</li>
                ))}
              </ul>
            ) : (
              <p>{chef.recipes}</p>
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Chef App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ChefDetailsPage;
