const webpack = require ('webpack');

module.exports = function override(config){
    const fallback = config.resolve.fallback || {}; //checks for fallbacks, else assigns ?? to empty object
    Object.assign(fallback, {
        "stream": require.resolve("stream-browserify"),
        fs: false,
        net: false,
        dns: false,
        child_process: false,
        tls: false,
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "http": require.resolve("stream-http"),
        "url": require.resolve("url/"),
        "zlib": require.resolve("browserify-zlib"),
        "https": require.resolve("https-browserify"),
        "util": require.resolve("util/"),
        "os": require.resolve("os-browserify/browser"),
        "assert": require.resolve("assert/"),
        "vm": require.resolve("vm-browserify"),
        "querystring": require.resolve("querystring-es3")
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process:'process/browser',
        })
    ])
    return config;
};

