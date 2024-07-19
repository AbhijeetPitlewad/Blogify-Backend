const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors')
const cookieParser= require('cookie-parser');

const connectToMongoDB = require('./config/database-connect');

const isLoggedIn = require('./middlewares/auth');


const userRoute= require('./routes/userRoute')
const blogRoute= require('./routes/blogRoute')
const commentRoute= require('./routes/commentRoute')




const PORT= 9292;

// mongoose.connect('mongodb://127.0.0.1:27017/BloggingDB')
// .then(() => {
//     console.log('Connected to MongoDB succesfully!');
// })
// .catch((error) => {
//     console.error('Error connecting to MongoDB:', error.message);
// });


connectToMongoDB();

const app= express();

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded())
app.use(express.urlencoded({ extended: true})  );


app.use(cors())

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