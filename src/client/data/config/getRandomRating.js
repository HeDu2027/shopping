export function getRandomRating() {
    // Generate a random float between 1 and 5, rounded to one decimal place
    return parseFloat((Math.random() * 4 + 0.5).toFixed(1));
}
