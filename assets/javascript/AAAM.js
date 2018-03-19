console.log(12);
var oxfordCredentials = "2aa0189a"
var oxKey = "ae54f1dd060d103e0947e768e0963bba"
var oxfordBaseURL = "https://od-api.oxforddictionaries.com/api/v1"
var urbanDictionaryKey = "e86PuErIxamshxX1NQoXzPi9BD9Sp1C1SgDjsnrfJoJR5BOft9"
var urbanDictionaryBaseURL = "mashape-community-urban-dictionary.p.mashape.com"

$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD33QsSEZD9OzsUQz7B_c7Tet4MxMfixpo",
    authDomain: "aaam-38e63.firebaseapp.com",
    databaseURL: "https://aaam-38e63.firebaseio.com",
    projectId: "aaam-38e63",
    storageBucket: "",
    messagingSenderId: "1074798895512"
  };
  firebase.initializeApp(config);

  $("#button1").on("click", function(){
    event.preventDefault();
    
    
    var term1 = $("#term").val().trim();
    console.log(term1);
    $.ajax({
      
      headers: {
        accept: "application/json",
        app_id: "2aa0189a",
        app_key: "ae54f1dd060d103e0947e768e0963bba"
      },
      url: "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v1/entries/en/"+ term1,
      method: "GET"
    }).then(function (response) {
      console.log(term1);
      console.log(response);
      console.log(response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
      
    })
    var term = $("#term").val().trim();
    console.log(term);
    $.ajax({
      url: "https://api.urbandictionary.com/v0/define?term="+ term,
      method: "GET"
    }).then(function (response) {
      console.log(term);
      console.log(response);
      console.log(response.list[0].definition);
      
    });
    $("#term").val("");
  });

  //var tbody = $("#tableBody");
  //// Create and save a reference to new empty table row
  //var row = $("<tr>");
  //// Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
  //var tdDefinition = $("<td>");
  //tdDefinition.text(response);
  //// Append the td elements to the new table row
  //row.append(tdDefinition);
//
  //// Append the table row to the tbody element
  //tbody.append(row);

  //ready document close function tokens
});
