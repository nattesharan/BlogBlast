'use strict';

/**
 * Module dependencies
 */
var passport = require('passport');

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users password api
  app.route('/api/auth/forgot').post(users.forgot);
  app.route('/api/auth/reset/:token').get(users.validateResetToken);
  app.route('/api/auth/reset/:token').post(users.reset);

  // Setting up the users authentication api
  app.route('/api/auth/signup').post(users.signup);
  app.route('/api/auth/signin').post(users.signin);
  app.route('/api/auth/signout').get(users.signout);

  // Setting the facebook oauth routes
  app.route('/api/auth/facebook').get(users.oauthCall('facebook', {
    scope: ['email', 'publish_actions']
  }));
  app.route('/api/auth/facebook/callback').get(users.oauthCallback('facebook'));

  // Setting the twitter oauth routes
  app.route('/api/auth/twitter').get(users.oauthCall('twitter'));
  app.route('/api/auth/twitter/callback').get(users.oauthCallback('twitter'));

  // Setting the google oauth routes
  app.route('/api/auth/google').get(users.oauthCall('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/plus.stream.read',
      'https://www.googleapis.com/auth/plus.stream.write'
    ]
  }));
  app.route('/api/auth/google/callback').get(users.oauthCallback('google'));

  // Setting the linkedin oauth routes
  app.route('/api/auth/linkedin').get(users.oauthCall('linkedin', {
    scope: [
      'r_basicprofile',
      'r_emailaddress',
      'w_share',
      'rw_company_admin'
    ]
  }));
  app.route('/api/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

  // Setting the github oauth routes
  app.route('/api/auth/github').get(users.oauthCall('github'));
  app.route('/api/auth/github/callback').get(users.oauthCallback('github'));

  // Setting the paypal oauth routes
  app.route('/api/auth/paypal').get(users.oauthCall('paypal'));
  app.route('/api/auth/paypal/callback').get(users.oauthCallback('paypal'));
};
