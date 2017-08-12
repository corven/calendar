const Collection = require('mongodbext').Collection;
const ajg = require('ajg');

exports.create = function (db) {
  exports.collection = new Collection(db, 'workCalendars', {
    changeDataMethods: [],
  });

  return exports.collection;
};

exports.init = function () {
  const collection = exports.collection;

  collection.addPlugin('sequenceId');
  collection.addPlugin('detailedError');
};

exports.validation = {
  _id: ajg.schema.integer.minimum(1),
  startDate: ajg.schema.date.required,
  endDate: ajg.schema.date.required,
  status: ajg.schema.string.required.enum(([
    'audio', 'photo', 'video', 'document', 'photo_archive', 'unknown',
  ])),
};
