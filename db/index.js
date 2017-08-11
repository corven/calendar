const Client = require('mongodb').MongoClient;
const Steppy = require('twostep').Steppy;
const _ = require('underscore');

const collections = [
  'test',
];

exports.nestingFields = {};
exports.collections = {};

exports.init = function (params, callback) {
  Steppy(
    function () {
      if (params.config) {
        Client.connect(params.config.url, {}, this.slot());
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
        exports[collectionName] = module.create(db);
        exports.collections[collectionName] = module.create(db);
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
