import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import chef1Image from "./assets/chef1.jpg";
import chef2Image from "./assets/chef2.jpg";
import chef3Image from "./assets/chef3.jpg";
import chef4Image from "./assets/chef4.jpg";
import chef5Image from "./assets/chef5.jpg";
import chef6Image from "./assets/chef6.jpg";
import chef7Image from "./assets/chef7.jpg";
import chef8Image from "./assets/chef8.jpg";
import chef9Image from "./assets/chef9.jpg";

export default function ChefPage() {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/all");
        setChefs(response.data);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };

    fetchChefs();
  }, []);

  return (
    <div className="chefPage-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ChefPage">Chefs</Link>
          </li>
          <li>
            <Link to="/RecipePage">Recipes</Link>
          </li>
          <li>
            <Link to="/AboutPage">About Us</Link>
          </li>
          <li>
            <Link to="/ChefPortal">Chef Portal</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="chef-content">
        <h1>Chef Page</h1>
        <p>Meet our talented chefs!</p>
        <div className="chef-container">
          <Link to="/ChefDetailsPage/1" className="chef-card">
            <img src={chef1Image} alt="Chef 1" className="chef-img" />
            <h2 className="chef-name">{chefs[0]?.fullName}</h2>
            <p className="chef-description">{chefs[0]?.bio}</p>
          </Link>

          <Link to="/ChefDetailsPage/2" className="chef-card">
            <img src={chef2Image} alt="Chef 2" className="chef-img" />
            <h2 className="chef-name">{chefs[1]?.fullName}</h2>
            <p className="chef-description">{chefs[1]?.bio}</p>
          </Link>

          <Link to="/ChefDetailsPage/3" className="chef-card">
            <img src={chef3Image} alt="Chef 3" className="chef-img" />
            <h2 className="chef-name">{chefs[2]?.fullName}</h2>
            <p className="chef-description">{chefs[2]?.bio}</p>
          </Link>

          <Link to="/ChefDetailsPage/4" className="chef-card">
            <img src={chef4Image} alt="Chef 4" className="chef-img" />
            <h2 className="chef-name">{chefs[3]?.fullName}</h2>
            <p className="chef-description">{chefs[3]?.bio}</p>
          </Link>

          <Link to="/ChefDetailsPage/5" className="chef-card">
            <img src={chef5Image} alt="Chef 5" className="chef-img" />
            <h2 className="chef-name">{chefs[4]?.fullName}</h2>
            <p className="chef-description">{chefs[4]?.bio}</p>
          </Link>

          <Link to="/ChefDetailsPage/6" className="chef-card">
            <img src={chef6Image} alt="Chef 6" className="chef-img" />
            <h2 className="chef-name">{chefs[5]?.fullName}</h2>
            <p className="chef-description">{chefs[5]?.bio}</p>
          </Link>

          <Link to="/ChefDetailsPage/7" className="chef-card">
            <img src={chef7Image} alt="Chef 7" className="chef-img" />
            <h2 className="chef-name">{chefs[6]?.fullName}</h2>
            <p className="chef-description">{chefs[6]?.bio}</p>
          </Link>

          <Link to="/ChefDetailsPage/8" className="chef-card">
            <img src={chef8Image} alt="Chef 8" className="chef-img" />
            <h2 className="chef-name">{chefs[7]?.fullName}</h2>
            <p className="chef-description">{chefs[7]?.bio}</p>
          </Link>

          <Link to="/ChefDetailsPage/9" className="chef-card">
            <img src={chef9Image} alt="Chef 9" className="chef-img" />
            <h2 className="chef-name">{chefs[8]?.fullName}</h2>
            <p className="chef-description">{chefs[8]?.bio}</p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Chef App. All rights reserved.</p>
      </footer>
    </div>
  );
}
