
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');

        //TODO: creat a tweet
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
    
    //TODO: search a tweet and display it.

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet

  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
    event.preventDefault();

    //TODO: delete a tweet

  });


});


                    
   