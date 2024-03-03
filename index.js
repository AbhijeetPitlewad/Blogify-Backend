const express= require('express');
const mongoose= require('mongoose');
const { User } = require('./models/user');
// const { Blog } = require('./models/Blog');

const userRoute= require('./routes/userRoute')
const blogRoute= require('./routes/blogRoute')
const commentRoute= require('./routes/commentRoute')

const PORT= 9292;

mongoose.connect('mongodb://127.0.0.1:27017/BloggingDB')
.then(() => {
    console.log('Connected to MongoDB succesfully!');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

const app= express();

app.use(express.json())

app.get("/", (req, res)=>{
    console.log("http://localhost:9292/student_database")
    res.status(200).json({ msg: "Blogging" });
})

app.use('/user',  userRoute);
app.use('/blog', blogRoute);
app.use('/comment', commentRoute);

app.listen(PORT, (err)=>{
    if(err){
        console.log("ERROR: "+ err);
    }
    console.log('Server Running at PORT= '+ PORT);
})