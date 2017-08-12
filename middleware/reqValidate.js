const _ = require('underscore');
const Ajv = require('ajv');

const ajv = new Ajv({ useDefaults: true, removeAdditional: true });

module.exports = function () {
  return function (req, res, next) {
    req.validate = function (schema, options) {
      const changedOptions = _({}).defaults(options, {
        reqFields: ['params', 'query', 'body'],
      });


      const changedData = _(changedOptions.reqFields).reduce(function (data, field) {
        //TODO
        if (req[field]._id) {
          req[field]._id = Number(req[field]._id);
        }
        return _(data).extend(req[field]);
      }, {});

      const validate = ajv.compile(schema);
      const valid = validate(changedData);

      if (!valid) throw new Error(`${validate.errors[0].dataPath} ${validate.errors[0].message}`);

      return changedData;
    };

    next();
  };
};
