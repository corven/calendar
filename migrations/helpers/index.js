const _ = require('underscore');

const helpers = ['validation'];

_(helpers).each((helper) => {
  exports[helper] = require(`./${helper}`);
});
