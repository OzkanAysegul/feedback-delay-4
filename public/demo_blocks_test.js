function createExperiment() {
  var numTrials = 5; // Change this number to set the number of trials
  var timeline = [];

  for (var i = 0; i < numTrials; i++) {
    var pics_pairedT = getBaskets();

    var trial = createPatternChoiceTrial(pics_pairedT);
    var displayResponse = createDisplayResponseTrial();
    var feedbackWindow = createFeedbackWindowTrial();
    var feedbackImageWindow = createFeedbackImageWindowTrial();
    var ITI_duration_time = 1500 + Math.floor(Math.random() * 1001);
    var ITI = {
      type: 'html-keyboard-response',
      stimulus: '',
      choices: jsPsych.NO_KEYS,
      trial_duration: ITI_duration_time,
      data: {
        test_part: 'ITI-demo',
        ITI_duration: ITI_duration_time
      },
    };

    // Add the trials to the timeline
    timeline.push(trial, displayResponse, feedbackWindow, feedbackImageWindow, ITI);
  }

  // Run the experiment with the timeline
  jsPsych.init({
    timeline: timeline,
    on_trial_finish: function (data) {
      // jsPsych.data.displayData('csv');
    },
    on_finish: function (data) {
      jsPsych.data.get().localSave('csv', 'data_feedback_decision.csv');
      subsequent_memory_test();
      // debrief_final();
    }
  });
}

// Call the createExperiment function to start the experiment
createExperiment();
