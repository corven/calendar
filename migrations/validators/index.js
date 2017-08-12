const schemasHash = {};

['employers'].forEach((fileName) => {
  schemasHash[fileName] = require(`./${fileName}`);
});


module.exports = schemasHash;
