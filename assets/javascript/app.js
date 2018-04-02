
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
var timeConv = moment(time, "HH:mm");
console.log(timeConv);
var timeNow = moment().format("HH:mm");
console.log("TNow:"+timeNow);

//relate input gap with current time
var timeDif = moment().diff(moment(timeConv), "minutes");
console.log(time);
console.log("Difference in Time: " + timeDif);

//how many time left
var timeLeft = timeDif % interval;

//minutes between times to see diferense
var minBe = interval - timeLeft;

//nextTrain diplay it in dom
var nextTrain = moment().add(minBe, "minutes").format("HH:mm");
$("#table>tbody").append("<tr><td>"+train+"</td><td>"+destination+"</td>"+"</td><td>"+nextTrain+"</td>"+"</td><td>"+minBe+"</td></tr>");
// $("#table>tbody").append("<td>"+destination+"</td>");
// $("#table>tbody").append("<td>"+nextTrain+"</td>");
// $("#table>tbody").append("<td>"+minBe+"</td>");

});