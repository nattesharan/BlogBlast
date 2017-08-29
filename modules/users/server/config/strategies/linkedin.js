'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
  LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
  users = require('../../controllers/users.server.controller');

module.exports = function (config) {
  // Use linkedin strategy
  passport.use(new LinkedInStrategy({
    clientID: config.linkedin.clientID,
    clientSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL,
    passReqToCallback: true,
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'picture-url']
  },
  function (req, accessToken, refreshToken, profile, done) {
    // Set the provider data and include tokens
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;
    providerData.username = providerData.firstName + providerData.lastName;
    providerData.imageURL = (providerData.pictureUrl) ? providerData.pictureUrl : req.user.profileImageURL;
    // Create the user OAuth profile
    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      username: profile.username,
      profileImageURL: (providerData.pictureUrl) ? providerData.pictureUrl : undefined,
      provider: 'linkedin',
      providerIdentifierField: 'id',
      providerData: providerData
    };

    // Save the user OAuth profile
    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};
