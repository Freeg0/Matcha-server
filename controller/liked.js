var assert = require('assert');

var liked = function(username, MongoClient, url, callback) {
	var userLikedlist = [];
	MongoClient.connect(url, async function(err, db) {
  		var cursor =db.collection('consult').find( { "id1": username } );
		while(await cursor.hasNext()) {
			const doc = await cursor.next();
			userLikedlist.push(doc);
		}
		callback(userLikedlist);
	});
};

module.exports.liked = liked;