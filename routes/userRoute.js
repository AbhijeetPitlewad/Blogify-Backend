const express = require('express')

const { User } = require('../models/user');
const cookieParser = require('cookie-parser');

const router = express.Router();


router.post('/sign-up', async (req, res) => {

    try {
        let user = await User.create(req.body);
        console.log(user);

        if(user!= null){
            res.cookie('token', JSON.stringify(user));
        }

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


router.post('/sign-in', async (req, res) => {

    try {
        const { email, password }= req.body;
        let user = await User.findOne({ email : email, password: password }).select('-password');
        console.log(user);

        if(user!= null){
            // console.log(user);
            res.cookie('token', JSON.stringify(user));
            res.status(200).json({ "user": user });
        }
        else{
            res.cookie('token','');
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


// only for development purpose
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

router.get('/profile/:id', async (req, res) => {

    try {
        let user = await User.findById(req.params.id).select('-password')
        console.log(user);
        if(user== null){
            return res.status(400).json({
                "error": 'no user wihth provdied userid'
            });
        }
        res.status(200).json({ "user": user });
    }
    catch (err) {
        console.log('ERROR: ' + err.message);
        res.status(400).json({
            "error": err.message
        });
    }
});






router.put('/:id', async (req, res) => {

    try {
        let user = await User.findByIdAndUpdate({ _id : req.params.id}, req.body, { new : true}).select('-password');
        console.log(user);

        res.status(201).json({
            "message": " User updated successfully",
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