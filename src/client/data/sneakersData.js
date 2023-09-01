import image from '../data/image/sneaker16.jpg'
import {getRandomRating} from './config/getRandomRating'
const { v4: uuidv4 } = require('uuid');


const SneakerData = [
    {
        id: uuidv4(),        name: 'Air Jordan 1 Retro',
        price: 159.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Adidas Yeezy Boost 350',
        price: 219.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Nike Air Max 97',
        price: 179.99,
        stock: 15,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Puma RS-X',
        price: 110.99,
        stock: 10,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'New Balance 990',
        price: 174.99,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Adidas Ultraboost',
        price: 180.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Nike Dunk Low',
        price: 120.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Asics Gel Lyte III',
        price: 105.99,
        stock: 15,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Reebok Classic Leather',
        price: 75.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Vans Old Skool',
        price: 60.99,
        stock: 15,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Converse Chuck Taylor',
        price: 55.99,
        stock: 10,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Nike Air Force 1',
        price: 90.99,
        stock: 10,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Adidas NMD R1',
        price: 140.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Under Armour HOVR',
        price: 130.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Saucony Shadow 5000',
        price: 120.99,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Fila Disruptor',
        price: 65.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Nike React Element',
        price: 150.99,
        stock: 15,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Adidas Superstar',
        price: 80.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Puma Suede Classic',
        price: 70.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Nike SB Dunk',
        price: 110.99,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    }
];


export default SneakerData;
