const url = require('url');

module.exports = function redirectIndices(req, res, next) {
    const urlObj = url.parse(req.url);

    if (urlObj.pathname.endsWith('index.html')) {
        return res.redirect(301, urlObj.pathname.split('index.html')[0]);
    }
    next();
};