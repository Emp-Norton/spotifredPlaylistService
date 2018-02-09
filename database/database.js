'use strict'
let mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/spotifred');
mongoose.connect('mongodb://ec2-54-219-55-100.us-west-1.compute.amazonaws.com:27017/spotifred')

let connection = mongoose.connection;

connection.once('open', function callback(){
	console.log('Connected to DB')
})

let playlistSchema = mongoose.Schema({
playlistId: {type: Number, unique: true},
playlistName: String,
// created_by: {type: Number, unique: false}, // lookup playlists created by user
songList: [{songId: Number, bpm: Number}],
shuffledQueue: [{songId: Number, bpm: Number}],
keywords: [{type: String}]
// subscribers: [{}] // to register popularity 
});

let Playlist = mongoose.model('Playlist', playlistSchema);

module.exports.Playlist = Playlist;
