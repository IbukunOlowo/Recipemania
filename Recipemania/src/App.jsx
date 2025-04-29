import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import AboutPage from "./AboutPage";
import ChefPage from "./ChefPage";
import RecipePage from "./RecipePage";
import ChefPortal from "./ChefPortal";
import NotFoundPage from "./NotFoundPage";
import TagTemplate from "./TagTemplate";
import SignUpPage from "./SignUpPage";
import ChefProfilePage from "./ChefProfilePage";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  //const [array, setArray] = useState([]);
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    //setArray(response.data.fruits);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/ChefPage" element={<ChefPage />} />
          <Route path="/RecipePage" element={<RecipePage />} />
          <Route path="/ChefPortal" element={<ChefPortal />} />
          <Route path="/NotFoundPage" element={<NotFoundPage />} />
          <Route path="/TagTemplate" element={<TagTemplate />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/ChefProfilePage" element={<ChefProfilePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
