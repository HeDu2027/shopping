import { getRandomRating } from '../config/getRandomRating';

const imageContext = require.context('./image', false, /\.(jpg|jpe?g|webp)$/);

// Create the images array using the imageContext
const images = imageContext.keys().map(imageContext);
const { v4: uuidv4 } = require('uuid');

const ClothingsData = [
    {
        id: uuidv4(),        name: 'Casual T-Shirt',
        price: 19.99,
        stock: 20,
        mainImage: images[0],
        images: [images[1], images[2]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Formal Suit',
        price: 79.99,
        stock: 30,
        mainImage: images[3],
        images: [images[4], images[5]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Summer Dress',
        price: 49.99,
        stock: 15,
        mainImage: images[6],
        images: [images[7], images[8]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Winter Jacket',
        price: 99.99,
        stock: 10,
        mainImage: images[9],
        images: [images[10], images[11]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Running Shoes',
        price: 59.99,
        stock: 25,
        mainImage: images[12],
        images: [images[13], images[14]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Jeans',
        price: 39.99,
        stock: 30,
        mainImage: images[15],
        images: [images[16], images[17]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Sweatpants',
        price: 29.99,
        stock: 20,
        mainImage: images[18],
        images: [images[19], images[20]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Yoga Pants',
        price: 34.99,
        stock: 15,
        mainImage: images[21],
        images: [images[22], images[23]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Baseball Cap',
        price: 14.99,
        stock: 20,
        mainImage: images[24],
        images: [images[25], images[26]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Sunglasses',
        price: 24.99,
        stock: 15,
        mainImage: images[27],
        images: [images[28], images[29]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Leather Belt',
        price: 19.99,
        stock: 10,
        mainImage: images[30],
        images: [images[31], images[32]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Wrist Watch',
        price: 49.99,
        stock: 10,
        mainImage: images[33],
        images: [images[34], images[35]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Necktie',
        price: 14.99,
        stock: 20,
        mainImage: images[36],
        images: [images[37], images[38]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Scarf',
        price: 19.99,
        stock: 30,
        mainImage: images[39],
        images: [images[40], images[41]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Gloves',
        price: 12.99,
        stock: 25,
        mainImage: images[42],
        images: [images[43], images[44]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Beanie Hat',
        price: 9.99,
        stock: 20,
        mainImage: images[45],
        images: [images[46], images[47]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Beanie low Hat',
        price: 89.99,
        stock: 25,
        mainImage: images[48],
        images: [images[49], images[50]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Beanie Necktie',
        price: 19.99,
        stock: 20,
        mainImage: images[51],
        images: [images[52], images[53]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Necktie Hat',
        price: 49.99,
        stock: 26,
        mainImage: images[54],
        images: [images[55], images[56]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Necktie Red Hat',
        price: 39.99,
        stock: 26,
        mainImage: images[57],
        images: [images[58], images[59]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Necktie List Hat',
        price: 29.99,
        stock: 21,
        mainImage: images[60],
        images: [images[61], images[62]],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Necktie black Hat',
        price: 19.99,
        stock: 45,
        mainImage: images[63],
        images: [images[64], images[65]],
        rating: getRandomRating()
    },
];

export default ClothingsData
