const mongoose = require('mongoose');
const Product = require('./models/Product');
const AllData = require('../client/data/AllData');

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const insertData = async () => {
    try {
        for (let category in AllData) {
            const items = AllData[category];
            for (let item of items) {
                const product = new Product(item);
                await product.save();
            }
        }
        console.log("Data migration completed!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error inserting data:", error);
    }
};

insertData();
