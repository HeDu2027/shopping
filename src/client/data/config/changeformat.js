const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const clothingsData = require("../ClothingsData");

// Generate a list of static UUIDs
const numberOfProducts = clothingsData.length;
const uuids = Array.from({ length: numberOfProducts }, () => uuidv4());

// Assign static UUIDs to products
const ClothingData = clothingsData.map((product, index) => ({
    ...product,
    id: uuids[index]
}));

console.log(ClothingData);

fs.writeFileSync('ClothingData.js', JSON.stringify(ClothingData, null, 2));
