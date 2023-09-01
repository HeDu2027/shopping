import image from './image/liptsik.jpg'
import { getRandomRating } from './config/getRandomRating';
const { v4: uuidv4 } = require('uuid');

const CosmeticsData = [
    {
        id: uuidv4(),        name: 'Lipstick - Ruby Red',
        price: 19.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Foundation - Natural Beige',
        price: 29.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Mascara - Black',
        price: 14.99,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Eyeliner - Jet Black',
        price: 12.99,
        stock: 40,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Blush - Rose Pink',
        price: 24.99,
        stock: 15,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Eyeshadow Palette - Naturals',
        price: 34.99,
        stock: 10,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Nail Polish - Coral',
        price: 9.99,
        stock: 50,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Concealer - Light',
        price: 14.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Bronzer - Sun Kissed',
        price: 19.99,
        stock: 15,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Highlighter - Champagne',
        price: 22.99,
        stock: 10,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Face Primer - Matte Finish',
        price: 18.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Setting Spray - Long Lasting',
        price: 16.99,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Lip Gloss - Shimmer Pink',
        price: 14.99,
        stock: 40,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'BB Cream - SPF 30',
        price: 20.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Eyebrow Pencil - Dark Brown',
        price: 12.99,
        stock: 35,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Face Powder - Translucent',
        price: 19.99,
        stock: 15,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Contour Kit - Medium Tones',
        price: 24.99,
        stock: 20,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Liquid Lipstick - Berry Shade',
        price: 17.99,
        stock: 30,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Facial Serum - Hydrating',
        price: 29.99,
        stock: 25,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
    {
        id: uuidv4(),        name: 'Eyelash Curler',
        price: 8.99,
        stock: 50,
        mainImage: image,
        images: [image, image],
        rating: getRandomRating()
    },
];

export default CosmeticsData;
