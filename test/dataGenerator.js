'use strict'
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/entries');

let connection = mongoose.connection;

connection.once('open', function callback(){
	console.log('Connected to DB')
})

// let playlistSchema = mongoose.Schema({
// playlistId: {type: Number, unique: true},
// playlistName: String,
// // created_by: {type: Number, unique: false}, // lookup playlists created by user
// songList: [{songId: Number, bpm: Number}],
// shuffledQueue: [{songId: Number, bpm: Number}],
// keywords: [{type: String}]
// // subscribers: [{}] // to register popularity 
// });

let entrySchema = mongoose.Schema({
	entryNumber: Number,
	entryName: String,
	songList: [{songId: Number, bpm: Number}],
	shuffledQueue: [{songId: Number, bpm: Number}],
	keywords: [{type: String}]
});
let generateStart = Date.now() // data creation start time 
let bpmOptions = [45, 60, 90, 120, 150];
let songs = [];
let keywords = ["featured", "hip-hop", "reggae", "funk", "bluegrass", "blues", "rock"]

for (let songIdIndex = 1; songIdIndex < 1000; songIdIndex++) { // create 1000 fake song objects
	let bpmIndex = Math.floor(Math.random() * bpmOptions.length); // randomly select bpm property from options array
	songs.push({songId: songIdIndex, bpm: bpmOptions[bpmIndex]});
}

let Entry = mongoose.model('Entry', entrySchema);

let entries = [];

for (let i = 0; i < 250000; i++) { // create 10K entry objects
	let fakeObj = {
		entryNumber: i,
		entryName: `Playlist${i}`,
		songList:[],
		shuffledQueue: [],
		keywords: []
	}
	let songlistLength = Math.floor((Math.random() * 20) + 1); // randomize song_list length for each obj
	
	for (let songIdx = 0; songIdx < songlistLength; songIdx++){ // fill song list with randomly selected song objs
		let s_idx = Math.floor(Math.random() * songs.length); // create random index to select from songs array
		fakeObj.songList.push(songs[s_idx]) // add to songlist (later: create check preventing duplicates)
	}

	let numKeywords = Math.floor((Math.random() * 3) + 1); // randomly choose number of keywords 

	for (let keywordIndex = 0; keywordIndex < numKeywords; keywordIndex++) {
		let k_idx = Math.floor(Math.random() * keywords.length); // randomly choose keyword
		if (fakeObj.keywords.indexOf(numKeywords[k_idx]) == -1){ // check keyword is already added
		  fakeObj.keywords.push(keywords[k_idx]) // add keyword
		}
	}

	entries.push(fakeObj)
}

let generateFinish = Date.now()



// let start = Date.now(); // data save start time

// entries.forEach(entry => {
// 	let entryToSave = new Entry(entry);	
// 	entryToSave.save((err, data) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log(data);
// 		}
// 	})
// })
// let finish = Date.now(); // data save finish time 
console.log(entries.length)
let generateTime = Math.abs(generateFinish - generateStart);
console.log(generateTime)