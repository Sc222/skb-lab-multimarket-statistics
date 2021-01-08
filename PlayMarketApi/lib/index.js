'use strict';

const Express = require('express');
const gplay = require('google-play-scraper');
const path = require('path');

const router = Express.Router();

const cleanUrls = (req) => (app) => Object.assign({}, app, {
  playstoreUrl: app.url,
  url: buildUrl(req, 'apps/' + app.appId),
  reviews: buildUrl(req, 'apps/' + app.appId + '/reviews')
});

const buildUrl = (req, subpath) =>
  req.protocol + '://' + path.join(req.get('host'), req.baseUrl, subpath);


router.get('/playMarket/apps/:appId', function (req, res, next) {
  const opts = Object.assign({appId: req.params.appId}, req.query);
  gplay.app(opts)
    .then(cleanUrls(req))
    .then(res.json.bind(res))
    .catch(next);
});

router.get('/playMarket/apps/:appId/reviews', function (req, res, next) {
  
  const opts = Object.assign({appId: req.params.appId}, req.query);
  console.log(opts);
  gplay.reviews(opts)
    .then(res.json.bind(res))
    .catch(next);
});

function errorHandler (err, req, res, next) {
  res.status(400).json({message: err.message});
  next();
}

router.use(errorHandler);

module.exports = router;
