const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //These are being set to deal with deprecation warnings from mongo.

connect.then(() => { //connect method contains a promise, so we can chain a .then() method to it. 

    console.log('Connected correctly to server');

    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    }) //Takes an object that defines the new object to create.
//The create method resolves a promise, so we can use it as the start of our promise chain.

    .then(campsite => {
        console.log(campsite);

        return Campsite.findByIdAndUpdate(campsite._id, {
            $set: { description: 'Updated Test Document' } //This is the field we want to change, in this case, the description. 
        }, { //The third argument will cause this method to return the updated document. (The default is that it will return the original document, prior to the update.)
            new: true
        });
    })
    .then(campsite => {
        console.log(campsite);

        campsite.comments.push({ //The comments subdocument is stored in an array, so we are able to use the push method to push in a new object document.
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        });

        return campsite.save(); //Saves the document to the database, and then returns a promise that indicates if it worked or not.
    })
    .then(campsite => {
        console.log(campsite);
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});
