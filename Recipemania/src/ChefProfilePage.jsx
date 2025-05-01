import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import email_icon from "./assets/emailicon.png";
import recipe_icon from "./assets/recipeicon.png";

export default function ChefProfilePage() {
  const [profile, setProfile] = useState({ fullName: "", profileImage: "" });
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    prep_time: "",
    cook_time: "",
    tags: "",
    image: null,
  });
  const [editProfile, setEditProfile] = useState({
    fullName: "",
    profileImage: null,
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("Please log in to view your profile");
        navigate("/ChefPortal");
        return;
      }
      try {
        const response = await fetch("http://localhost:8080/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setError("Session expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/ChefPortal");
            return;
          }
          throw new Error(data.message || "Failed to fetch profile");
        }
        console.log("Fetched profile:", data);
        setProfile({
          fullName: data.fullName || "",
          profileImage: data.profileImage || "",
        });
        setEditProfile({ fullName: data.fullName || "", profileImage: null });
      } catch (err) {
        setError(
          err.message || "Failed to fetch profile. Server may be unreachable."
        );
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit.");
        return;
      }
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPG, JPEG, PNG, and GIF files are allowed.");
        return;
      }
      console.log("Profile image selected:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }
    setEditProfile((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setError("");
  };

  const handleRecipeChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit.");
        return;
      }
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPG, JPEG, PNG, and GIF files are allowed.");
        return;
      }
      console.log("Recipe image selected:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }
    setRecipe((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setError("");
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!editProfile.fullName && !editProfile.profileImage) {
      setError("Please provide a full name or profile image");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", editProfile.fullName || "");
    if (editProfile.profileImage) {
      formData.append("image", editProfile.profileImage); // Changed to match backend
    }

    console.log("Sending Profile FormData:", Object.fromEntries(formData));

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/ChefPortal");
          return;
        }
        throw new Error(data.message || "Failed to update profile");
      }
      console.log("Updated profile:", data);
      setProfile({ fullName: data.fullName, profileImage: data.profileImage });
      setEditProfile({ fullName: data.fullName, profileImage: null });
      setModalMessage("Profile updated successfully!");
      setShowModal(true);
    } catch (err) {
      setError(
        err.message || "Failed to update profile. Server may be unreachable."
      );
    }
  };

  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const {
      title,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      tags,
      image,
    } = recipe;
    if (!title || !ingredients || !instructions) {
      setError("Title, ingredients, and instructions are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("prepTime", prep_time || ""); // Ensure empty string if not provided
    formData.append("cookTime", cook_time || ""); // Ensure empty string if not provided
    formData.append("tags", tags || "");
    if (image) {
      formData.append("image", image);
    }

    console.log("Sending Recipe FormData:");
    for (const pair of formData.entries()) {
      console.log(`  ${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await fetch("http://localhost:8080/api/recipes", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/ChefPortal");
          return;
        }
        throw new Error(data.message || "Failed to upload recipe");
      }

      setRecipe({
        title: "",
        ingredients: "",
        instructions: "",
        prep_time: "",
        cook_time: "",
        tags: "",
        image: null,
      });
      setModalMessage("Recipe uploaded successfully!");
      setShowModal(true);
    } catch (err) {
      setError(err.message || "Failed to upload recipe.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/ChefPortal");
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="ChefProfilePage-container">
      <div className="ChefProfilePage-content">
        <div className="ChefProfilePage-container">
          <div className="header">
            <div className="text">Your Profile</div>
            <div className="underline"></div>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="profile-sections">
            {/* Profile Display */}
            <div className="profile-display">
              <h3>{profile.fullName || "No name set"}</h3>
              {profile.fullName ? (
                <p>Welcome, {profile.fullName}!</p>
              ) : (
                <p>Please set your full name.</p>
              )}
              {profile.profileImage ? (
                <>
                  <p>Profile Image URL: {profile.profileImage}</p>
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="profile-image"
                    onError={(e) => console.log("Image load error:", e)}
                  />
                </>
              ) : (
                <p>No profile image set</p>
              )}
            </div>

            {/* Edit Profile Form */}
            <div className="profile-edit">
              <h3>Edit Profile</h3>
              <form onSubmit={handleProfileSubmit} className="inputs">
                <div className="input">
                  <img src={email_icon} alt="Full Name" className="icon" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={editProfile.fullName}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="input">
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="submit-container">
                  <button type="submit" className="submit">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>

            {/* Upload Recipe Form */}
            <div className="recipe-upload">
              <h3>Upload a Recipe</h3>
              <form onSubmit={handleRecipeSubmit} className="profile-inputs">
                <div className="profile-input">
                  <img src={recipe_icon} alt="Title" className="icon" />
                  <input
                    type="text"
                    name="title"
                    placeholder="Recipe Title"
                    value={recipe.title}
                    onChange={handleRecipeChange}
                    required
                  />
                </div>
                <div className="profile-input">
                  <textarea
                    name="ingredients"
                    placeholder="Ingredients (one per line)"
                    value={recipe.ingredients}
                    onChange={handleRecipeChange}
                    required
                  />
                </div>
                <div className="profile-input">
                  <textarea
                    name="instructions"
                    placeholder="Instructions"
                    value={recipe.instructions}
                    onChange={handleRecipeChange}
                    required
                  />
                </div>
                <div className="profile-input">
                  <input
                    type="text"
                    name="prepTime"
                    placeholder="Prep Time (e.g. 15 mins)"
                    value={recipe.prepTime}
                    onChange={handleRecipeChange}
                  />
                </div>
                <div className="profile-input">
                  <input
                    type="text"
                    name="cookTime"
                    placeholder="Cook Time (e.g. 30 mins)"
                    value={recipe.cookTime}
                    onChange={handleRecipeChange}
                  />
                </div>
                <div className="profile-input">
                  <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma separated)"
                    value={recipe.tags}
                    onChange={handleRecipeChange}
                  />
                </div>
                <div className="profile-input">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleRecipeChange}
                  />
                </div>
                <div className="submit-container">
                  <button type="submit" className="submit">
                    Upload Recipe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="logout-container">
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <h2>Success!</h2>
            <p>{modalMessage}</p>
            <button onClick={closeModal} className="profile-modal-close">
              OK
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© {new Date().getFullYear()} Chef App. All rights reserved.</p>
      </footer>
    </div>
  );
}
