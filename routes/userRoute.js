const express = require('express')
const mongoose = require('mongoose');

const { User } = require('../models/user')

const router = express.Router();

router.get('/', async (req, res) => {

    try {
        let users = await User.find({});
        console.log(users);
        res.status(200).json({ "users": users });
    }
    catch (err) {
        console.log('ERROR: ' + err.message);
        res.status(400).json({
            "error": err.message
        });
    }
});

router.post('/sign-in', async (req, res) => {

    try {
        const { email, password }= req.body;
        let user = await User.findOne({ email : email, password: password });
        console.log(user);

        if(user!= null){
            user.password=undefined;
            // console.log(user);
            res.status(200).json({ "user": user });
        }
        else{
            res.status(401).json({ "Error" : "Invalid email or password"});
        }
    }
    catch (err) {
        console.log('ERROR: ' + err.message);
        res.status(400).json({
            "error": err.message
        });
    }
});

router.post('/sign-up', async (req, res) => {

    try {
        let user = await User.create(req.body);
        console.log(user);

        res.status(201).json({
            "message": " User created successfully",
            "user": user
        });
    }
    catch (err) {
        console.log('ERROR: ' + err.message);
        res.status(400).json({
            "error": err.message
        });
    }
})

module.exports = router;