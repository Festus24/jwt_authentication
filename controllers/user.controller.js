const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendVerificationMail = require("../services/email.service");

const register = async (req, res) => {
    try {
        console.log(req.body);
        const newUser = new User(req.body);
        const result = await newUser.save();
        await sendVerificationMail({
            email: req.body.email,
            name: req.body.firstName,
        });
        // res.status(200).json(result);
        res.send({ message: "User Registered Successfully" });
    } catch (err) {
        res.send({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        console.log(req.body);
        // console.log
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.send({ message: "user does not exist" });

        const verify = await bcrypt.compare(password, user.password);
        if (!verify) return res.send({ message: "password does not match" });

        const token = jwt.sign({ data: user }, "myvertopsecret", {
            expiresIn: "60s",
        });
        console.log(token);
        res.send({ message: "user logged in successfully", token: token });

        // res.send({ message: "user logged in successfully" });
    } catch (err) {
        console.log(err);
        res.send({ message: err.message });
    }
};
const dashboard = (req, res) => {
    //   console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, "myvertopsecret");
    console.log(decoded);
    res.send("dashboard");
};

module.exports = { register, login, dashboard };