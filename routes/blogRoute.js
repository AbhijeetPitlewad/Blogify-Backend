const express = require('express')

const Blog= require('../models/blog')
const Comment= require('../models/comment')


const router = express.Router();

router.post('/', async (req, res) => {

    try {

        let {title, description} = req.body;
        let user= JSON.parse(req.cookies['token'])
        let postedBy= user._id;

        let blog = await Blog.create({
            title,
            description,
            postedBy
        });

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
        let blog = await Blog.findById(id).populate('postedBy')
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



module.exports = router;