const Steppy = require('twostep').Steppy;
const db = require('../../../db');
const helpers = require('../helpers');

module.exports = function (router) {
  router.delete('/:_id(\\d+)',
    (req, res, next) => {
      Steppy(
        function () {
          const validation = helpers.getValidation({
            entityType: 'employers',
            method: 'delete',
          });

          const params = req.validate(validation);

          db.employers.deleteOne(params, this.slot());
        },
        function (err, employer) {
          res.json(employer);
        },
        next,
      );
    },
  );
};
