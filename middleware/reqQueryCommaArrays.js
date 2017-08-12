const _ = require('underscore');

function parseCommaArray(val) {
  return _(val ? val.split(',') : []).map(value => Number(value) || value);
}

module.exports = function (keys) {
  return (req, res, next) => {
    if (!_(req.query).isObject()) return next();

    _(keys).each((key) => {
      if (_(req.query[key]).isString()) {
        req.query[key] = parseCommaArray(req.query[key]);
      }
    });

    next();
  };
};
