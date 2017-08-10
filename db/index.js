const Client = require('mongodb').MongoClient;
const _ = require('underscore');

const collections = [];

exports.nestingFields = {};
exports.collections = {};

exports.init = function (params, callback) {
  // переделать на промисы
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
        exports[collectionName] = exports.collections[collectionName] =
     module.create(db);
        exports.nestingFields[collectionName] = module.nestingFields || { _id: 1 };
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

exports.getValidators = function () {
  const validators = {};

  _(collections).each((collectionName) => {
    const module = require(`./${collectionName}`);
    validators[collectionName] = module.validator;
  });

  return validators;
};
