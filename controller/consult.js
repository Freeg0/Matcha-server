var assert = require('assert');

function addconsult (myUsername, searchUser, MongoClient, url, db) {
	console.log("test3");
	db.collection('consult').insertOne( {
      "id1" : searchUser,
      "id2" : myUsername,
      "date" : new Date()
	}, function(err, result) {
    	assert.equal(err, null);
	});
};


function consult (myUsername, searchUser, MongoClient, url, callback) {
	MongoClient.connect(url, async function(err, db)
	{
		console.log("test");
  		var cursor = db.collection('membres').find( { "username": searchUser } );
		while(await cursor.hasNext()) {
			const doc = await cursor.next();
			console.log("test2");
			addconsult (myUsername, searchUser, MongoClient, url, db);
			callback(doc);
		}
	});
};

module.exports.consult = consult;   
