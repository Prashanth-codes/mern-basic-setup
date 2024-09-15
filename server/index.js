const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const userModel = require('./models/Users');

// Middleware to parse JSON body
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

mongoose.connect("mongodb+srv://prashanth:9aINer3SZRejyAmR@cluster0.obeai.mongodb.net/merntutorial?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
}).then((conn) => {
    console.log("DB connection successful");
}).catch((error) => {
    console.log("Some error has occurred:", error);
});

app.get("/getUsers", async (req, res) => {
    try {
        const result = await userModel.find({});
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/createUser", async (req, res) => {
    try {
        const user = req.body;
        const newUser = new userModel(user);
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, '127.0.0.1', () => {
    console.log('Server has started on http://127.0.0.1:3001');
});
