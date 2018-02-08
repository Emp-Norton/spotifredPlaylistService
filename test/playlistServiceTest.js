/* 
Need to test that:
	- HTTP endpoints all send responses
		1.) /getFeaturedPlaylists
		2.) /getPlaylist/:id


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

  it('should return the requested playlist', function (done) { 
    http.get('http://localhost:3000/getPlaylist/1', function (res) {
    	let expected = '1'
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        let resData = JSON.parse(data)
        let id = resData.playlist.playlistId
        assert.equal(expected, id);
        done();
      });
    });
  });
  it('should return the requested playlist', function (done) {
    http.get('http://localhost:3000/getPlaylist/9345432', function (res) {
      let expected = '9345432'
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        let resData = JSON.parse(data)
        let id = resData.playlist.playlistId
        assert.equal(expected, id);
        done();
      });
    });
  });

  it('should use the correct type of shuffle algorithm for odd indexes (progressive)', function (done) {
    http.get('http://localhost:3000/getPlaylist/1', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        let resData = JSON.parse(data);
        let algorithm = resData.algorithm;
        assert.equal("progressive", algorithm);
        done();
      });
    });
  });

  it('should use the correct type of shuffle algorithm for even indexes (random)', function (done) {
    http.get('http://localhost:3000/getPlaylist/12', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        let resData = JSON.parse(data);
        let algorithm = resData.algorithm;
        assert.equal("random", algorithm);
        done();
      });
    });
  });
});

describe('/getFeaturedPlaylists', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:3000/getFeaturedPlaylists', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('should return an array of featured playlists', function (done) {
    http.get('http://localhost:3000/getFeaturedPlaylists', function (res) {
      var data = '';
      let expected = 5

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        let parsedResponse = JSON.parse(data)
        let responseListLength = JSON.parse(parsedResponse.body).length
        assert.equal(expected, responseListLength);
        done();
      });
    });
  });
});

