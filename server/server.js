require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const corsOptions = {
  origin: ["http://localhost:5177"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "banana"] });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.listen(8080, () => {
  console.log("Server started on port 8080");
});

const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "recipemaniaDb",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);
  }
  console.log("MySQL connected");
});

//app.listen(port, () => {
// console.log("listening");
//});

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipes",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
  },
});
const upload = multer({ storage });

// Middleware to Verify JWT
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate the login credentials
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Register Route
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Error registering user: " + err.message });
        }
        const token = jwt.sign(
          { id: result.insertId },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res
          .status(201)
          .json({ token, user: { id: result.insertId, username, email } });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

// Fetch All Users (Fixes /users CORS issue)
app.get("/api/users", async (req, res) => {
  try {
    db.query(
      "SELECT id, username, email, bio, profile_image FROM users",
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database error: " + err.message });
        }
        res.json(results);
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

// Profile Update Route
app.put(
  "/api/profile",
  authenticate,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { bio } = req.body;
      const updateData = { bio };
      if (req.file) updateData.profile_image = req.file.path;
      db.query(
        "UPDATE users SET bio = ?, profile_image = ? WHERE id = ?",
        [updateData.bio, updateData.profile_image || null, req.user.id],
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Database error: " + err.message });
          }
          db.query(
            "SELECT id, username, email, bio, profile_image FROM users WHERE id = ?",
            [req.user.id],
            (err, results) => {
              if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error: " + err.message });
              }
              res.json({ user: results[0] });
            }
          );
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  }
);

// Fetch User Profile
app.get("/api/profile/:username", async (req, res) => {
  try {
    db.query(
      "SELECT id, username, email, bio, profile_image FROM users WHERE username = ?",
      [req.params.username],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database error: " + err.message });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(results[0]);
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

// Create Recipe
app.post(
  "/api/recipes",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, prepTime, cookTime, tags } = req.body;
      const image = req.file ? req.file.path : "";
      db.query(
        "INSERT INTO recipes (title, image, prep_time, cook_time, tags, creator_id) VALUES (?, ?, ?, ?, ?, ?)",
        [title, image, prepTime, cookTime, tags, req.user.id],
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Database error: " + err.message });
          }
          db.query(
            "SELECT * FROM recipes WHERE id = ?",
            [result.insertId],
            (err, results) => {
              if (err) {
                return res
                  .status(500)
                  .json({ message: "Database error: " + err.message });
              }
              res.status(201).json(results[0]);
            }
          );
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  }
);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
