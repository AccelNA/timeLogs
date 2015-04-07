module.exports = {
    entry: './src/index.jsx',
    output: {
        path         : __dirname + "/dist",
        libraryTarget: 'umd',
        library      : 'DatePicker',
        filename     : require('./DIST_FILE_NAME') + '.nomoment.js'
    },
    module: {
        loaders: require('./loaders.config')
    },
    externals: {
        'react' : 'React',
        'moment': 'moment'
    },
    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
    }
}