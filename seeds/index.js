const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open', () => {
    console.log('Database Connected')
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i =0; i<400; i++) {
        const random1000 = Math.floor(Math.random() * 1000) +1;
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60880b4639299211d8e40c89',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {            
                  url: 'https://res.cloudinary.com/bashdevelops/image/upload/v1619615095/YelpCamp/dalclerwfxv5i3afpsqt.jpg',
                  filename: 'YelpCamp/dalclerwfxv5i3afpsqt'
                },
                { 
                  url: 'https://res.cloudinary.com/bashdevelops/image/upload/v1619615095/YelpCamp/xuu0sjjqjddml2hdsehz.jpg',
                  filename: 'YelpCamp/xuu0sjjqjddml2hdsehz'
                }
              ],
             
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nisi rem blanditiis quidem, nam suscipit quia quibusdam! Similique, officia nemo quaerat ullam doloribus illum, ex, nihil quam eveniet deleniti corporis.',
            price,
            geometry: { 
                type: 'Point',
                 coordinates: [ cities[random1000].longitude, cities[random1000].latitude ] 
                }
        })
        await camp.save();
    }
} 

seedDB().then(() => {
    mongoose.connection.close();
})