'use strict'
// TODO: Messaging logic, addtnl 'nice to have' functionality
require('newrelic');
let express = require('express');
let database = require('./database/database.js')
let shuffle = require('./helpers/shuffleHelper.js');
let queue = require('./helpers/queueHelper.js');
let app = express();

app.get('/test', (req, res) => {
	res.send('hello')
})

app.get('/loaderio-2f0f737fa8eaa8125319a78d80f7eb3c', (req, res) => {
	res.send('loaderio-2f0f737fa8eaa8125319a78d80f7eb3c')
})

app.get('/getFeaturedPlaylists', (req, res) => { 
	let query = {
		keywords: { "$in" : ["featured"]}
	}
	database.Playlist.find(query).limit(5).exec(function(err, data) {
		err ? console.log(err) : res.send({body: JSON.stringify(data)});
	})
})

app.get('/getPlaylist/:id/', (req, res) => { 
	let requestedListId = req.params.id;
	if (parseInt(requestedListId).toString() !== requestedListId) {
		res.send("Invalid playlist Id")
		return
	}
	database.Playlist.find({playlistId: req.params.id}, function(err, data) {
		if (err) {
		  console.log(err)
		} else {
//		console.log(data)
			let responseObject = {
				playlist: undefined,
				algorithm: undefined
			}
			//console.log(`Serving playlist #${req.params.id} with ${req.params.id % 2 === 0 ? 'random' : 'progressive BPM'} algorithm`)
			if (data.length) {
				if (req.params.id % 2 === 0) { 
					let playlistWithQueue = shuffle.addShuffledQueue(data[0], 'random')
					responseObject.playlist = playlistWithQueue;
					responseObject.algorithm = "random";
					queue.sendMessage({"playlistId": req.params.id, "algorithm": "random", timestamp: Date.now()})
					res.json(responseObject) 
				} else { 
					let playlistWithQueue = shuffle.addShuffledQueue(data[0], 'progressive')
					responseObject.playlist = playlistWithQueue;
					responseObject.algorithm = "progressive";
				        queue.sendMessage({"playlistId": req.params.id, "algorithm": "progressive", timestamp: Date.now()})
					res.json(responseObject)
				} 
			} else {
				res.send("Invalid playlist ID");
			}
		}
	})
})



const host = '127.0.0.1'; 
const port = 3000; 

exports.listen = function () {
	console.log('listening on ' + port)
  this.server.listen.apply(this.server, arguments);
};

exports.close = function (callback) {
  this.server.close(callback);
};

app.listen(80, () => {
	console.log('listening on '+ port)
})
