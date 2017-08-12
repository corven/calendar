const Client = require('mongodb').MongoClient;
const Steppy = require('twostep').Steppy;
const _ = require('underscore');

const collections = ['employers'];

exports.embedders = {};
exports.collections = {};

exports.init = function (params, callback) {
  Steppy(
    function () {
      if (params.config) {
        Client.connect(params.config.url, params.config.options, this.slot());
      } else {
        this.pass(params.db);
      }
    },
    function (err, db) {
      this.pass(db);

      exports.nativeDb = db;

      // create all collections
      _(collections).each((collectionName) => {
        const module = require(`./${collectionName}`);

        const collection = module.create(db);
        exports[collectionName] = collection;
        exports.collections[collectionName] = collection;
      });

      // and init those, which need to be initiated
      _(collections).each((collectionName) => {
        const collection = require(`./${collectionName}`);
        if (collection.init) collection.init();
      });
    },
    function (err, db) {
      this.pass(db);
    },
    callback,
  );
};

exports.getValidations = function () {
  const validations = {};

  _(collections).each(function (collectionName) {
    const module = require(`./${collectionName}`);
    validations[collectionName] = module.validation;
  });

  return validations;
};
