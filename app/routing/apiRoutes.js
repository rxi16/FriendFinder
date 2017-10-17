const path = require('path');
// or friendsArray?
var friends = [];
// compare instance of new friend with friendsArray
var friendsArrayImported = require("../data/friends.js")
// export module to server.js
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
      // return variable that holds json file
      return res.json(friendCompare);
  });
  // adds new instance of friend 
  app.post("/api/friends", function(req, res) {
    var newFriendInstance = req.body; 
    //var bestMatchTest = [];
    var differenceSum = [];
    // friends is an empty array, and we are pushing the user's data
    friends.push(newFriendInstance);
    // declare function to eventually add the absolute differences in scores between user and friend being compared
    function add(a, b) {
      return a + b;
    }
    // arrays that will eventually hold scores comparing user to each friend
    var friendsArraySum = [];
    var friendsArrayPlusSum = [];
    // loop through friendsArray from friends.js
    for(var i = 0; i < friendsArrayImported.length; i++) {
      // grab three property values from friend at index 0, etc.
      var currentFriendName = friendsArrayImported[i].friendName;
      var currentFriendPhotoURL = friendsArrayImported[i].photoURL;
      var currentFriendScores = friendsArrayImported[i].scoresArray;
      // array to eventually hold differences between user's and friend's score for each friend in friends.js
      var differences = [];
      // loop through each score of index i friend from friends.js
      for(var j = 0; j < currentScoresArray.length; j++) {
        // subtract user's score from ith friend's corresponding score
        var rawDifference = currentScoresArray[j] - friends[0].scoresArray[j];
        // get absolute value of the difference and push to array of differences
        differences.push(Math.abs(rawDifference))
      }
      // add absolute values of differences
      var sum = differences.reduce(add, 0);
      // populate an array to eventually hold converted scores for each match-trial
      friendsArraySum.push(sum);
      friendsArrayPlusSum.push({
        friendName: currentFriendName,
        friendPhotoURL: currentFriendPhotoURL,
        sum: sum
      });
    }
    Array.min = function(array){
      // min returns the smaller of two numbers
      return Math.min.apply(Math, array);
    };
    var minimum = Array.min(friendsArraySum);
    for(var i = 0; i < friendsArrayPlusSum.length; i++) {
      if(friendsArrayPlusSum[i].sum === minimum) {
        friendFound = friendsArrayPlusSum[i];
        res.json(friendFound);
      }
    }
    friendsArrayImported.push(newFriendInstance);
  });
};