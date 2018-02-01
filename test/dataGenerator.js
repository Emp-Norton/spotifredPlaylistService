'use strict'

let db = require('./testDatabase.js')
let fs = require('fs');


let generateStart = Date.now() // data creation start time 
let bpmOptions = [45, 60, 90, 120, 150];
let songs = [];
let keywords = ["featured", "hip-hop", "reggae", "funk", "bluegrass", "blues", "rock"]

for (let songIdIndex = 1; songIdIndex < 1000; songIdIndex++) { // create 1000 fake song objects
	let bpmIndex = Math.floor(Math.random() * bpmOptions.length); // randomly select bpm property from options array
	songs.push({songId: songIdIndex, bpm: bpmOptions[bpmIndex]});
}

let entries = [];

for (let i = 0; i < 500000; i++) { // create 10K entry objects
	let fakeObj = {
		entryNumber: i,
		entryName: `Playlist${i}`,
		songList:[],
		shuffledQueue: [],
		keywords: []
	}
	let songlistLength = Math.floor((Math.random() * 15) + 5); // randomize song_list length for each obj
	
	for (let songIdx = 0; songIdx < songlistLength; songIdx++){ // fill song list with randomly selected song objs
		let s_idx = Math.floor(Math.random() * songs.length); // create random index to select from songs array
		fakeObj.songList.push(songs[s_idx]) // add to songlist (later: create check preventing duplicates)
	}

	let numKeywords = Math.floor((Math.random() * 3) + 1); // randomly choose number of keywords 

	for (let keywordIndex = 0; keywordIndex < numKeywords; keywordIndex++) {
		let k_idx = Math.floor(Math.random() * keywords.length); // randomly choose keyword
		if (fakeObj.keywords.indexOf(numKeywords[k_idx]) == -1){ // check keyword is not already added
		  fakeObj.keywords.push(keywords[k_idx]) // add keyword
		}
	}

	entries.push(fakeObj)
}

let generateFinish = Date.now()



// let start = Date.now(); // data save start time

// // for (let saveIndex = 0; saveIndex < 15000; saveIndex++) {
// // 	let entryToSave = new db.Entry(entries[saveIndex]);	
// // 	entryToSave.save((err, data) => {
// // 		if (err) {
// // 			console.log(err);
// // 		} else {
// // 			console.log('saved' + saveIndex);
// // 		}
// // 	})
// // }

// // for (let saveIndex = 15000; saveIndex < 30000; saveIndex++) {
// // 	let entryToSave = new db.Entry(entries[saveIndex]);	
// // 	entryToSave.save((err, data) => {
// // 		if (err) {
// // 			console.log(err);
// // 		} else {
// // 			console.log('saved' + saveIndex);
// // 		}
// // 	})
// // }



// let finish = Date.now(); // data save finish time 

let generateTime = Math.abs(generateFinish - generateStart);

let writeTo = fs.createWriteStream('./playlistData.csv');

entries.forEach((entry, index) => {
	if (index % 1000 == 0) console.log('Writing entry #' + index)
	writeTo.write(JSON.stringify(entry));
})











