const mongoose = require('mongoose');

function connectToMongoDB()  {
    mongoose.connect('mongodb://127.0.0.1:27017/BloggingDB')
        .then(() => {
            console.log('Connected to MongoDB succesfully!');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error.message);
        });

}

module.exports = connectToMongoDB;