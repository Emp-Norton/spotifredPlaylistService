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
    }
    if (!bpmGroups[song.bpm].includes(song)) {
      bpmGroups[song.bpm].push(song)
    }
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

let shuffleProgressiveBpm = (playlist) => {
  let sortedByBpm = sortBpm(playlist);
  let randomizedAndSortedByBpm = randomizeBpmGroup(sortedByBpm);
  return convertBackToSongList(randomizedAndSortedByBpm);
}

// let addShuffledQueue = (playlist, queue) => { // fix this
// 		let shuffled = shuffle.randomize(data[0].songList)
// 				data[0].shuffledQueue = shuffled;
// 	return playlistWithQueue
// }

module.exports = {
	shuffleProgressiveBpm,
	randomize,
	addShuffledQueue
}