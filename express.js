var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []

//global variable for searched tweets
var searchedTweets = [];

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    tweetinfo = JSON.parse(data); 
  }
});

//GET FUNCTIONS
//Shows all users 'info
app.get('/tweets', function(req, res) {
  //send global variable to scripts.js to access specific elements of each object
  res.send({tweetinfo: tweetinfo});
});

//Shows all tweet information
app.get('/tweetinfo', function(req, res) {
  //send global variable to scripts.js to access specific elements of each object
  res.send({tweetinfo: tweetinfo});
  
});

//Shows searched tweets
app.get('/searchedinfo', function(req, res){
  //send global variable searched tweets to scripts.js to access elements in each searched tweet
  res.send({searchedTweets: searchedTweets});
});


//POST FUNCTIONS
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //request user input that is tweet, convert into String and split into array with delimiter ';'
  var tweet = req.body.tweet;
  var temp = String(tweet);
  var parsedString = temp.split(';');

  //add object made from parsed string into tweetinfo variable
  tweetinfo.push({ id_str: parsedString[0], text: parsedString[1] });

  //send success message
  res.send('Succesfully create');
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //request tweet id from user 
  var tweet = req.body.id;
  var found = false;
  var foundtweet;

  //traverse tweetinfo array to look for the tweet id that matches user id input
  tweetinfo.forEach(function(info) {
    if(!found && info.id_str === tweet)
    {
      searchedTweets.push(info);   //add object into searchedTweets variable to keep track of what the user has searched for
      foundtweet = info;           //store object in variable foundTweet to send to scripts.js
    }
  })

  res.send(foundtweet);
});


//PUT FUNCTION
app.put('/tweets/:nm', function(req, res) {
  //request both name and new screen_name from scripts.js
  var nm = req.params.nm;
  var newName = req.body.newName;
  var found = false;

  //traverse the tweetinfo array to search for input name
  tweetinfo.forEach(function(tweet, index) {
    if(!found && tweet.user.name === nm) 
    {
      tweet.user.screen_name = newName;       //when name found, update object screen name to new screen name
      found = true;
    }
  });

  //send success message
  res.send('Successfully updated'); 
});


//DELETE FUNCTION
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //request tweetid that user input
  var id = req.params.tweetid;
  var found = false;

  //traverse tweetinfo array to find tweet that matches input id
  tweetinfo.forEach(function(tweet, index) {
    if(!found && tweet.id_str === String(id))       //convert id to String type
    {
      tweetinfo.splice(index, 1);           //when found, use splice function to delete specific object in the array
      found = true;
    }
  });
  
  //send success message
  res.send('Succesfully deleted tweet');
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});