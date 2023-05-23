const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

// eslint-disable-next-line no-nested-ternary
const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:49299';

const context = [
    '/api',
];

const onError = (err) => {
    console.error(`${err.message}`);
};

// eslint-disable-next-line func-names
module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target,
        // Handle errors to prevent the proxy middleware from crashing when
        // the ASP NET Core webserver is unavailable
        onError,
        secure: false,
        // Uncomment this line to add support for proxying websockets
        // ws: true
        headers: {
            Connection: 'Keep-Alive',
        },
    });

    app.use(appProxy);
};
