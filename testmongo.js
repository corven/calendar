var pmongo = require('promised-mongo');

var db = pmongo('mongodb://127.0.0.1:27017/calendar', ['test']);

db.test.findOne({}).then((res) => {
	console.log(res);
})