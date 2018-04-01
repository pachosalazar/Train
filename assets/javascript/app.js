
//setting up fire base 
var config = {
  apiKey: "AIzaSyAA5yx8HSylFw700ow2vGjil_S07vioO2Y",
  authDomain: "train-36d36.firebaseapp.com",
  databaseURL: "https://train-36d36.firebaseio.com",
  projectId: "train-36d36",
  storageBucket: "train-36d36.appspot.com",
  messagingSenderId: "492987779586"
};
firebase.initializeApp(config);
  console.log(firebase);

  var database = firebase.database();
  $("#addSubmit").on("click", function(event) {
    event.preventDefault();
    // reacive the user typing
    var trainName = $("#train").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#time").val().trim(), "HH:mm").format("HH:mm");
    var interval = $("#interval").val().trim();
    // do new info
    var newTrain = {
        name: trainName,
        place: destination,
        ftrain: firstTrain,
        freq: interval
}
database.ref().push(newTrain);
console.log(newTrain.name)

// empty buttons 
$("#train").val();
$("#destination").val();
$("#time").val();
$("#interval").val();
//retun default

return false;
});

//got to add information data from the new entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

//display the typed info
var train= childSnapshot.val().name;
var destination = childSnapshot.val().place;
var time = childSnapshot.val().ftrain;
var interval = childSnapshot.val().freq;
// create a var train and related with actual time

var timeConv = moment(train, "HH:mm");
console.log(timeConv);





});