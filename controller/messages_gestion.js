var assert = require('assert');

function pushMessage (myUsername, searchUser, message,MongoClient, url, callback) {
	MongoClient.connect(url, async function(err, db)
	{
		db.collection('messages').insertOne( {
      		"id1" : myUsername,
      		"id2" : searchUser,
      		"message" : message,
      		"date" : new Date()
		}, function(err, result) {
    		assert.equal(err, null);
		});
		callback();
	});
};

function getMessages (myUsername, searchUser, MongoClient, url, callback) {
	var messagesList = [];
	console.log("id 1 + " + searchUser);
	console.log("id 2 + " + myUsername);
	MongoClient.connect(url, async function(err, db)
	{
		var cursor = db.collection('messages').find( 
			{$or: [{$and: [{ "id1": searchUser },  { "id2": myUsername }]},
			{$and: [{ "id1": myUsername },  { "id2": searchUser }]}]
		});
		while(await cursor.hasNext()) {
			const doc = await cursor.next();
			messagesList.push(doc);
		}
		callback(messagesList);
	});
};

module.exports.getMessages = getMessages;
module.exports.pushMessage = pushMessage; 