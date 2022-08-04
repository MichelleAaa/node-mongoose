const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number, //when you use a type of number, you can specify the boundaries for it.
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true //No two documents should have the same value in the name field.
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema] //We add in the commentSchema inside the campsiteScheme. 
}, {
    timestamps: true //This is a second optional argument. In this case, we are using timestamps as true. This will cause mongoose to add two values, ‘created at’ and added at. When a document is created it will be given a ‘created at’ and ‘updated at’ property. Thereafter, whenever it’s updated, the ‘updated at’ property will be updated by mongoose. 
});

const Campsite = mongoose.model('Campsite', campsiteSchema); //This creates a model named Campsite, and the first argument is the capitalized and singular version of the collection you want to use for the model. Mongoose will automatically look for the lowercase *** version to look for the collection. So Campsite is the first argument, while the second argument is the schema we want to use for the collection. In this case, campsiteSchema.
//this returns a constructor function. 
//mongoose was written in 2010 so it doesn’t use classes. The model is a desugared class in a way. It’s being used to instantiate objects, or in this case, instantiate documents for MongoDB.

module.exports = Campsite;