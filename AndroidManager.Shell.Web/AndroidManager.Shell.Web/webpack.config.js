const path = require('path');
module.exports = {
    entry: './wwwroot/js/Jobs/JobsPannel.jsx',
    output: {
        path: path.resolve(__dirname, 'wwwroot/dist'),
        filename: 'JobsBundle.js'
    }
};