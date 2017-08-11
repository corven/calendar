const Collection = require('mongodbext').Collection;
const ajg = require('ajg');

exports.create = function (db) {
  exports.collection = new Collection(db, 'employers', {
    changeDataMethods: [],
  });

  return exports.collection;
};

exports.init = function () {
  const collection = exports.collection;

  collection.addPlugin('sequenceId');
  collection.addPlugin('detailedError');
};

exports.validator = {
  _id: ajg.schema.integer.minimum(1),
  fullName: ajg.schema.string.required,
  email: ajg.schema.string.required,
  phone: ajg.schema.string.required,
  note: ajg.schema.string.required,
};
