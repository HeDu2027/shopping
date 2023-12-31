import {getRandomRating} from './config/getRandomRating'
const imageContext = require.context('./assets', false, /\.(png|jpe?g|webp)$/);

// Create the images array using the imageContext
const images = imageContext.keys().map(imageContext);
const { v4: uuidv4 } = require('uuid');


export const Data = [
    {
        id: uuidv4(),        name: 'Apple MacBook Pro',
        price: 1999.99,
        stock: 20,
        mainImage: images[0],
        images: [
            images[1],
            images[2],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Samsung Galaxy S21',
        price: 799.99,
        stock: 30,
        mainImage: images[3],
        images: [
            images[4],
            images[5],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Sony PlayStation 5',
        price: 499.99,
        stock: 15,
        mainImage: images[6],
        images: [
            images[7],
            images[8],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Microsoft Xbox Series X',
        price: 499.99,
        stock: 10,
        mainImage: images[9],
        images: [
            images[10],
            images[11],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Nintendo Switch',
        price: 299.99,
        stock: 25,
        mainImage: images[12],
        images: [
            images[13],
            images[14],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Apple iPhone 13',
        price: 999.99,
        stock: 30,
        mainImage: images[15],
        images: [
            images[16],
            images[17],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Google Pixel 6',
        price: 599.99,
        stock: 20,
        mainImage: images[18],
        images: [
            images[19],
            images[20],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Samsung Galaxy Tab S7',
        price: 649.99,
        stock: 15,
        mainImage: images[21],
        images: [
            images[22],
            images[23],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Apple iPad Pro',
        price: 799.99,
        stock: 20,
        mainImage: images[24],
        images: [
            images[25],
            images[26],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Microsoft Surface Pro 7',
        price: 749.99,
        stock: 15,
        mainImage: images[27],
        images: [
            images[28],
            images[29],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Dell XPS 13',
        price: 999.99,
        stock: 10,
        mainImage: images[30],
        images: [
            images[31],
            images[32],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'HP Spectre x360',
        price: 1249.99,
        stock: 10,
        mainImage: images[33],
        images: [
            images[34],
            images[35],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Apple Watch Series 7',
        price: 399.99,
        stock: 20,
        mainImage: images[36],
        images: [
            images[37],
            images[38],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Samsung Galaxy Watch 4',
        price: 249.99,
        stock: 30,
        mainImage: images[39],
        images: [
            images[40],
            images[41],
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Fitbit Versa 3',
        price: 229.99,
        stock: 25,
        mainImage: images[42],
        images: [
            images[43],
            images[44],
        ],
        rating: getRandomRating()
    },
];
