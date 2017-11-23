var assert = require('assert');

function sugest (myUsername, MongoClient, url, callback) {
	var userList = [];
	MongoClient.connect(url, async function(err, db) {
  		var cursor = db.collection('membres').find({"username":{$ne:myUsername}});
		while(await cursor.hasNext()) {
			const doc = await cursor.next();
			userList.push(doc);
		}
		callback(userList);
	});
};

module.exports.sugest = sugest;   