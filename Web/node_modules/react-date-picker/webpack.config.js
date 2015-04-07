var CONFIG = require('./boilerplate.json')

var scriptConfig = CONFIG.script || {}
var mainFile     = scriptConfig.main || './index.jsx'

module.exports = {
    entry: mainFile,
    output: {
        publicPath: 'http://localhost:8090/assets'
    },
    module: {
        loaders: require('./loaders.config')
    },
    externals: {
        'react': 'React'
    },
    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
    }
}