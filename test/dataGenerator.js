'use strict'
let fs = require('fs');


let createFictitiousObjects = (startIndex, limit, batchName) => {

	let bpmOptions = [45, 60, 90, 120, 150];
	let songs = []; // the song creator code should probably be outside this function -- if I leave it here it gets overwritten and two songs can have the same ID.
	let keywords = ["featured", "hip-hop", "reggae", "funk", "bluegrass", "blues", "rock"]

	for (let songIdIndex = 1; songIdIndex < 1000; songIdIndex++) { // create 1000 fake song objects
		let bpmIndex = Math.floor(Math.random() * bpmOptions.length); // randomly select bpm property from options array
		songs.push({songId: songIdIndex, bpm: bpmOptions[bpmIndex]});
	}

	let entries = [];
	for (let i = startIndex; i < limit; i++) { 
		let fakeObj = {
			playlistId: i,
			playlistName: `Playlist${i}`,
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

	// create write stream pointing to CSV file on external HD
	// let writeTo = fs.createWriteStream(`../../../../../../media/norton/Seagate\ Backup\ Plus\ Drive/Coding\ Stuff/storage/${batchName}.csv`);
	let writeTo = fs.createWriteStream(`../../../../../../media/norton/Seagate\ Backup\ Plus\ Drive/Coding\ Stuff/storage/${batchName}.csv`);

	entries.forEach((entry, index) => {
		if (index % 10000 == 0) console.log('Writing entry #' + index + ' of ' + batchName + ' batch.')
		writeTo.write(JSON.stringify(entry));
	})

	console.log('Finished writing entries to CSV.')
	return
}

// first set (running all 10 at once causes a memory crash at 6.67 million (67% of way through 6th batch)). 
// also, trying to run too large a range (0 through > 1.8 million) causes a crash -- out of memory in both cases.
// maybe I can setup a sequence of promises, i.e. don't invoke "second" until "first" has finished, or (more hacky) 
// run a bash or python script that calls this function then sleeps for 1 minute (repeated 10 times with appropriate arguments)
// let executeFirstBatch = () => {
	//createFictitiousObjects(0, 1000000, "playlists_1")
	//createFictitiousObjects(1000000, 2000000, "playlists_2")
	// createFictitiousObjects(2000000, 3000000, "playlists_3")
	 createFictitiousObjects(3000000, 4000000, "playlists_4")
	// createFictitiousObjects(4000000, 5000000, "playlists_5")
// }

// // second set 
// let executeSecondBatch = () => {
// 	createFictitiousObjects(5000000, 6000000, "playlists_6")
// 	createFictitiousObjects(6000000, 7000000, "playlists_7")
// 	createFictitiousObjects(7000000, 8000000, "playlists_8")
// 	createFictitiousObjects(8000000, 9000000, "playlists_9")
// 	createFictitiousObjects(9000000, 10000000, "playlists_10")
// }


module.exports = {
	// createFictitiousObjects,
	// executeSecondBath, 
	// executeFirstBatch
}









