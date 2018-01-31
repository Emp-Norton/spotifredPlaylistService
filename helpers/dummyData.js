let db = require('../database/database.js')


let playlists = [
{playlistId: 1,
playlistName: 'my first playlist',
songList: [{songId: 1, bpm: 50}, {songId: 2, bpm: 60}, {songId: 3, bpm: 60}, {songId: 4, bpm: 120}, {songId: 5, bpm: 120}],
shuffledQueue: [],
keywords: ['fake', 'fictitious']
},
{playlistId: 2,
playlistName: 'my second playlist',
songList: [{songId: 11, bpm: 50}, {songId: 12, bpm: 60}, {songId: 13, bpm: 60}, {songId: 14, bpm: 120}, {songId: 15, bpm: 120}],
shuffledQueue: [],
keywords: ['fake', 'featured']
},
{playlistId: 3,
playlistName: 'my third playlist',
songList: [{songId: 21, bpm: 50}, {songId: 22, bpm: 60}, {songId: 23, bpm: 60}, {songId: 24, bpm: 120}, {songId: 25, bpm: 120}],
shuffledQueue: [],
keywords: ['fake', 'fictitious']
},
{playlistId: 4,
playlistName: 'my fourth playlist',
songList: [{songId: 11, bpm: 50}, {songId: 22, bpm: 60}, {songId: 23, bpm: 60}, {songId: 34, bpm: 120}, {songId: 35, bpm: 120}],
shuffledQueue: [],
keywords: ['fake', 'featured']
}
];

playlists.forEach(playlist => {
	let listToSave = new db.Playlist(playlist);
	listToSave.save((err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	})
})
