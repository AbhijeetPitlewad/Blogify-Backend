const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: Number,

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        require: true,
        validate: {
            validator: (val) => {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                return emailRegex.test(val);
            },
            message: "Provide correct email format"
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 6,
        unique: true
    }
},

    { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = { User };