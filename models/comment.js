const mongoose= require('mongoose');

const commentSchema = mongoose.Schema(
    {
        comment: {
            type : String,
            require: true
        },
        userId: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'user',
            require: true
        },
        blogId: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'blog',
            require: true
        }
    },
    { timestamps: true }
)

module.exports= mongoose.model('comment', commentSchema);