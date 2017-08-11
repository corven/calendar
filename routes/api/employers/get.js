

const Steppy = require('twostep').Steppy;
const _ = require('underscore');
const middlewareFlow = require('middleware-flow');
const reqQueryCommaArrays = require('../../../middleware/reqQueryCommaArrays');
const helpers = require('../../../utils/helpers');
const apiVersioning = require('../../../middleware/apiVersioning');
const entitiesLogic = require('../../../logic/entities/entities');

const validationRules = {
  page: {
    type: 'integer',
    minimum: 1,
    default: 1,
  },
  limit: {
    type: 'integer',
    minimum: 1,
    maximum: 100,
    default: 20,
  },
  expand: {
    type: 'array',
    items: {
      type: 'string',
    },
    default: [],
  },
  fields: {
    type: 'string',
    filter: 'parseFields',
  },
  query: {
    type: 'string',
  },
  sort: {
    type: 'string',
    filter: 'parseSort',
  },
  _ids: {
    type: 'array',
    items: {
      type: 'integer',
      minimum: 1,
    },
  },
  statuses: {
    type: 'array',
    items: {
      type: 'string',
      enum: _(helpers.statusesHash).values(),
    },
  },
  rubrics: {
    type: 'array',
    items: {
      type: 'integer',
      minimum: 1,
    },
  },
  tags: {
    type: 'array',
    items: {
      type: 'integer',
      minimum: 1,
    },
  },
  publishDateFrom: {
    type: 'string',
    format: 'date-time',
    filter: 'parseIsoDateTime',
  },
  publishDateTo: {
    type: 'string',
    format: 'date-time',
    filter: 'parseIsoDateTime',
  },
  editor: {
    type: 'integer',
    minimum: 1,
  },
};

const handler = function (req, res, next) {
  let params;
  Steppy(
    function () {
      params = req.validate(validationRules);

      entitiesLogic.getList(_({
        entityType: 'books',
        skip: helpers.getOffset(params),
      }).extend(params), this.slot());
    },
    (err, result) => {
      res.prettyJson(
        _({}).extend(result, {
          pagination: helpers.getPagination({
            total: result.total,
            limit: params.limit,
            page: params.page,
          }),
        }),
      );
    },
    next,
  );
};

const handlerV1_0 = middlewareFlow.series(
  reqQueryCommaArrays(['_ids', 'statuses', 'rubrics', 'tags', 'expand']),
  handler,
);

module.exports = function (router) {
  router.get('/', apiVersioning({
    '1.0.0': handlerV1_0,
  }));
};
