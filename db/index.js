const Client = require('mongodb').MongoClient;
const _ = require('underscore');

const collections = ['test'];

exports.collections = {};

const initCollections = async function (db) {
  _(collections).each(async (collectionName) => {
    const module = require(`./${collectionName}`);

    const collection = await module.create(db);
    exports[collectionName] = collection;
    exports.collections[collectionName] = collection;
  });

  return db;
};

let db;

exports.init = function (params) {
  if (params.config) {
    return Client.connect(params.config.url, params.config.options).then((_db) => {
      db = _db;
      return db;
    }).then(initCollections);
  }

  return new Promise((resove, reject) => {
    resove(initCollections(params.db));
  });
};
