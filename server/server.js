import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { authService }  from "../database/auth.js";
import authenticateuserData from "../database/authmiddleware.js";
dotenv.config({ path: "./server/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI){
    console.error("MONGO_URI is missing from .env file");
    process.exit(1);
} 

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully - from connectDB");

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

connectDB()
.then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));})
.catch(err => console.error("Failed to start server:", err));
  
  // SignUp 
  app.post("/signup", async (req, res) => {
    try {
        console.log("📥 Received signup request with body:", req.body); 

        const { Name, Email, Password } = req.body;

        if (!req.body || !Name || !Email || !Password) {
        console.log(" Invalid request body:", req.body);
        return res.status(400).json({ error: "Missing required fields: Email, Password, or Name" });
        }

        const userData = await authService.createAccount(req.body);
        res.json(userData);
    } catch (error) {
          res.status(400).json({ error: error.message });
    }
  });
  
  // Login 
  app.post("/login", async (req, res) => {
      try {
        console.log("📥 Received login request:", req.body);

        const userData = await authService.login(req.body);
        res.json(userData);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  });
  
  // Get Current user
  app.get("/userData", authenticateuserData, async (req, res) => {
      try {
          const userData = await authService.getCurrentUser(req.userData.id);
          res.json(userData);
      } catch (error) {
          res.status(401).json({ error: "Unauthorized" });
      }
  });
  
  // Logout 
  app.post("/logout", authenticateuserData, async (req, res) => {
      try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(400).json({ error: "Token is required for logout" });

        const response = await authService.logout(token);
        res.json(response);
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  });

  // Avatar
  app.patch("/profile", authenticateuserData, async (req, res) => {
    try {
        const { id } = req.user;
        const { Name, Avatar } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { Name, Avatar }, { new: true });
        res.json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

    