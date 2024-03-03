const mongoose = require('mongoose');

const commentSchema= new mongoose.Schema({
    comment : {
        type : String,
        require: true
    },    
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        require: true
    },
    blogId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'blog',
        require: true
    }     
},
    { timestamps: true}
);

const Comment= mongoose.model("comment", commentSchema);

module.exports= Comment;