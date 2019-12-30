const workBoxPlugin = require('workbox-webpack-plugin')

module.exports = function override(config) {
    config.plugins = config.plugins.map(plugin => (plugin.constructor.name === 'GenerateSW') ?
        new workBoxPlugin.InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'service-worker.js'
        })
        : plugin
    )
    return config
}