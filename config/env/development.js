'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/BlogM',
    options: {},
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    fileLogger: {
      directoryPath: process.cwd(),
      fileName: 'app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: false
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  facebook: {
    clientID: '1854872108172743',
    clientSecret: '1325559e9cd7ac27c85e503dd38414c2',
    callbackURL: '/api/auth/facebook/callback'
  },
  twitter: {
    username: 'natte sharan',
    clientID: 'xzJUpDP4AoAL3KiOcSFnLgorP',
    clientSecret: '0d8r7B5d0VOqCuy0B7B8nhLfwGMLW2zQ3S55VR2Ht7qRMsW45j',
    callbackURL: '/api/auth/twitter/callback'
  },
  google: {
    clientID: '342136799935-t07pbc9lmu93m7ochsmhnks3j6hg0c04.apps.googleusercontent.com',
    clientSecret: '8mdtGcBEcySGqQfAipL_XDdj',
    callbackURL: '/api/auth/google/callback'
  },
  linkedin: {
    clientID: '818vbakdgb5lq1',
    clientSecret: 'Ek84AYFGrai20dR1',
    callbackURL: '/api/auth/linkedin/callback'
  },
  pinterest: {
    clientID: '4919771808332262657',
    clientSecret: 'bb88e59d8fcaee2fd400a5cdd446dbfe173b63c4fb5fc115c43acfa2cc0f657d',
    callbackURL: 'https://04fea48e.ngrok.io/api/auth/pinterest/callback'
  },
  tumblr: {
    consumerKey: 'sRxttRfOMYU2W01piz2mhCdVmS0STsZ7esQ9HBwwMKcxAkePRZ',
    consumerSecret: 'g8JdRgGJI0Q7hPLpD3TPjsfwOmNFEjtoca8MqZGcm9jeeIA0nQ',
    callbackURL: '/api/auth/tumblr/callback'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  },
  livereload: true,
  seedDB: {
    seed: process.env.MONGO_SEED === 'true',
    options: {
      logResults: process.env.MONGO_SEED_LOG_RESULTS !== 'false'
    },
    // Order of collections in configuration will determine order of seeding.
    // i.e. given these settings, the User seeds will be complete before
    // Article seed is performed.
    collections: [{
      model: 'User',
      docs: [{
        data: {
          username: 'local-admin',
          email: 'admin@localhost.com',
          firstName: 'Admin',
          lastName: 'Local',
          roles: ['admin', 'user']
        }
      }, {
        // Set to true to overwrite this document
        // when it already exists in the collection.
        // If set to false, or missing, the seed operation
        // will skip this document to avoid overwriting it.
        overwrite: true,
        data: {
          username: 'local-user',
          email: 'user@localhost.com',
          firstName: 'User',
          lastName: 'Local',
          roles: ['user']
        }
      }]
    }, {
      model: 'Article',
      options: {
        // Override log results setting at the
        // collection level.
        logResults: true
      },
      skip: {
        // Skip collection when this query returns results.
        // e.g. {}: Only seeds collection when it is empty.
        when: {} // Mongoose qualified query
      },
      docs: [{
        data: {
          title: 'First Article',
          content: 'This is a seeded Article for the development environment'
        }
      }]
    }]
  }
};
