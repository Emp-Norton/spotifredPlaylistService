/* 
Need to test that:
	- HTTP endpoints all send responses
		1.) /getFeaturedPlaylists
		2.) /getPlaylist/:id
		3.) /shuffled/:algo/:id (this will probably be folded into each of the above endpoints)

	- Endpoints correctly query the database and return the desired object
		1.) /getPlaylist/:id returns the playlist with the given ID as a JSON object
		2.) /getFeaturedPlaylists returns an array of playlists with the 'featured' keyword

	- Shuffling algorithms correctly manipulate the song list for the playlist provided.
		1.) /getPlaylist/:id 
			a.) random returns the playlist with the correct id, the original song list, and the randomized songlist
			b.) progressive returns the playlist with the correct id, the original song list, and the progressive bpm songlist		
*/


const assert = require('assert'); // vs require('assert') ? node version vs chai. 
const server = require('../playlistService.js');

const shuffle = require('../helpers/shuffleHelper.js');
const http = require('http');


describe('server', function() {

	before(function() {
		server.listen(3000)
	})


	after(function() {
		server.close();
	})

})

describe('/getPlaylist', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3000/getPlaylist/1', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('should return the requested playlist', function (done) { // this will break if I reload the DB with new dummy data, since the actual mongo-generated IDs are already attached
    http.get('http://localhost:3000/getPlaylist/1', function (res) {
    	let expected = JSON.stringify({"song_list":[{"_id":"5a6ff2081f6179389fe1dec0","songId":1,"bpm":50},{"_id":"5a6ff2081f6179389fe1debf","songId":2,"bpm":60},{"_id":"5a6ff2081f6179389fe1debe","songId":3,"bpm":60},{"_id":"5a6ff2081f6179389fe1debd","songId":4,"bpm":120},{"_id":"5a6ff2081f6179389fe1debc","songId":5,"bpm":120}],"keywords":["fake","fictitious"],"_id":"5a6ff2081f6179389fe1debb","playlistId":1,"playlist_name":"my first playlist","__v":0})
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal(expected, data);
        done();
      });
    });
  });
});

// describe('/getFeaturedPlaylists', function () {
//   it('should return 200', function (done) {
//     http.get('http://localhost:3000/getFeaturedPlaylists', function (res) {
//       assert.equal(200, res.statusCode);
//       done();
//     });
//   });

//   it('should return an array of featured playlists', function (done) {
//     http.get('http://localhost:3000/getFeaturedPlaylists', function (res) {

//       var data = '';

//       res.on('data', function (chunk) {
//         data += chunk;
//       });

//       res.on('end', function () {
//         assert.equal(expected, data);
//         done();
//       });
//     });
//   });
// });



//   it('should return the requested playlist', function (done) { // this will break if I reload the DB with new dummy data, since the actual mongo-generated IDs are already attached
//     http.get('http://localhost:3000/getPlaylist/1', function (res) {
//     	let expected = JSON.stringify({"song_list":[{"_id":"5a6ff2081f6179389fe1dec0","songId":1,"bpm":50},{"_id":"5a6ff2081f6179389fe1debf","songId":2,"bpm":60},{"_id":"5a6ff2081f6179389fe1debe","songId":3,"bpm":60},{"_id":"5a6ff2081f6179389fe1debd","songId":4,"bpm":120},{"_id":"5a6ff2081f6179389fe1debc","songId":5,"bpm":120}],"keywords":["fake","fictitious"],"_id":"5a6ff2081f6179389fe1debb","playlistId":1,"playlist_name":"my first playlist","__v":0})
//       var data = '';

//       res.on('data', function (chunk) {
//         data += chunk;
//       });

//       res.on('end', function () {
//         assert.equal(expected, data);
//         done();
//       });
//     });
//   });
// });