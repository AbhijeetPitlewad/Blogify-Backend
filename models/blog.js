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
    
    postedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        require: true
    },
    
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
},
    { timestamps: true}
);

const Blog= mongoose.model("blog", blogSchema);

module.exports= Blog;