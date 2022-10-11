
$(function () {
  //GET FUNCTIONS
  //Get users
  $('#get-button').on('click', function () {
    //function activates a response when user clicks on "get users" button, and it creates a table displaying user id, user screen name 
    //and user name from global variable tweetinfo
    
    $.ajax({
      url: '/tweets',
      contentType: 'application/json',
      success: function (response) {
        var tbodyEl = $('#namebody');

        tbodyEl.html('');

        response.tweetinfo.forEach(userinfo => {
          tbodyEl.append('\
              <tr>\
                  <td class="userid">' + userinfo.user.id + '</td>\
                  <td class="username">' + userinfo.user.screen_name + '</td>\
                  <td class="name">' + userinfo.user.name + '</td>\
              </tr>\
            ');
        });
      }
    });
  });

  //Get all tweet information
  $('#get-tweets-button').on('click', function () {
    //function activates when user clicks on "get tweets" button and proceeds to create a table with tweet id, tweet text and time and date
    //tweet was created
    
    $.ajax({
      url: '/tweetinfo',
      contentType: 'application/json',
      success: function (response) {
        var tbodyEl = $('#tweetbody');

        tbodyEl.html('');

        response.tweetinfo.forEach(tweet => {
          tbodyEl.append('\
              <tr>\
                  <td class="tweetid">' + tweet.id_str + '</td>\
                  <td class="tweettext">' + tweet.text + '</td>\
                  <td class="time">' + tweet.created_at + '></td>\
              </tr>\
            ');
        });
      }
    });
  });

  //Get searched tweets
  $('#get-searched-tweets').on('click', function () {
    //function activates when user clicks on "get searched tweets" button, and it displays table that shows what the tweets the user has
    //searched for in the form of tweet id, tweet text and date and time they were created

    $.ajax({
      url: '/searchedinfo',
      contentType: 'application/json',
      success: function (response) {
        var tbodyEl = $('#searchbody');

        tbodyEl.html('');

        response.searchedTweets.forEach(tweet => {
          tbodyEl.append('\
              <tr>\
                  <td class="tweetid">' + tweet.id_str + '</td>\
                  <td class="tweettext">' + tweet.text + '</td>\
                  <td class="time">' + tweet.created_at + '</td>\
              </tr>\
            ');
        });
      }
    });
  });


  //CREATE FUNCTIONS
  //Create tweet
  $('#create-form').on('submit', function (event) {
    //default functions that tells the function if the event does not get explicitly handled, 
    //its default action should not be taken as it normally would be
    event.preventDefault();
    var createInput = $('#create-input');
    
    //send createInput value to express js to add a tweet to the global variable tweetinfo
    $.ajax({
      url: '/tweetinfo',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ tweet: createInput.val() }),
      success: function (response) {
        createInput.val('');
      }
    })
  });


  //Create searched tweet and display it
  $('#search-form').on('submit', function (event) {
    //default functions that tells the function if the event does not get explicitly handled, 
    //its default action should not be taken as it normally would be
    event.preventDefault();
    var userID = $('#search-input');

    //send userID value that user input to express.js to search the tweet by its id within the tweetinfo global variable, then displays
    //it in a table form upon user clicking on "search" button
    $.ajax({
      url: '/searchinfo',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ id: userID.val() }),
      success: function (response) {
        var tbodyEl = $('#searchbody');

        tbodyEl.html('');

        tbodyEl.append('\
              <tr>\
                  <td class="tweetid">' + response.id_str + '</td>\
                  <td class="tweettext">' + response.text + '</td>\
                  <td class="time">' + response.created_at + '</td>\
              </tr>\
            ')
      }
    });
  });



  //UPDATE FUNCTION
  //Update user with new screen name
  $("#update-user").on('submit', function (event) {
    //default functions that tells the function if the event does not get explicitly handled, 
    //its default action should not be taken as it normally would be
    event.preventDefault();

    //get update input from user, split the string into an array and use the name to search the tweetinfo variable for the tweet to update
    //send new screen name to express.js to do the updating in the backend
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var nm = parsedStrings[0];
    var newName = parsedStrings[1];
    
    $.ajax({
      url: '/tweets/' + nm,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({newName: newName}),
      success: function (response) {
        console.log(response);
        $('#get-button').click();
        //updateInput.val('');
      }
    });
  });


  //DELETE FUNCTION
  //Delete tweet 
  $("#delete-form").on('submit', function () {
    var id = $('#delete-input').val();
    event.preventDefault();

    //function gets id value from user and sends it to backend so tweet object can be deleted from the tweetinfo variable
    $.ajax({
      url: '/tweetinfo/' + id,
      method: 'DELETE',
      contentType: 'application/json',
      success: function (response) {
        console.log(response);
      }
    })
  });

});





