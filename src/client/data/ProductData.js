import image from "./assets/image0007.jpg";
import image1 from "./assets/image0006.jpg"
import g22_1 from "./assets/image0004.jpg"
import g22_2 from "./assets/image0005.jpg"
import applewatch_0 from "./assets/image0001.jpg"
import applewatch_1 from "./assets/image0002.jpg"
import applewatch_2 from "./assets/image0003.jpg"

import {getRandomRating} from './config/getRandomRating'
const { v4: uuidv4 } = require('uuid');


export const ProductData = [
    {
        id: uuidv4(),        name: 'Apple MacBook Pro',
        price: 1999.99,
        stock: 20,
        mainImage: image,
        images: [
            g22_1,
            g22_2,
        ],
        rating: getRandomRating()
    },
    { id: uuidv4(),        name: 'Samsung Galaxy S21',
        price: 799.99,
        stock: 30,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Sony PlayStation 5',
        price: 499.99,
        stock: 15,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Microsoft Xbox Series X',
        price: 499.99,
        stock: 10,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Nintendo Switch',
        price: 299.99,
        stock: 25,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Apple iPhone 13',
        price: 999.99,
        stock: 30,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Google Pixel 6',
        price: 599.99,
        stock: 20,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Samsung Galaxy Tab S7',
        price: 649.99,
        stock: 15,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Apple iPad Pro',
        price: 799.99,
        stock: 20,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Microsoft Surface Pro 7',
        price: 749.99,
        stock: 15,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Dell XPS 13',
        price: 999.99,
        stock: 10,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'HP Spectre x360',
        price: 1249.99,
        stock: 10,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Apple Watch Series 7',
        price: 399.99,
        stock: 20,
        mainImage: applewatch_0,
        images: [
            applewatch_1,
            applewatch_2,
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Samsung Galaxy Watch 4',
        price: 249.99,
        stock: 30,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Fitbit Versa 3',
        price: 229.99,
        stock: 25,
        mainImage: image,
        images: [
            "./path-to-image/s-l16001.jpg",
            "./path-to-image/s-l16002.jpg",
        ],
        rating: getRandomRating()
    },
];

export const ClothingData = [
        {
            id: uuidv4(),            name: 'Elegant Dress',
            price: 59.99,
            stock: 50,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: uuidv4(),            name: 'Casual Shirt',
            price: 29.99,
            stock: 70,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: uuidv4(),            name: 'Denim Jeans',
            price: 49.99,
            stock: 60,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: uuidv4(),            name: 'Leather Jacket',
            price: 199.99,
            stock: 40,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: uuidv4(),            name: 'Silk Scarf',
            price: 19.99,
            stock: 80,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: uuidv4(),            name: 'Woolen Sweater',
            price: 69.99,
            stock: 45,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: uuidv4(),            name: 'Summer Hat',
            price: 24.99,
            stock: 55,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: uuidv4(),            name: 'Running Shoes',
            price: 89.99,
            stock: 65,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: uuidv4(),            name: 'Leather Belt',
            price: 34.99,
            stock: 75,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: uuidv4(),            name: 'Sunglasses',
            price: 79.99,
            stock: 85,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: uuidv4(),            name: 'Formal Suit',
            price: 249.99,
            stock: 30,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        }
    ]
;

