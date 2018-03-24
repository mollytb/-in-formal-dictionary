console.log(12);

$(document).ready(function() {


  // Initialize Firebase/ we don't use firebase
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
  $("#button2").on("click", function clear(event) {
    event.preventDefault();
    
    $("#data1").empty();
    $("#data2").empty();
    
  });
  var term;
  $("#button1").on("click", function search(event) {
    event.preventDefault();
    
    //getting value from input and trimming end spaces
    term = $("#term").val().trim();
    console.log(term);
    //ajax call to oford dictionary to get root word
    $.ajax({
      
      headers: {
        accept: "application/json",
        app_id: "2aa0189a",
        app_key: "ae54f1dd060d103e0947e768e0963bba"
      },
      //bypass CORS issue with heroku url
      url: "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v1/inflections/en/" + term,
      method: "GET"
    }).then(function(response) {
      //console.log('oxford reposne')
      //console.log(term);
      //console.log(response);
      console.log(response.results[0].lexicalEntries[0].inflectionOf[0].text);
      var rootTerm = response.results[0].lexicalEntries[0].inflectionOf[0].text;
      
      //ajax call to oxford dictionary
      $.ajax({
        
        headers: {
          accept: "application/json",
          app_id: "2aa0189a",
          app_key: "ae54f1dd060d103e0947e768e0963bba"
        },
        //bypass CORS issue with heroku url
        url: "https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v1/entries/en/" + rootTerm,
        method: "GET"
      }).then(function(response) {
        console.log('have root word response');
        //error handling urban dictionary
        if (response.status === 404){
          return $("#tableBody > tbody").prepend("<tr><td>" + term + "</td><td>" + "No Results" + "</td><td>");
        }
        console.log(term);
        console.log(response);
        console.log(response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
        var oxDef = response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        
        //oxford table write to dom
        $("#tableBody > tbody").prepend("<tr><td>" + term + "</td><td>" + oxDef + "</td><td>");
      })
    });
    
    console.log(term);
    //ajax call to urban dictionary
    $.ajax({
      url: "https://api.urbandictionary.com/v0/define?term=" + term,
      method: "GET"
    }).then(function(response) {
      
      if (response.result_type === "no_results"){
        
        return $("#tableBody2 > tbody").prepend("<tr><td>" + term + "</td><td>" + "No Results Found" + "</td><td>");
      };
      console.log(term);
      console.log(response);
      console.log(response.list[0].definition);
      var urbDef = response.list.length > 0 ? response.list[0].definition: null;
      //urban table write to dom
      $("#tableBody2 > tbody").prepend("<tr><td>" + term + "</td><td>" + urbDef + "</td><td>");
      
    });
    //clear text input
    $("#term").val("");
  });

  //error handling for oxford 
  $(document).ajaxError(function(xhr){
    $("#tableBody > tbody").prepend("<tr><td>" + term + "</td><td>" + "No Results Found" + "</td><td>");
    //clear text input
    $("#term").val("");
  })

  //ready document close function tokens
});
