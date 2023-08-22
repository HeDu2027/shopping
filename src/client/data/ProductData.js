import image from "/Users/hedu/Downloads/app/shopping/src/client/components/lists/productlist/asset/Samsung-Galaxy-S22-Ultra-5G-256-GB-phantom-white.jpg";
import image1 from "/Users/hedu/Downloads/app/shopping/src/client/data/asset/tshirt.png"
import image2 from "/Users/hedu/Downloads/app/shopping/src/client/data/asset/medium11.webp"
import image3 from "/Users/hedu/Downloads/app/shopping/src/client/data/asset/MXNL2.jpg"
import g22_1 from "/Users/hedu/Downloads/app/shopping/src/client/data/asset/g22_1.jpg"
import g22_2 from "/Users/hedu/Downloads/app/shopping/src/client/data/asset/g22_2.jpg"
import applewatch_0 from "/Users/hedu/Downloads/app/shopping/src/client/data/asset/applewatch_0.jpg"
import applewatch_1 from "/Users/hedu/Downloads/app/shopping/src/client/data/asset/applewatch_1.jpg"
import applewatch_2 from "/Users/hedu/Downloads/app/shopping/src/client/data/asset/applewatch_02.jpg"

const getRandomRating = () => {
    const ratings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    return ratings[Math.floor(Math.random() * ratings.length)];
};

export const ProductData = [
    {
        id: 1,
        name: 'Apple MacBook Pro',
        price: 1999.99,
        stock: 20,
        mainImage: image,
        images: [
            g22_1,
            g22_2,
        ],
        rating: getRandomRating()
    },
    { id: 2,
        name: 'Samsung Galaxy S21',
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
        id: 3,
        name: 'Sony PlayStation 5',
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
        id: 4,
        name: 'Microsoft Xbox Series X',
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
        id: 5,
        name: 'Nintendo Switch',
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
        id: 6,
        name: 'Apple iPhone 13',
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
        id: 7,
        name: 'Google Pixel 6',
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
        id: 8,
        name: 'Samsung Galaxy Tab S7',
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
        id: 9,
        name: 'Apple iPad Pro',
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
        id: 10,
        name: 'Microsoft Surface Pro 7',
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
        id: 11,
        name: 'Dell XPS 13',
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
        id: 12,
        name: 'HP Spectre x360',
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
        id: 13,
        name: 'Apple Watch Series 7',
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
        id: 14,
        name: 'Samsung Galaxy Watch 4',
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
        id: 15,
        name: 'Fitbit Versa 3',
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
            id: 101,
            name: 'Elegant Dress',
            price: 59.99,
            stock: 50,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: 102,
            name: 'Casual Shirt',
            price: 29.99,
            stock: 70,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: 103,
            name: 'Denim Jeans',
            price: 49.99,
            stock: 60,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: 104,
            name: 'Leather Jacket',
            price: 199.99,
            stock: 40,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: 105,
            name: 'Silk Scarf',
            price: 19.99,
            stock: 80,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: 106,
            name: 'Woolen Sweater',
            price: 69.99,
            stock: 45,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: 107,
            name: 'Summer Hat',
            price: 24.99,
            stock: 55,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: 108,
            name: 'Running Shoes',
            price: 89.99,
            stock: 65,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: 109,
            name: 'Leather Belt',
            price: 34.99,
            stock: 75,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: 110,
            name: 'Sunglasses',
            price: 79.99,
            stock: 85,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        },
        {
            id: 111,
            name: 'Formal Suit',
            price: 249.99,
            stock: 30,
            mainImage: image1,
            images: [],
            rating: getRandomRating()
        }
    ]
;

