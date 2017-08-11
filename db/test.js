const Collection = require('mongodbext').Collection;

exports.create = function (db) {
  exports.collection = new Collection(db, 'genres', {
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
  _id: {
    type: 'integer',
    minimum: 1,
    required: true,
  },
  type: {
    type: 'string',
    required: true,
    enum: ['movie', 'lecture', 'performance', 'event'],
  },
  title: {
    type: 'string',
    required: true,
  },
  originalTitle: {
    type: 'string',
    required: true,
  },
  name: {
    type: 'string',
    required: true,
  },
};
