const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre("save", async function () {
    try {
        const salt_round = 10;
        const rawPassword = this.password;
        const hashedPassword = await bcrypt.hash(rawPassword, salt_round);
        this.password = hashedPassword;
        console.log(this.password, hashedPassword);
        // next();
    } catch (err) {
        // next(err);
        return err;
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;