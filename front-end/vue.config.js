module.exports = {
    devServer: {
        headers: { "Accsss-Control-Allow-Origin": "*" },
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:10086',
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    },
}
