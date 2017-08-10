exports.create = async function (db) {
  exports.collection = await db.createCollection('test');

  return exports.collection;
};
