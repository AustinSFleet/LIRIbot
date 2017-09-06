var request = require('request');

var spotify = require('node-spotify-api');

var twitter = require('twitter');

var userCommand = process.argv[2];

var inputArgs = process.argv;

var userInput = "";

for (var i = 3; i < inputArgs.length; i++) {
    
      // Build a string with the address.
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
}
// } else if (userCommand === "my-tweets") {

// }else if (userCommand === "spotify-this-song"){

// }