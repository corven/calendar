const Steppy = require('twostep').Steppy;
const _ = require('underscore');
const db = require('../db');

exports.getList = function (params, callback) {
  Steppy(
    function () {
      const condition = {};

      if (_(params).has('_ids')) {
        condition._id = { $in: params._ids };
      }

      const query = db[params.entityType].find(condition);

      if (params.limit) {
        query.limit(params.limit);
      }

      query.toArray(this.slot());

      db[params.entityType].count(condition, this.slot());
    },
    function (err, entities, total) {
      this.pass({ items: entities, total });
    },
    callback,
  );
};
