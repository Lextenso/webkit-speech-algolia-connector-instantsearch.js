const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/webkitSpeechAlgoliaConnector.js'),
    output: {
        library: 'webkitSpeechAlgoliaConnector',
        libraryTarget: 'umd',
        filename: 'webkitSpeechAlgoliaConnector.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: "web",
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};
