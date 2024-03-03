const mongoose = require('mongoose');

const blogSchema= new mongoose.Schema({
    title : {
        type : String,
        require: true
    },
    description : {
        type : String,
        require: true
    },
    
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        require: true
    }    
},
    { timestamps: true}
);

const Blog= mongoose.model("blog", blogSchema);

module.exports= Blog;