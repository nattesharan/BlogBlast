'use strict';

var validator = require('validator'),
  path = require('path'),
  config = require(path.resolve('./config/config'));
var request = require('request');
var cheerio = require('cheerio');
var FB = require('fb');
var Twitter = require('twitter');
var fb = new FB.Facebook({ appId: config.facebook.clientID, appSecret: config.facebook.clientSecret });
var Linkedin = require('node-linkedin')(config.linkedin.clientID, config.linkedin.clientSecret);
/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  res.render('modules/core/server/views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared)
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
exports.getUrlInfo = function (req, res) {
  request(req.body.url, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      var $ = cheerio.load(html);
      var metadata = {};
      metadata.title = $('meta[name="og:title"]').attr('content');
      if (metadata.title === undefined)
        metadata.title = $('meta[property="og:title"]').attr('content');
      if (metadata.title === undefined)
        metadata.title = $('meta[name="title"]').attr('content');
      metadata.description = $('meta[name="og:description"]').attr('content');
      if (metadata.description === undefined)
        metadata.description = $('meta[property="og:description"]').attr('content');
      if (metadata.description === undefined)
        metadata.description = $('meta[name="description"]').attr('content');
      metadata.image = $('meta[name="og:image"]').attr('content');
      if (metadata.image === undefined)
        metadata.image = $('meta[property="og:image"]').attr('content');
      if (metadata.image === undefined)
        metadata.image = $('meta[name="image"]').attr('content');
      res.json(metadata);
    }
  });
};
exports.post = function (req, res) {
  if (req.user.additionalProvidersData.facebook !== undefined) {
    fb.setAccessToken(req.user.additionalProvidersData.facebook.accessToken);
    fb.api('me/feed', 'post', { link: req.body.url, message: req.body.post }, function (res) {
      if (!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
      }
      console.log('Post Id: ' + res.id);
    });
  }
  if (req.user.additionalProvidersData.twitter !== undefined) {
    var client = new Twitter({
      consumer_key: config.twitter.clientID,
      consumer_secret: config.twitter.clientSecret,
      access_token_key: req.user.additionalProvidersData.twitter.token,
      access_token_secret: req.user.additionalProvidersData.twitter.tokenSecret
    });
    client.post('statuses/update', { status: req.body.post + ' ' + req.body.url })
    .then(function (tweet) {
      console.log(tweet);
    }).catch(function (error) {
      throw error;
    });
  }
  if (req.user.additionalProvidersData.linkedin !== undefined) {
    var linkedin = Linkedin.init(req.user.additionalProvidersData.linkedin.accessToken);
    linkedin.people.share({
      'comment': req.body.post,
      'content': {
        'title': req.body.title,
        'description': req.body.description,
        'submitted-url': req.body.url,
        'submitted-image-url': req.body.image
      },
      'visibility': { 'code': 'anyone' }
    }, function (err, data) {
      console.log(data);
    });
  }
  res.json(req.body);
};
