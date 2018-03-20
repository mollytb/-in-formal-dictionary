console.log(12);
var oxfordCredentials = "2aa0189a"
var oxKey = "ae54f1dd060d103e0947e768e0963bba"
var oxfordBaseURL = "https://od-api.oxforddictionaries.com/api/v1"
var urbanDictionaryKey = "e86PuErIxamshxX1NQoXzPi9BD9Sp1C1SgDjsnrfJoJR5BOft9"
var urbanDictionaryBaseURL = "mashape-community-urban-dictionary.p.mashape.com"

$(document).ready(function() {

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
  //ajax button click function

  //clear button function
  $("#button2").on("click", function clear(event) {
    event.preventDefault();

    $("#data1").empty();
    $("#data2").empty();

  });

  $("#button1").on("click", function search(event) {
    event.preventDefault();

    //getting value from input and trimming end spaces
    var term = $("#term").val().trim();
    console.log(term);
    $.ajax({

      headers: {
        accept: "application/json",
        app_id: "2aa0189a",
        app_key: "ae54f1dd060d103e0947e768e0963bba"
      },
      url: "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v1/inflections/en/" + term,
      method: "GET"
    }).then(function(response) {
      console.log(term);
      console.log(response);
      console.log(response.results[0].lexicalEntries[0].inflectionOf[0].text);
      var rootTerm = response.results[0].lexicalEntries[0].inflectionOf[0].text;

      $.ajax({

        headers: {
          accept: "application/json",
          app_id: "2aa0189a",
          app_key: "ae54f1dd060d103e0947e768e0963bba"
        },
        url: "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v1/entries/en/" + rootTerm,
        method: "GET"
      }).then(function(response) {
        console.log(term);
        console.log(response);
        console.log(response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
        var oxDef = response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        //oxford table write to dom
        $("#tableBody > tbody").prepend("<tr><td>" + term + "</td><td>" + oxDef + "</td><td>");
      })
    });

    console.log(term);
    $.ajax({
      url: "https://api.urbandictionary.com/v0/define?term=" + term,
      method: "GET"
    }).then(function(response) {
      console.log(term);
      console.log(response);
      console.log(response.list[0].definition);
      var urbDef = response.list[0].definition;
      //urban table write to dom
      $("#tableBody2 > tbody").prepend("<tr><td>" + term + "</td><td>" + urbDef + "</td><td>");
    });

    $("#term").val("");
  });

  //ready document close function tokens
});
