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
  $.ajax({
    headers: {
      accept: "application/json",
      app_id: "2aa0189a",
      app_key: "ae54f1dd060d103e0947e768e0963bba"
    },
    url: "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v1/entries/en/&" + term,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);

  });
 
  $.ajax({
  url: "http://api.urbandictionary.com/v0/define?term=&" + term,
  method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.list[0].definition);
  });
  
  //ready document close function tokens
});
