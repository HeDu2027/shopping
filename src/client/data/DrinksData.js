import image from '/Users/hedu/Downloads/app/shopping/src/client/data/image/drink.jpg'
import { getRandomRating } from './config/getRandomRating';
const { v4: uuidv4 } = require('uuid');


const DrinksData = [
    {
        id: uuidv4(),        name: 'Green Tea',
        price: 2.99,
        stock: 50,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Espresso',
        price: 3.49,
        stock: 40,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Lemonade',
        price: 2.49,
        stock: 60,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Mango Smoothie',
        price: 4.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Iced Latte',
        price: 3.99,
        stock: 40,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Champagne',
        price: 29.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Red Wine',
        price: 19.99,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Craft Beer',
        price: 4.49,
        stock: 50,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Orange Juice',
        price: 2.79,
        stock: 60,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Coca-Cola',
        price: 1.49,
        stock: 80,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Pepsi',
        price: 1.49,
        stock: 80,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Ginger Ale',
        price: 1.69,
        stock: 70,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Mojito',
        price: 8.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Pina Colada',
        price: 9.49,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Bloody Mary',
        price: 8.49,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Margarita',
        price: 7.99,
        stock: 35,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Cosmopolitan',
        price: 8.29,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Whiskey Sour',
        price: 7.79,
        stock: 40,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Tequila Sunrise',
        price: 7.99,
        stock: 35,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Martini',
        price: 8.49,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    }
];

export default DrinksData;
