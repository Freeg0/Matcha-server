var assert = require('assert');

function addBlock (myUsername, searchUser, MongoClient, url, db) {
	db.collection('block').insertOne( {
      "id1" : searchUser,
      "id2" : myUsername,
      "date" : new Date()
	}, function(err, result) {
    	assert.equal(err, null);
	});
};


function block (myUsername, searchUser, MongoClient, url, callback) {
	MongoClient.connect(url, async function(err, db)
	{
		addBlock (myUsername, searchUser, MongoClient, url, db);
		callback();
	});
};

module.exports.block = block;   