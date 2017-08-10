const _ = require('underscore');
const db = require('../db');
const Steppy = require('twostep').Steppy;

module.exports = (router) => {
  router.get('/', (req, res, next) => {
	  insert().then(result => console.log(result));
    // Steppy(
    //     function() {
		// 	db.test.find().toArray().then((result) => {
		//
		// 		this.slot(result)
		// 	});
		// },
    //     function(err, tests) {
    //       console.log(tests);
    //       this.pass('qwe')
		// },
    //     next
    // )
    // new Promise(db.test.insertOne({ asd: 12 })).then((result) => {
    //   console.log(result);
    //   // res.send('qweqwe');
    // }).catch((err) => {
    //   console.log(err);
    // })
    // db.test.insertOne({ asd: 12 }).then((result) => {
    //   console.log(result);
    //   res.send(result);
    // });
    // Promise((result, rej) => {
    //   res.send('qwe')
    //   result('qweqwe');
    // }).catch(next);
    // return db.test.findOne().then((data) => {
    //   console.log(data);
    //   res.send(data);
    // }).then(next);

	  async function insert() {
		  var obj = await db.test.insertOne({ asd: 12 });
		  console.log(obj);
		  return obj;
	  }
  });
};
