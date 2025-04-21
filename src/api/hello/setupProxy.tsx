const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app: { use: (arg0: string, arg1: any) => void; }) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.cartwings.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v1', // rewrite path
      },
    })
  );
};