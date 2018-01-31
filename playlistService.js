// TODO: Messaging logic, addtnl 'nice to have' functionality
let express = require('express');
let database = require('./database/database.js')
let shuffle = require('./helpers/shuffleHelper.js');
let app = express();

// load shuffle algorithms as middleware, or load as dependencies and call as needed?
app.get('/test/:message', (req, res) => {

	res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(req.params.message);
	
})

app.get('/getFeaturedPlaylists', (req, res) => {
	database.Playlist.find({keywords: { "$in" : ["featured"]}}, function(err, data) {
		err ? console.log(err) : res.send(data);
	})
})

app.get('/getPlaylist/:id/:algo', (req, res) => { 
	database.Playlist.find({playlistId: req.params.id}, function(err, data) {
		if (err) {
		  console.log(err)
		} else {
			console.log(`Serving playlist #${req.params.id} with ${req.params.algo == 'random' ? 'random' : 'progressive BPM'} algorithm`)
			if (req.params.algo == 'random') { 
				let playlistWithQueue = shuffle.addShuffledQueue(data[0], 'random')
				res.json(playlistWithQueue) 
			} else if (req.params.algo == 'progressive') { 
				let playlistWithQueue = shuffle.addShuffledQueue(data[0], 'progressive')
				res.json(playlistWithQueue) 
			} else {
				res.send('invalid shuffle algorithm. Options are "random" or "progressive"')
			}
		}
	})
})

app.get('/getPlaylist/:id', (req, res) => {
	database.Playlist.find({playlistId: req.params.id}, function(err, data) {
		if (err){
			console.log(err)
		} else {
			res.json(data[0])
		}
	})
})


const host = '127.0.0.1'; // look into how EC2 handles host / domain variables
const port = 3000; // setup ENV.PORT variable for deployment to EC2 instance.

exports.listen = function () {
	console.log('listening on ' + port)
  this.server.listen.apply(this.server, arguments);
};

exports.close = function (callback) {
  this.server.close(callback);
};

app.listen(port, () => {
	console.log('listening on '+ port)
})