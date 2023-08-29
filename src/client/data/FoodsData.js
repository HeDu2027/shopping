import image from '/Users/hedu/Downloads/app/shopping/src/client/data/image/apple.jpg'
import { getRandomRating } from './config/getRandomRating';
const { v4: uuidv4 } = require('uuid');

const FoodsData = [
    {
        id: uuidv4(),        name: 'Bread',
        price: 1.99,
        stock: 50,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Rice',
        price: 0.99,
        stock: 60,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Pasta',
        price: 2.49,
        stock: 40,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Chicken',
        price: 5.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Beef Steak',
        price: 14.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Salmon',
        price: 12.99,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Shrimp',
        price: 9.99,
        stock: 35,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Broccoli',
        price: 2.29,
        stock: 45,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Carrots',
        price: 1.49,
        stock: 55,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Potatoes',
        price: 0.79,
        stock: 65,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Tomatoes',
        price: 1.29,
        stock: 50,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Cheese',
        price: 3.99,
        stock: 40,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Milk',
        price: 0.99,
        stock: 60,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Eggs',
        price: 2.49,
        stock: 50,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Butter',
        price: 2.99,
        stock: 45,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Yogurt',
        price: 1.49,
        stock: 55,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Cereal',
        price: 3.49,
        stock: 40,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Oats',
        price: 2.99,
        stock: 50,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Honey',
        price: 4.99,
        stock: 35,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Jam',
        price: 3.29,
        stock: 45,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    }
];


export default FoodsData;
