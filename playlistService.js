'use strict'
// TODO: Messaging logic, addtnl 'nice to have' functionality
let express = require('express');
let database = require('./database/database.js')
let shuffle = require('./helpers/shuffleHelper.js');
let app = express();


app.get('/getFeaturedPlaylists', (req, res) => { 
	let query = {
		//keywords: "featured"
		keywords: { "$in" : ["featured"]}
	}
	database.Playlist.find(query).limit(5).exec(function(err, data) {
		err ? console.log(err) : res.send({body: JSON.stringify(data)});
	})
})

app.get('/getPlaylist/:id/', (req, res) => { //t
	database.Playlist.find({playlistId: req.params.id}, function(err, data) {
		if (err) {
		  console.log(err)
		} else {
			let responseObject = {
				playlist: undefined,
				algorithm: undefined
			}
			console.log(`Serving playlist #${req.params.id} with ${req.params.id % 2 === 0 ? 'random' : 'progressive BPM'} algorithm`)
			if (req.params.id % 2 === 0) { 
				let playlistWithQueue = shuffle.addShuffledQueue(data[0], 'random')
				responseObject.playlist = playlistWithQueue;
				responseObject.algorithm = "random";
				res.json(responseObject) 
			} else { 
				let playlistWithQueue = shuffle.addShuffledQueue(data[0], 'progressive')
				responseObject.playlist = playlistWithQueue;
				responseObject.algorithm = "progressive";
				res.json(responseObject)
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
