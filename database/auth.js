import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import BlacklistedToken from "./blacklistModel.js"

dotenv.config();

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true, trim: true },
    Password: { type: String, required: true },
    Avatar: { type: String, default: "default.png" }
});

const User = mongoose.model("User", userSchema);

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Users_info";

async function ensureDBConnection() {
    if (mongoose.connection.readyState !== 1) { // 1 = Connected
        console.log("🔄 Reconnecting to MongoDB...");
        await mongoose.connect(MONGO_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }).catch(err => {
            console.error("MongoDB reconnection failed:", err);
        });
    }
}

export class AuthService {
    
    async createAccount({Name, Email, Password, Avatar }) {
        await ensureDBConnection(); 
            
        try {

            if (!Name || !Email || !Password) {
                throw new Error("Missing required fields: Email, Password, or Name");
            }

            let existingUser = await User.findOne({ Email });
            if (existingUser){
                console.log("User already exists");
                throw new Error("User already exists");
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(Password, saltRounds);

            console.log("Creating user:", { Name, Email, Password: hashedPassword, Avatar });
            const newUser = new User({ Name, Email, Password: hashedPassword, Avatar });
            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            return { token, user: newUser };
            
        } catch (error) {
            throw error;
        }
    }

    async login({ Email, Password }) {
        
        await ensureDBConnection(); 
            
        try {
            const user = await User.findOne({ Email });
            if (!user) throw new Error("Invalid Credentials");

            const isMatch = await bcrypt.compare(Password, user.Password);
            if (!isMatch) throw new Error("Invalid Credentials");

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });

            return { token, user };
            
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(token) {
        try {
            if (!token) return null;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select("-Password");

            return user;
        } catch (error) {
            return null;
        }
    }

    async logout(token) {
        try {
            if (!token) throw new Error("Token is required for logout");
    
            const decoded = jwt.decode(token);
            if (!decoded || !decoded.exp) throw new Error("Invalid token");
    
            const expiresAt = new Date(decoded.exp * 1000); 
            await BlacklistedToken.create({ token, expiresAt });
    
            return { message: "User logged out successfully" };
        } catch (error) {
            throw error;
        }
    }
}

export const authService = new AuthService();
export { User };