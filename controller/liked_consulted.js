var assert = require('assert');

var consulted = function(_id, MongoClient, url, callback) {
	var userlist = [];
	MongoClient.connect(url, async function(err, db) {
  		var cursor =db.collection('consult').find( { "id1": _id } );
		while(await cursor.hasNext()) {
			const doc = await cursor.next();
			userlist.push(doc);
		}
		callback(userlist);
	});
};

module.exports.consulted = consulted;   
