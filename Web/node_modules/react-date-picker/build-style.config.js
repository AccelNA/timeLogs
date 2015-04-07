var ExtractTextPlugin = require('extract-text-webpack-plugin')

var CONFIG = require('./boilerplate.json')

var styleConfig = CONFIG.style || {}
var mainFile    = styleConfig.main || './index.styl'

module.exports = {
    entry: {
        'index': mainFile
    },
    output: {
        filename: 'index.css'
    },
    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
}