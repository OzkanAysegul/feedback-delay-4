//  Firebase database and saving //


// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyDQWLhZnL__HoKkuLARBKsvTdx3WmZx6QI",
	authDomain: "delaylearn.firebaseapp.com",
	projectId: "delaylearn",
	storageBucket: "delaylearn.appspot.com",
	messagingSenderId: "615696330271",
	appId: "1:615696330271:web:160ac73a693c82f75d2f2a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// When signed in, get the user ID
firebase.auth().signInAnonymously();

var uid;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    uid = user.uid;
    console.log("found...");
    console.log(uid);
  } else {
    uid = "not found";
    console.log("not found");
  }
});


// Enable persistence
firebase
  .firestore()
  .enablePersistence()
  .catch(function(err) {
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
    }
  });


// Set up db
var db = firebase.firestore();


// Get subjectID from prolific
if (window.location.search.indexOf('PROLIFIC_PID') > -1) {
		var subjectID = getQueryVariable('PROLIFIC_PID');
}
else {
		var subjectID = Math.floor(Math.random() * (2000000 - 0 + 1)) + 0; // if no prolific ID, generate random ID (for testing)
		subjectID = '' + subjectID;
// 		alert("Not signed in to Prolific; " +
// 		"picture counterbalancing will not be consistent across sessions!");
}




/// ForwardSpan
function saveTaskData_fwdspanintro() {
	console.log("saving intro");
	// record subject id
	db.collection('delaylearntask').doc('exp_fwdspan').collection('subjects').doc(uid).set({
		subjectID: subjectID
	})
	// record subject id, new date, and start time
	db.collection('delaylearntask').doc('exp_fwdspan').collection('subjects').doc(uid).collection('taskdata').doc('start').set({
		subjectID: subjectID,  // this refers to the subject's ID from prolific/
		date: new Date().toLocaleDateString(),
		start_time: new Date().toLocaleTimeString()
	})
}

function saveTaskData_fwdspan() {
	console.log("saving data");
	var task_data = jsPsych.data.get().json();
	var stringifydata = jsPsych.data.get().filterCustom(function(trial){ return trial.exp_name == "fds"}).json();
	db.collection('delaylearntask').doc('exp_fwdspan').collection('subjects').doc(uid).collection('taskdata').doc('data').set({
		data: stringifydata
	})
}



