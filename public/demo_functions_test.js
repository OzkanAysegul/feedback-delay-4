var demo_pics_pairedT = demo_getBaskets();

var demo_factors = {
  pattern: [demo_pics_pairedT[0].image_1],
  image1: [demo_pics_pairedT[1].image_1],
  image2: [demo_pics_pairedT[2].image_1],
  corrAns: demo_pics_pairedT[3],
  pattern_condition: [demo_pics_pairedT[4]],
  feedback_duration: [demo_pics_pairedT[5]],
  mood_rating: [demo_pics_pairedT[6]],
};


function createTrialObject(demo_pics_pairedT) {
  return {
    type: 'html-keyboard-response',
      stimulus: '<div style="display: flex; flex-direction: column; align-items: center; margin-top: -40px;">' +
      '<img src="' + demo_factors.pattern +
      '" style="width: 234px; height: 230px; margin-top: -50px;">' +
      '<div style="display: flex; justify-content: space-between; margin-top: 83px;">' +
      '<img src="' + demo_factors.image1 +
      '" style="width: 408px; height: 417px; margin-right:200px;">' +
      '<img src="' + demo_factors.image2 + '" style="width: 408px; height: 417px;">' + '</div>' +
      '</div>',
    choices: ['f', 'j'],
    trial_duration: 3000,
    data: {
      pattern_stimuli: demo_pics_pairedT[0].image_1,
      choice_stimuli_1: demo_pics_pairedT[1].image_1,
      choice_stimuli_2: demo_pics_pairedT[2].image_1,
      correct_answer: demo_pics_pairedT[3],
      pattern_conditions: demo_pics_pairedT[4],
      feedback_duration_times: demo_pics_pairedT[5],
      mood_rating: demo_pics_pairedT[6],
      test_part: 'trial-demo'
    },
    on_finish: function (data) {
      var response = data.response;
    }
  };
}

function createDisplayResponseObject() {
  return {
    type: 'html-keyboard-response',
    stimulus: function () {
      // ... Your shortened display_response code here ...
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    data: {
      test_part: 'display_response-demo',
      displayed_choice: function () {
        // ... Your shortened displayed_choice code here ...
      }
    }
  };
}

function createFeedbackWindowObject() {
  return {
    type: 'html-keyboard-response',
    stimulus: '',
    choices: jsPsych.NO_KEYS,
    trial_duration: function () {
      // ... Your shortened feedback_window trial_duration code here ...
    },
    data: {
      test_part: 'feedback_duration_window-demo',
      feedback_durations: function () {
        // ... Your shortened feedback_window feedback_durations code here ...
      }
    }
  };
}

function createFeedbackImageWindowObject() {
  var correctCounter = 0;
  return {
    type: 'html-keyboard-response',
    stimulus: function () {
      // ... Your shortened feedback_image_window stimulus code here ...
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 1500,
    data: function () {
      var data_window = jsPsych.data.get().last(3).values()[0];
      var data_window_response = data_window.response;
      var data = {
        test_part: 'feedback_image_window-demo'
      };
      return data;
    }
  };
}

function createITIObject() {
  var ITI_duration_time = 1500 + Math.floor(Math.random() * 1001);
  return {
    type: 'html-keyboard-response',
    stimulus: '',
    choices: jsPsych.NO_KEYS,
    trial_duration: ITI_duration_time,
    data: {
      test_part: 'ITI-demo',
      ITI_duration: ITI_duration_time
    }
  };
}

// Function to run the experiment
function runExperiment() {
  var numTrials = 8; // Change this number to set the number of trials
  var timeline = [];

  for (var i = 0; i < numTrials; i++) {
    var demo_pics_pairedT = demo_getBaskets();


    var trial = createTrialObject(demo_pics_pairedT);

    var displayResponse = createDisplayResponseObject();


    timeline.push(trial, displayResponse);
  

    // var displayResponse = createDisplayResponseObject();
    // var feedbackWindow = createFeedbackWindowObject();
    // var feedbackImageWindow = createFeedbackImageWindowObject();
    // var ITI = createITIObject();

    // var testProcedure = {
    //   timeline: [trial, displayResponse, feedbackWindow, feedbackImageWindow, ITI],
    //   timeline_variables: factors
    // };

    // timeline.push(testProcedure);

  //   if (i !== 0 && factors.mood_rating[0] === 1) {
  //     var moodTrialBaseline = {
  //       type: 'lmdlab-html-vas-response',
  //       data: {
  //         test_part: "baseline_mood"
  //       },
  //       stimulus: 'How happy are you right now?',
  //       scale_colour: 'gray',
  //       labels: ['Very unhappy', 'Very happy'],
  //       on_finish: function () {
  //         // saveTaskData();
  //       }
  //     };

  //     var moodFixation = {
  //       type: 'html-keyboard-response',
  //       stimulus: '',
  //       choices: jsPsych.NO_KEYS,
  //       trial_duration: 1500,
  //       data: {
  //         test_part: 'mood_fixation'
  //       }
  //     };

  //     var moodTrialProcedure = {
  //       timeline: [moodTrialBaseline, moodFixation]
  //     };

  //     timeline.push(moodTrialProcedure);
  //   }
  }

  jsPsych.init({
    timeline: timeline,
    on_trial_finish: function (data) {
      // jsPsych.data.displayData('csv');
    },
    on_finish: function (data) {
      jsPsych.data.get().localSave('csv', 'data_feedback_decision.csv');
      // subsequent_memory_test();
      // debrief_final();
    }
  });
}

// Call the function to run the experiment
runExperiment();




function createFeedbackWindowObject() {
  return {
    type: 'html-keyboard-response',
    stimulus: '',
    choices: jsPsych.NO_KEYS,
    trial_duration: function () {
      // ... Your shortened feedback_window trial_duration code here ...
    },
    data: {
      test_part: 'feedback_duration_window-demo',
      feedback_durations: function () {
        // ... Your shortened feedback_window feedback_durations code here ...
      }
    }
  };
}

function createFeedbackImageWindowObject() {
  var correctCounter = 0;
  return {
    type: 'html-keyboard-response',
    stimulus: function () {
      // ... Your shortened feedback_image_window stimulus code here ...
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 1500,
    data: function () {
      var data_window = jsPsych.data.get().last(3).values()[0];
      var data_window_response = data_window.response;
      var data = {
        test_part: 'feedback_image_window-demo'
      };
      return data;
    }
  };
}

function createITIObject() {
  var ITI_duration_time = 1500 + Math.floor(Math.random() * 1001);
  return {
    type: 'html-keyboard-response',
    stimulus: '',
    choices: jsPsych.NO_KEYS,
    trial_duration: ITI_duration_time,
    data: {
      test_part: 'ITI-demo',
      ITI_duration: ITI_duration_time
    }
  };
}