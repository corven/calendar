const Steppy = require('twostep').Steppy;
const reqQueryCommaArrays = require('../../../middleware/reqQueryCommaArrays');
const _ = require('underscore');
const entitiesLogic = require('../../../logic/entities');

const validation = {
  type: 'object',
  properties: {
    _ids: {
      type: 'array',
      items: {
        type: 'integer',
      },
    },
    limit: {
      type: 'integer',
      minimum: 1,
      maximum: 500,
      default: 100,
    },
  },
};

module.exports = function (router) {
  router.get('/',
    reqQueryCommaArrays(['_ids']),
    (req, res, next) => {
      Steppy(
        function () {
          const params = req.validate(validation);
          entitiesLogic.getList(_({
            entityType: 'employers',
          }).extend(params), this.slot());
        },
        function (err, employers) {
          res.json(employers);
        },
        next,
      );
    },
  );
};
