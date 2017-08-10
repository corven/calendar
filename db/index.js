const Client = require('mongodb').MongoClient;
const _ = require('underscore');

const collections = ['test'];

exports.embedders = {};
exports.collections = {};

const initCollections = function (db) {
  _(collections).each((collectionName) => {
    const module = require(`./${collectionName}`);

    const collection = module.create(db);
    exports[collectionName] = exports.collections[collectionName] = collection;
  });

  return db;
};

var db;

exports.init = function (params) {
  if (params.config) {
    return Client.connect(params.config.url, params.config.options).then((_db) => {
      db = _db;
      return db;
    }).then(initCollections);
  }
  return initCollections(params.db);
};
