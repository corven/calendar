const _ = require('underscore');

module.exports = function () {
  return function (req, res, next) {
    req.validate = function (schema, options) {
      const changedOptions = _({}).defaults(options, {
        reqFields: ['params', 'query', 'body'],
      });

      const changedData = _(changedOptions.reqFields).reduce((data, field) =>
        _(data).extend(req[field]), {});

      validate(changedData, {
        type: 'object',
        properties: schema,
      }, options);

      return changedData;
    };

    next();
  };
};
