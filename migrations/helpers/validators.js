const Steppy = require('twostep').Steppy;
const _ = require('underscore');

exports.setDbValidation = function (db, validators, callback) {
  Steppy(
    function () {
      const group = this.makeGroup();

      _(validators).each((validator, collectionName) => {
        const validatorInfo = {
          validationLevel: 'strict',
          validationAction: 'error',
          validator,
        };

        db.createCollection(
          collectionName, validatorInfo, group.slot(),
        );
      });
    },
    callback,
  );
};
