module.exports = {
    // ... other webpack config settings
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "fs": false
        }
    }
};
