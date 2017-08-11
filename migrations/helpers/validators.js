const Steppy = require('twostep').Steppy;
const _ = require('underscore');

exports.setDbValidation = function (db, validators, callback) {
  Steppy(
    function () {
      const group = this.makeGroup();

      _(validators).each((validator, collectionName) => {
        db.createCollection(
          collectionName, { validator }, group.slot(),
        );
      });
    },
    callback,
  );
};
