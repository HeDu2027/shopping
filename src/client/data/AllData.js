// import DrinksData from './DrinksData';
// import FoodsData from './FoodsData';
// import ClothingData from './Clothing/ClothingsData';
// import CosmeticsData from "./CosmeticsData";
// import SneakerData from "./sneakersData";

const DrinksData = require('./DrinksData');
const FoodsData = require('./FoodsData');
const ClothingData = require('./ClothingsData');
const CosmeticsData = require('./CosmeticsData');
const SneakerData = require('./sneakersData');

const AllData = {
    drinks: DrinksData,
    foods: FoodsData,
    clothing: ClothingData,
    cosmetics:CosmeticsData,
    sneaker:SneakerData
};

// export default AllData;
module.exports = AllData;
