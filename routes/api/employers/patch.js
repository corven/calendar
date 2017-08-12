const Steppy = require('twostep').Steppy;
const _ = require('underscore');
const db = require('../../../db');
const helpers = require('../helpers');

module.exports = function (router) {
  router.patch('/:_id(\\d+)',
    (req, res, next) => {
      Steppy(
        function () {
          const validation = helpers.getValidation({
            entityType: 'employers',
            method: 'patch',
          });

          const params = req.validate(validation);

          db.employers.findOneAndUpdate(
            { _id: params._id },
            { $set: _(params).omit('_id') },
            { returnOriginal: false },
            this.slot(),
          );
        },
        function (err, employer) {
          res.json(employer);
        },
        next,
      );
    },
  );
};
