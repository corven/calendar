const _ = require('underscore');
const db = require('../../db');

exports.getValidation = function (params) {
  const baseValidation = db.getValidations()[params.entityType];

  const validation = _(baseValidation).omit('properties', 'required');

  if (params.method === 'create') {
    validation.properties = _(baseValidation.properties).omit('_id');
    validation.required = _(baseValidation.required).without('_id');
  } else if (params.method === 'patch') {
    validation.properties = baseValidation.properties;
    validation.required = [_(baseValidation.required).first()];
  } else if (params.method === 'delete') {
    validation.properties = _(baseValidation.properties).pick('_id');
    validation.required = [_(baseValidation.required).first()];
  }

  return validation;
};
