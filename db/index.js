const pmongo = require('promised-mongo');

// const Client = require('mongodb').MongoClient;
const _ = require('underscore');

const collections = ['test'];

exports.nestingFields = {};
exports.collections = {};

exports.init = function (params) {
  return new Promise((res, rej) => {
    exports.db = pmongo(params.config.url, collections);
    console.log(exports.db);
    res(pmongo(params.config.url, collections));
  });
  // const db = pmongo(params.config.url, collections);

  // _(collections).each((collectionName) => {
  //   const module = require(`./${collectionName}`);
  //
  //   const collection = module.create(db);
  //   exports[collectionName] = collection;
  //   exports.collections[collectionName] = collection;
  // });

  // return db;

  // return Client.connect(params.config.url, {}).then((db) => {
  //   exports.nativeDb = db;
  //
  //   // create all collections
  //   _(collections).each((collectionName) => {
  //     const module = require(`./${collectionName}`);
  //
  //     const collection = module.create(db);
  //     exports[collectionName] = collection;
  //     exports.collections[collectionName] = collection;
  //   });
  //
  //   return db;
  // });
};
