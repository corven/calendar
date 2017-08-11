const _ = require('underscore');

const validators = ['employers'];

_(validators).each((validator) => {
  exports[validator] = require(`./${validator}`);
});
