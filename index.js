const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;

app.get("/user/random", (req, res) => {
    fs.readFile("users.json", (err, data) => {
        if (err) {
            res.status(500).json("Error occured");
        } else {
            const users = JSON.parse(data);
            const userId = Math.floor(Math.random() * users.length);
            const randomUser = users[userId];
            res.status(200).json(randomUser);
        }
    });
});

app.get("/", (req, res) => {
    res.send("Random User API for Node-Mongo Crash Course assingment 1");
});

app.listen(port, () => {
    console.log(
        `Node-Mongo Crash Course assingment 1 app listening on port ${port}`
    );
});
