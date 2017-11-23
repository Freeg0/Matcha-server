var assert = require('assert');

function addTagToDb (myUsername, tag, MongoClient, url, db) {
	db.collection('tags').insertOne( {
		"username" : myUsername,
		"tag" : tag
	}, function(err, result) {
    	assert.equal(err, null);
	});
};


function addtag (myUsername, tag, MongoClient, url, callback) {
	MongoClient.connect(url, async function(err, db)
	{
		addTagToDb (myUsername, tag, MongoClient, url, db);
		callback();
	});
};

function listTag (myUsername, MongoClient, url, callback) {
	var taglist = [];
	MongoClient.connect(url, async function(err, db) {
  		var cursor =db.collection('tags').find( { "username": myUsername } );
		while(await cursor.hasNext()) {
			const doc = await cursor.next();
			taglist.push(doc);
		}
		callback(taglist);
	});
};

module.exports.addtag = addtag;
module.exports.listTag = listTag;  