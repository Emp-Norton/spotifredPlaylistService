'use strict'
let randomize = (originalArray) => {
  let arr = originalArray.slice();
  for (let i = 0; i < arr.length; i++) {
    let newIndex = Math.floor(Math.random() * arr.length);
    let tmp = arr[newIndex];
    arr[newIndex] = arr[i];
    arr[i] = tmp;
  }
  return arr
}

let randomizeBpmGroup = (songs) => {
  let bpmGroups = {};
  songs.forEach(song => {
    if (!bpmGroups.hasOwnProperty(song.bpm)) {
      bpmGroups[song.bpm] = [];
      bpmGroups[song.bpm].push(song)
    } else {
      if (bpmGroups[song.bpm].indexOf(song) == -1) {
      	bpmGroups[song.bpm].push(song);
      }
    }
    
   // if (!bpmGroups[song.bpm].includes(song)) {
     // bpmGroups[song.bpm].push(song)
   // }
  })

  for (let group in bpmGroups) {
    bpmGroups[group] = randomize(bpmGroups[group])
  }
  return bpmGroups;
}


let convertBackToSongList = (processedSongsObject) => {
  let queue = [];
  for (let group in processedSongsObject) { // maybe do Object.keys(processedSongsObject).forEach() to ensure ordinality. 
    processedSongsObject[group].forEach(song => queue.push(song))
  }
  return queue
}

let sortBpm = (songs) => {
  let dup = songs.slice() // prevent mutating the original due to pass-by-ref behavior
  let sorted = dup.sort((a, b) => {
     return a.bpm - b.bpm
  })
  return sorted
}

let shuffleProgressiveBpm = (songs) => {
  let sortedByBpm = sortBpm(songs);
  let randomizedAndSortedByBpm = randomizeBpmGroup(sortedByBpm);
  return convertBackToSongList(randomizedAndSortedByBpm);
}

let addShuffledQueue = (playlist, algorithm) => { 
	let shuffled = algorithm == "random" ? randomize(playlist.songList) : shuffleProgressiveBpm(playlist.songList);
	playlist.shuffledQueue = shuffled;
	return playlist
}

module.exports = {
	shuffleProgressiveBpm,
	randomize,
  addShuffledQueue
}
