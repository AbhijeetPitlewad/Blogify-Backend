const express = require('express')
const mongoose = require('mongoose');

const Comment= require('../models/comment');


const router = express.Router();


router.post('/blog/:id/comment', async (req, res) => {

    try {
        
        
        let user= JSON.parse(req.cookies['token'])
        let userId= user?._id;
        let comment=  req.body.comment;
        let blogId= req.params.id;
        let postedComment = await Comment.create({ comment, blogId, userId} );
        console.log(postComment);

        res.status(201).json({
            "message": "Comment added successfully",
            "comment": postedComment
        });
    }
    catch (err) {
        console.log('ERROR: ' + err.message);
        res.status(400).json({
            "error": err.message
        });
    }
});

router.get('/', async (req, res) => {

    try {
        let comments = await Comment.find();
        console.log(comments);
        res.status(200).json({ "comments": comments });
    }
    catch (err) {
        console.log('ERROR: ' + err.message);
        res.status(400).json({
            "error": err.message
        });
    }
});




//this comments are related to blog so we should implement it in Blog which is good choice
// ----------------------------------------------------------------------------------------------

// router.get('/:id', async (req, res) => {

//     try {
//         const blogid= req.params.id;
//         let comments = await Comment.find({blogId: blogid })
//         console.log(comments);

//         if(comments!= null){
//             res.status(200).json({ "comments": comments });
//         }
//         else{
//             res.status(400).json({ "Error" : "No Comments found"});
//         }
//     }
//     catch (err) {
//         console.log('ERROR: ' + err.message);
//         res.status(400).json({
//             "error": err.message
//         });
//     }
// });



module.exports = router;