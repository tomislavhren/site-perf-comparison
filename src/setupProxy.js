const { createProxyMiddleware } = require('http-proxy-middleware');

const sitePerformanceProxyMiddleware = createProxyMiddleware({
    target: 'http://64.227.57.174:5000',
    changeOrigin: true,
});

const clonerProxyMiddleware = createProxyMiddleware({
    target: 'http://178.128.158.164',
    changeOrigin: true,
});

module.exports = function(app) {
    app.use('/api/add', sitePerformanceProxyMiddleware);
    app.use('/api/results', sitePerformanceProxyMiddleware);
    app.use('/api/full', clonerProxyMiddleware);
}