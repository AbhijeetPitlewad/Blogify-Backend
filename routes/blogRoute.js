const express = require('express')
const mongoose = require('mongoose');

const Blog= require('../models/blog')
const Comment= require('../models/comment')


const router = express.Router();

router.get('/', async (req, res) => {

    try {
        let blogs = await Blog.find();
        console.log(blogs);
        res.status(200).json({ "blogs": blogs });
    }
    catch (err) {
        console.log('ERROR: ' + err.message);
        res.status(400).json({
            "error": err.message
        });
    }
});

router.get('/:id', async (req, res) => {

    try {
        const id= req.params.id;
        let blog = await Blog.findById(id).populate('createdBy');
        let comments = await Comment.find({blogId: id}).populate('user');
        console.log(blog);
        console.log(comments);

        if(blog!= null){
            res.status(200).json({ "blog": blog, "comments" : comments });
        }
        else{
            res.status(400).json({ "Error" : "No Data found"});
        }
    }
    catch (err) {
        console.log('ERROR: ' + err.message);
        res.status(400).json({
            "error": err.message
        });
    }
});

router.post('/', async (req, res) => {

    try {
        let blog = await Blog.create(req.body);
        console.log(blog);

        res.status(201).json({
            "message": " Blog created successfully",
            "blogId": blog._id
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