const Collection = require('mongodbext').Collection;

exports.create = function (db) {
  exports.collection = new Collection(db, 'employers', {
    changeDataMethods: [
      'insertOne',
      'updateOne', 'findOneAndUpdate', 'updateMany',
      'deleteOne',
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
exports.validation = {
  type: 'object',
  properties: {
    _id: {
      type: 'integer',
      minimum: 1,
    },
    fullName: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    note: {
      type: 'string',
    },
  },
  required: ['_id', 'fullName', 'phone', 'note'],
  additionalProperties: false,
};
