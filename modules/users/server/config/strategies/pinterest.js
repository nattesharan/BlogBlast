'use strict';
/**
 * Module dependencies
 */
var passport = require('passport'),
  PinterestStrategy = require('passport-pinterest-oauth').OAuth2Strategy,
  users = require('../../controllers/users.server.controller');
module.exports = function (config) {
  passport.use(new PinterestStrategy({
    clientID: config.pinterest.clientID,
    clientSecret: config.pinterest.clientSecret,
    callbackURL: config.pinterest.callbackURL,
    passReqToCallback: true
  },
  function (req, accessToken, refreshToken, profile, done) {
    // console.log(profile);
    var providerData = profile._json;
    providerData.id = providerData.data.id;
    providerData.accessToken = accessToken;
    providerData.emails = profile.emails;
    // providerData.refreshToken = refreshToken;
    var providerUserProfile = {
      provider: profile.provider,
      firstName: providerData.data.first_name,
      lastName: providerData.data.last_name,
      providerIdentifierField: 'id',
      displayName: profile.displayName,
      email: profile.emails[0],
      providerData: providerData
    };
    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};
