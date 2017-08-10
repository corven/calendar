// var pmongo = require('promised-mongo');
//
// var db = pmongo('mongodb://127.0.0.1:27017/calendar', ['test']);
//
// db.test.findOne({}).then((res) => {
// 	console.log(res);
// })
// const config = require('./config/base');
// const db = require('./db');

// function test(params) {
//   return callback('qwe');
// }

// test('qwe').then((result) => {
//   console.log(result);
// });

// db.init({ config: config.mongodb }).then(db1 => db.test.insertOne({qwe: 1}).exec).then((result) => {
// 	console.log(result)
// }).catch((err) => {
//   console.log(err);
// });

// const db1 = await db.init({ config: config.mongodb });

const Client = require('mongodb').MongoClient;

async function qwe() {
  // const test = new Test({title: 'qwe'});
  // const qweqwe = await test.save();
  // const test1 = await Test.findOne();

  const db2 = await Client.connect('mongodb://127.0.0.1:27017/calendar');
  const tests = await db2.collection('tests').findOne();
  console.log(tests);
  return tests;
}

qwe()