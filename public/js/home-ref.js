// In this code below we create the Front-end JavaScript which 'POSTS' our form data to our express server.
// In essence, when the user hits submit, jQuery grabs all of the fields then sends a post request to our api
// Our api recognizes the route (/api/tables)... and then runs the associated code (found in api-routes.js).
// In this case the associated code 'saves' the data to the table-data.js file or waitinglist-data.js file

// jQuery handler that runs the encapsulated code when the page is ready.
$( function(){

    // Click listener for the submit button
    $('#btnSubmit').on('click', function(event) {
      event.preventDefault();
  
      // Here we grab the form elements
      const newTask = {
        task: $('#inputTask').val().trim()     
      };
  
      // for(let key in newTask){
      //   if(newTask[key] === ''){
      //     alert('Please fill out all fields');
      //     return;
      //   }
      // }
  
      //console.log(toDoList);
  
      // This line is the magic. It's very similar to the standard ajax function we used.
      // Essentially we give it a URL, we give it the object we want to send, then we have a 'callback'.
      // The callback is the response of the server. In our case, we set up code in api-routes that 'returns' true or false
      // depending on if a tables is available or not.
  
      $.ajax({ url: '/api/toDo', method: 'POST', data: newTask }).then(
        function(data) {
          // If our POST request was successfully processed, proceed on
          if (data.success) {
            //alert("success");
            console.log('data', data)
            // If a table is available... tell user they are booked.
            if (!data.waitlist) {
             // alert('The task added!');
            }
  
            // Clear the form when submitting
            $('#inputTask').val(''); 
            $('#inputTask').focus();
          } else { 
            alert('There was a problem with your submission. Please check your entry and try again.');
          }
          
  
        });
    });
  });
  