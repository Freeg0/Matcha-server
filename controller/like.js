var assert = require('assert');

function addLike (myUsername, searchUser, MongoClient, url, db) {
	db.collection('likes').insertOne( {
      "id1" : searchUser,
      "id2" : myUsername,
      "date" : new Date()
	}, function(err, result) {
    	assert.equal(err, null);
	});
};

function dislike (myUsername, searchUser, MongoClient, url, callback) {
	MongoClient.connect(url, async function(err, db)
	{
		db.collection('likes').remove({$and: [{ "id1": searchUser },  { "id2": myUsername }]}, function(err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result);
            db.close();
        });
		callback();
	});
};

function like (myUsername, searchUser, MongoClient, url, callback) {
	MongoClient.connect(url, async function(err, db)
	{
		addLike (myUsername, searchUser, MongoClient, url, db);
		callback();
	});
};

module.exports.like = like;
module.exports.dislike = dislike;