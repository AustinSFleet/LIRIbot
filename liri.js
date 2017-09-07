var request = require('request');

var fs = require('fs');

var Spotify = require('node-spotify-api');

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'gt7AP3r0o9M3U6deW7rrv4QiE',
  consumer_secret: 'vX5bnORFjvodIZVUP3upbwySADSqHcjw4DfowXZPHYvHeUhOei',
  access_token_key: '905234559058538496-eV1OpvXbtvdPbbm5e5PVujC3RstMJ8Q',
  access_token_secret: 'Zh4jDlxpqCRRx3IJvLzAlWuAXhx6aoQ3LclSB1c5LADq9'
});

var spotify = new Spotify({
  id: "4bdd94c8fb854049a8b6855c612b1244",
  secret: "095b124e329940049295ce32785ac264"
});

var userCommand = process.argv[2];

var inputArgs = process.argv;

var userInput = "";

for (var i = 3; i < inputArgs.length; i++) {
    
      userInput = userInput + " " + inputArgs[i];
    }

if (userCommand === "movie-this") {

var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece";

request(queryUrl, function(error, response, body){
    
     if (!error && response.statusCode === 200) {
    //    console.log(JSON.parse(body));
       console.log("Title: " + JSON.parse(body).Title);
       console.log("Release Year: " + JSON.parse(body).Year);
       console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
       console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
       console.log("Production Country: " + JSON.parse(body).Country);
       console.log("Language: " + JSON.parse(body).Language);
       console.log("Plot: " + JSON.parse(body).Plot);
       console.log("Actors: " + JSON.parse(body).Actors);

       
     }
 
   });
}else if( userCommand === "spotify-this-song"){
  spotify.search({ type: "track", query: userInput}, function(err, data) {
    if(err){
      console.log("Error :"+ err);
      return;
    }
    var songInfo = data.tracks.items;
    
    var spotifyResults =
      "Artist: " + songInfo[0].artists[0].name + "\n" +
      "Song: " + songInfo[0].name + "\n" +
      "Album the song is from: " + songInfo[0].album.name + "\n" +
      "Preview Url: " + songInfo[0].preview_url;
      
    console.log(spotifyResults);
  }


  )} else if (userCommand === "my-tweets"){
    client.get('statuses/user_timeline', {user_id: 'AustinSFLeet', count: 20}, function(err, data, response) {
      for (i=0; i<20; i ++){
      console.log(data[i].text + "\n Created at: " + data[i].created_at + "\n -----------------------");
      }
    });
  
  } else if (userCommand === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error,data) {
      if (error) {
        console.log("Error: " + error);
      } else {
        
        splitItems = data.split(",");
        txtCommand = splitItems[0];
        txtTitle = splitItems[1];

        spotify.search({ type: "track", query: txtTitle}, function(err, data) {
          if(err){
            console.log("Error :"+ err);
            return;
          }
          var songInfo = data.tracks.items;
          
          var spotifyResults =
            "Artist: " + songInfo[0].artists[0].name + "\n" +
            "Song: " + songInfo[0].name + "\n" +
            "Album the song is from: " + songInfo[0].album.name + "\n" +
            "Preview Url: " + songInfo[0].preview_url;
            
          console.log(spotifyResults);
        }

        )}
});
  } 
