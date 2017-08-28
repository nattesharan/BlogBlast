'use strict';
/**
 * Module dependencies
 */
var passport = require('passport'),
  TumblrStrategy = require('passport-tumblr').Strategy,
  users = require('../../controllers/users.server.controller');
module.exports = function (config) {
  passport.use(new TumblrStrategy({
    consumerKey: config.tumblr.consumerKey,
    consumerSecret: config.tumblr.consumerSecret,
    callbackURL: config.tumblr.callbackURL,
    passReqToCallback: true
  },
  function (req, token, tokenSecret, profile, done) {
    var providerData = profile._json;
    providerData.token = token;
    providerData.tokenSecret = tokenSecret;
    providerData.username = profile.username;
    var providerUserProfile = {
      provider: profile.provider,
      providerIdentifierField: 'username',
      providerData: providerData
    };
    // console.log('ProviderData --->', providerUserProfile);
    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};
