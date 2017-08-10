const Collection = require('mongodbext').Collection;

exports.create = function (db) {
  exports.collection = new Collection(db, 'test', {
    changeDataMethods: [
      'insertOne',
      'updateOne', 'findOneAndUpdate',
      'deleteOne', 'findOneAndDelete',
    ],
  });

  return exports.collection;
};

exports.init = function () {
  const collection = exports.collection;

  collection.addPlugin('sequenceId');
  collection.addPlugin('detailedError');
  collection.addPlugin('createDate', { format: 'ISODate' });
  collection.addPlugin('updateDate', { format: 'ISODate' });
};
