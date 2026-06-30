const express = require("express");
const app = express();
require("dotenv").config();
const userRouter = require("./routes/user.router");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRouter);

const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI || process.env.MONGO_URL;

if (!mongoURI) {
    throw new Error("Missing MongoDB connection string. Set MONGO_URI or MONGO_URL in .env.");
}

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});