//  Firebase database and saving //

// day and time saving here
timestamp_day = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
console.log(timestamp_day)
timestamp_time = new Date().toLocaleTimeString('en-GB',{ hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
console.log(timestamp_time)


// Your web app's Firebase configuration
const firebaseConfig = {
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
    console.log("UID found...");
    console.log(uid);
  } else {
    uid = "not found";
    console.log("UID not found");
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


function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) { return pair[1]; }
	}
	return (false);
}

// Get subjectID from prolific (prolificid)
if (window.location.search.indexOf('PROLIFIC_PID') > -1) {
	var subjectID = getQueryVariable('PROLIFIC_PID');
	console.log('subjectID',subjectID)
}
else {
	var subjectID = Math.floor(Math.random() * (2000000 - 0 + 1)) + 0; // if no prolific ID, generate random ID (for testing)
	console.log('subjectID',subjectID)
	subjectID = '' + subjectID;
}


/////////////////////////


// learning
function saveTaskData_learnintro() {
	console.log("saving intro");
	// record subject id, new date, and start time
	db.collection('delaylearntaskv3').doc('exp_learn').collection('subjects').doc(uid).set({
		subjectID: subjectID,  // this refers to the subject's ID from prolific
		date: timestamp_day,
		start_time: timestamp_time
	})
	// record subject id in 'start'
	db.collection('delaylearntaskv3').doc('exp_learn').collection('subjects').doc(uid).collection('taskdata').doc('start').set({
		subjectID: subjectID,
		date: timestamp_day,
		start_time: timestamp_time
	})
}
function saveTaskData_learn() {
	console.log("saving data");
	var task_data = jsPsych.data.get().json();
	//var stringifydata = jsPsych.data.get().filterCustom(function(trial){ return trial.exp_stage == "learning"}).json();
	db.collection('delaylearntaskv3').doc('exp_learn').collection('subjects').doc(uid)
	.collection('taskdata').doc('data').set({
		data: task_data,
	})
}


// test
function saveTaskData_testintro() {
	console.log("saving intro");
	// record subject id, new date, and start time
	db.collection('delaylearntaskv3').doc('exp_test').collection('subjects').doc(uid).set({
		subjectID: subjectID,  // this refers to the subject's ID from prolific
		date: timestamp_day,
		start_time: timestamp_time
	})
	// record subject id in 'start'
	db.collection('delaylearntaskv3').doc('exp_test').collection('subjects').doc(uid).collection('taskdata').doc('start').set({
		subjectID: subjectID,
		date: timestamp_day,
		start_time: timestamp_time
	})
}
function saveTaskData_test() {
	console.log("saving data");
	var stringifydata = jsPsych.data.get().filterCustom(function(trial){ return trial.exp_stage == "test"}).json();
	db.collection('delaylearntaskv3').doc('exp_test').collection('subjects').doc(uid)
	.collection('taskdata').doc('data').set({
		data: stringifydata,
	})
}


// post-questions
function saveTaskData_postquestionsintro() {
	console.log("saving intro");
	// record subject id, new date, and start time
	db.collection('delaylearntaskv3').doc('exp_post_survey').collection('subjects').doc(uid).set({
		subjectID: subjectID,
		date: timestamp_day,
		start_time: timestamp_time
	})
	// record subject id in 'start'
	db.collection('delaylearntaskv3').doc('exp_post_survey').collection('subjects').doc(uid).collection('taskdata').doc('start').set({
		subjectID: subjectID,  // this refers to the subject's ID from prolific
		date: timestamp_day,
		start_time: timestamp_time,
	})
}
function saveTaskData_postquestions() {
	console.log("saving data");
	//var stringifydata = jsPsych.data.get().filterCustom(function(trial){ return trial.exp_name == "delaylearn" && trial.exp_stage == "survey"}).json()
	var stringifydata = jsPsych.data.get().filterCustom(function(trial){ return trial.exp_stage == "survey"}).json()
	db.collection('delaylearntaskv3').doc('exp_post_survey').collection('subjects').doc(uid).collection('taskdata').doc('data').set({
		data: stringifydata
	})
}




// self-report surveys
function saveTaskData_surveyintro() {
	console.log("saving intro");
	// record subject id, new date, and start time
	db.collection('delaylearntaskv3').doc('exp_survey').collection('subjects').doc(uid).set({
		subjectID: subjectID,  // this refers to the subject's ID from prolific
		date: timestamp_day,
		start_time: timestamp_time
	})
	// record subject id in 'start'
	db.collection('delaylearntaskv3').doc('exp_survey').collection('subjects').doc(uid).collection('taskdata').doc('start').set({
		subjectID: subjectID,
		date: timestamp_day,
		start_time: timestamp_time
	})
}
function saveTaskData_survey() {
	//console.log("saving data");
	var stringifydata = jsPsych.data.get().filterCustom(function(trial){ return trial.exp_name == "survey" && trial.exp_stage == "survey"}).json();
	db.collection('delaylearntaskv3').doc('exp_survey').collection('subjects').doc(uid).collection('taskdata').doc('data').set({
		data: stringifydata,
	})
}


/// forwardspan
function saveTaskData_fwdspanintro() {
	console.log("saving intro");
	// record subject id in 'start'
	db.collection('delaylearntaskv3').doc('exp_fwdspan').collection('subjects').doc(uid).set({
		subjectID: subjectID,
		date: timestamp_day,
		start_time: timestamp_time
	})
	// record subject id, new date, and start time
	db.collection('delaylearntaskv3').doc('exp_fwdspan').collection('subjects').doc(uid).collection('taskdata').doc('start').set({
		subjectID: subjectID,
		date: timestamp_day,
		start_time: timestamp_time
	})
}
function saveTaskData_fwdspan() {
	console.log("saving data");
	var task_data = jsPsych.data.get().json();
	var stringifydata = jsPsych.data.get().filterCustom(function(trial){ return trial.exp_name == "fwdspan"}).json();
	db.collection('delaylearntaskv3').doc('exp_fwdspan').collection('subjects').doc(uid).collection('taskdata').doc('data').set({
		data: stringifydata
	})
}
