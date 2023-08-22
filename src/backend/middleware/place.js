const axios = require('axios');

exports.getLocationFromCoordinates = async (req, res) => {
    const { lat, lon } = req.body;
    try {
        // const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        // const data = await response.json();
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = response.data;

        const location = {
            city: data.address.city || data.address.town || data.address.village,
            country: data.address.country,
            countryCode: data.address.country_code.toUpperCase()
        };
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get location' });
    }
};
