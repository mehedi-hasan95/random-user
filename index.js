const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

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

app.get("/user/all", (req, res) => {
    fs.readFile("users.json", (err, data) => {
        if (err) {
            res.status(500).json("Error occured");
        } else {
            const users = JSON.parse(data);
            res.status(200).json(users);
        }
    });
});

app.post("/user/save", (req, res) => {
    const { name, gender, contact, address, photoUrl } = req.body;

    const newUser = {
        id: uuidv4(),
        name,
        gender,
        contact,
        address,
        photoUrl,
    };

    const users = JSON.parse(fs.readFileSync("users.json"));

    users.push(newUser);

    fs.writeFileSync("users.json", JSON.stringify(users));

    res.status(200).json(newUser);
});

// PUT (update) an item by ID
app.put("/user/update/:id", (req, res) => {
    const allUsers = JSON.parse(fs.readFileSync("users.json"));
    const itemIndex = allUsers.findIndex(
        (user) => user.id === parseInt(req.params.id)
    );
    if (itemIndex) {
        return res.status(404).json("Item not found");
    }
    const updatedItem = { ...allUsers[itemIndex], ...req.body };
    allUsers[itemIndex] = updatedItem;
    fs.writeFileSync("users.json", JSON.stringify(allUsers));
    res.status(200).json(updatedItem);
});

app.get("/", (req, res) => {
    res.send("Random User API for Node-Mongo Crash Course assingment 1");
});

app.listen(port, () => {
    console.log(
        `Node-Mongo Crash Course assingment 1 app listening on port ${port}`
    );
});
