const Steppy = require('twostep').Steppy;
const Client = require('mongodb').MongoClient;
const config = require('../config');
const validators = require('./validators');
const helpers = require('./helpers');

exports.migrate = function (client, done) {
  Steppy(
    function () {
      Client.connect(config.mongodb.url, {}, this.slot());
    },
    function (err, db) {
      helpers.validators.setDbValidation(db, validators, this.slot());
    },
    done,
  );
};
