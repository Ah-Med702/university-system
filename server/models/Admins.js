// import { Schema, model } from "mongoose";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const AdminsSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure unique usernames
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin"], // Allow only "admin" role for admins
    },
});

const AdminModel = model("admins", AdminsSchema);

module.exports = AdminModel;
