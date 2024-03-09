const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const AdminsModel = require("./models/Admins");
const UsersModel = require("./models/Users");
require("dotenv").config();

const dbUrl =
    "mongodb+srv://bondok:PQHDE6my3bPnknrd@cluster0.0wlbg8g.mongodb.net/ninu";
const port = "3001";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

app.post("/login", async (req, res) => {
    try {
        const { username, password, role } = req.body;

        let UserModel;
        let user;

        // Determine the model based on the role
        if (role === "admin") {
            UserModel = AdminsModel;
            // Find the user by username
            user = await UserModel.findOne({ username });
        } else if (role === "user") {
            UserModel = UsersModel;
            // Find the user by username
            user = await UserModel.findOne({
                "userRegistration.username": username,
            });
        }

        // If user is not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (role === "user" && password === user.userRegistration.password) {
            return res.json({ message: "Login successful", user });
        } else if (role === "admin" && password === user.password) {
            return res.json({ message: "Login successful", user });
        } else {
            return res
                .status(401)
                .json({ message: "Incorrect username or password" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/user/:id", async (req, res) => {
    const { id } = req.params;

    await UsersModel.findById(id)
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.get("/users", async (req, res) => {
    // Retrieve all users from the database
    await UsersModel.find({})
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.delete("/deleteUser/:id", async (req, res) => {
    const { id } = req.params;
    await UsersModel.findByIdAndDelete(id)
        .then(() => {
            res.json("User deleted successfully!");
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.get("/userDetails/:id", async (req, res) => {
    const { id } = req.params;

    await UsersModel.findById(id)
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.put("/userDetails/:id", async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body; // Assuming the request body contains only the updated fields

    try {
        const user = await UsersModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update each field in the updatedFields object
        for (let section in updatedFields) {
            for (let field in updatedFields[section]) {
                user[section][field] = updatedFields[section][field];
            }
        }

        await user.save();

        res.json(user); // Return the updated user
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/admin/addUser", async (req, res) => {
    try {
        const userData = req.body;

        // Check if the user exists in the database
        const existingUser = await UsersModel.findOne({
            "userRegistration.username": userData.userRegistration.username,
        });

        if (existingUser) {
            return res.json("User already exists");
        }

        // If user doesn't exist, create a new user document and save it
        const newUser = new UsersModel(userData);
        await newUser.save();

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.put("/change-password/:id", async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
        // Find the user by ID
        const user = await UsersModel.findById(id);

        // Check if the old password matches the current password
        if (user.userRegistration.password !== oldPassword) {
            return res.status(401).json({ message: "Incorrect old password" });
        }

        if (newPassword === oldPassword) {
            return res.status(401).json({ message: "Please enter a new password" });
        }

        // Update the password
        user.userRegistration.password = newPassword;
        await user.save();

        // Return success message
        res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




app.listen(port, () => {
    console.log("Server listining on http://127.0.0.1:3001");
});
