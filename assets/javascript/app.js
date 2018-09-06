var animalsArray = ["bird", "cat", "dog", "cow", "goat", "sugar glider", "hedgehog", "fennec fox", "kinkajou", "wallaby",
                    "capybara", "slow loris", "dik dik", "binturong", "bearded dragon", "axolotl", "alpaca", "llama"];
renderButtons();

$("#addAnimal").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();

    // This line will grab the text from the input box
    var animal = $("#animal-input").val().trim();
    // The animal from the textbox is then added to our array
    animalsArray.push(animal);

    // calling renderButtons which handles the processing of our animal array
    renderButtons();
    
    //clears text box
    $("#animal-input").val("");
  });

$(document).on("click",".btn", function() {
     // Deleting the animal gifs prior to displaying more
     $("#animals").empty();
    
    // Event listener for all button elements
    var animal = $(this).attr("data-animal");
     // Constructing a URL to search Giphy for the animal in the button
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=UvWx7unYDRWbw0Djmw5fWxT5STsAUpFS&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // Storing an array of results in the results variable
    var results = response.data;

    // Looping over every result item
    for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var animalImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          animalImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and animalImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(animalImage);

          // Prepending the gifDiv to the "#animals" div in the HTML
          $("#animals").prepend(gifDiv);
        }
      }
});
}); 

// Function for displaying animal buttons
function renderButtons() {

    // Deleting the animal buttons prior to rendering buttons from array
    $("#animalButtons").empty();

    // Looping through the array of animals
    for (var i = 0; i < animalsArray.length; i++) {

      // Then dynamicaly generating buttons for each animal in the array.
      var a = $("<button>");
      // Adding a class
      a.addClass("btn btn-outline-info");
      // Adding a data-attribute with a value of the animal at index i
      a.attr("data-animal", animalsArray[i]);
      // Providing the button's text with a value of the animal at index i
      a.text(animalsArray[i]);
      // Adding the button to the HTML
      $("#animalButtons").append(a);
    }
}


