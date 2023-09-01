import image from './image/airpodmax.png'
import { getRandomRating } from './config/getRandomRating';
const { v4: uuidv4 } = require('uuid');

const ElectronicsData = [
    {
        id: uuidv4(),        name: 'iPhone 14 Pro Max',
        price: 1099.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Samsung Galaxy S22 Ultra',
        price: 1199.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Sony PlayStation 6',
        price: 599.99,
        stock: 15,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Microsoft Xbox Series Z',
        price: 599.99,
        stock: 10,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Nintendo Switch Pro',
        price: 349.99,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'iPad Pro (5th Generation)',
        price: 999.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Google Pixel 7 Pro',
        price: 899.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Samsung Galaxy Tab S8+',
        price: 849.99,
        stock: 15,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'MacBook Air (M2)',
        price: 999.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Microsoft Surface Laptop 5',
        price: 1299.99,
        stock: 15,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Dell XPS 15',
        price: 1399.99,
        stock: 10,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'HP Omen 17',
        price: 1499.99,
        stock: 10,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Apple Watch Series 8',
        price: 429.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Samsung Galaxy Watch 5',
        price: 279.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Fitbit Luxe',
        price: 149.99,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Bose Noise Cancelling Headphones 700',
        price: 379.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Sony WH-1000XM5',
        price: 359.99,
        stock: 15,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Apple AirPods Max',
        price: 549.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Samsung Galaxy Buds 2',
        price: 149.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Jabra Elite 85t',
        price: 229.99,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    }
];

export default ElectronicsData;
