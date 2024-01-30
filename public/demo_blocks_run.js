function createTrialObject(demo_pics_pairedT) {
    return {
        type: 'html-keyboard-response',
        stimulus: '<div style="display: flex; flex-direction: column; align-items: center; margin-top: -40px;">' +
            '<img src="' + demo_pics_pairedT[0].image_1 +
            '" style="width: 234px; height: 230px; margin-top: -50px;">' +
            '<div style="display: flex; justify-content: space-between; margin-top: 83px;">' +
            '<img src="' + demo_pics_pairedT[1].image_1 +
            '" style="width: 408px; height: 417px; margin-right:200px;">' +
            '<img src="' + demo_pics_pairedT[2].image_1 + '" style="width: 408px; height: 417px;">' + '</div>' +
            '</div>',
        choices: ['f', 'j'],
        trial_duration: 3000,
        data: {
            pattern_stimuli: demo_pics_pairedT[0].image_1,
            choice_stimuli_1: demo_pics_pairedT[1].image_1,
            choice_stimuli_2: demo_pics_pairedT[2].image_1,
            rewarded_answer: demo_pics_pairedT[3],
            pattern_conditions: demo_pics_pairedT[4],
            feedback_duration_times: demo_pics_pairedT[5],
            mood_rating: demo_pics_pairedT[6],
            correct_answer: demo_pics_pairedT[7],
            test_part: 'trial-demo'
        },
        on_finish: function (data) {
            var response = data.response;
            console.log(response)
            var response_correct = 0;
            var response_rewarded = 0;
            if (response == data.correct_answer) {
                response_correct = 1;
            }
            if (response == data.rewarded_answer) {
                response_rewarded = 1;
            }
            var responseData = {
                response_correct: response_correct,
                response_rewarded: response_rewarded,
            };
            jsPsych.data.addDataToLastTrial(responseData);
        }
    };
}

function createDisplayResponseObject(demo_pics_pairedT) {
    return {
        type: 'html-keyboard-response',
        stimulus: function () {
            var last_trial = jsPsych.data.getLastTrialData().values()[0];

            var response = last_trial.response;

            if (response == 'f') {
                return '<div style="display: flex; flex-direction: column; align-items: center; margin-top: -40px;">' +

                    '<img src="' + demo_pics_pairedT[0].image_1 +
                    '" style="width: 234px; height: 230px; margin-top: -50px;">' +
                    '<div style="display: flex; justify-content: space-between; margin-top: 83px;">' +
                    '<img src="' + demo_pics_pairedT[1].image_1 +
                    '" style="width: 408px; height: 417px; margin-left:-508px;">' +
                    '</div>' + '</div>';
            } else if (response == 'j') {
                return '<div style="display: flex; flex-direction: column; align-items: center;margin-top: -40px;">' +
                    '<img src="' + demo_pics_pairedT[0].image_1 +
                    '" style="width: 234px; height: 230px; margin-top: -50px;">' +
                    '<div style="display: flex; justify-content: space-between; margin-top: 83px;">' +
                    '<img src="' + demo_pics_pairedT[2].image_1 +
                    '" style="width: 408px; height: 417px; margin-left:608px;">' +
                    '</div>' + '</div>';
            } else(response == 'NaN')
            return "<div style='font-weight: bold; font-size: 75px; color: red;'>" +
                "Missed Trial <br><br><br><br> Please respond faster" +
                "</div>";
        },
        //   stimulus: function () {
        //     // ... Your shortened display_response code here ...
        //   },
        choices: jsPsych.NO_KEYS,
        trial_duration: 1000,
        data: {
            test_part: 'display_response-demo',
            displayed_choice: function () {
                var last_trial = jsPsych.data.getLastTrialData().values()[0];
                if (last_trial.response == 'f') {
                    return "pattern stimuli: " + last_trial.pattern_stimuli + ", " +
                        "chosen stimuli: " + last_trial.choice_stimuli_1;
                } else if (last_trial.response == 'j') {
                    return "pattern stimuli: " + last_trial.pattern_stimuli + ", " +
                        "chosen stimuli: " + last_trial.choice_stimuli_2;
                } else(last_trial.response == 'NaN')
                return 'Missed trial';
            }
        }
    };
}


function createFeedbackWindowObject(demo_pics_pairedT) {
    return {
        type: 'html-keyboard-response',
        stimulus: '',
        choices: jsPsych.NO_KEYS,
        trial_duration: function () {
            var last_trial_response = jsPsych.data.get().last(2).values()[0];

            if (last_trial_response.rt == null) {
                return 0;
            } else {
                return last_trial_response.feedback_duration_times;
            }
        },
        data: {
            test_part: 'feedback_duration_window-demo',
            feedback_durations: function () {
                var last_trial_response = jsPsych.data.get().last(2).values()[0];
                if (last_trial_response.rt !== null) {
                    return last_trial_response.feedback_duration_times;
                } else(last_trial_response.rt == null)
                return 0;

            }
        }
    };
}

function createFeedbackImageWindowObject(demo_pics_pairedT) {
    // var correctCounter = 0;
    return {
        type: 'html-keyboard-response',
        stimulus: function () {
            var data_window = jsPsych.data.get().last(3).values()[0];
            var data_window_response = data_window.response;

            if ((data_window_response != 'f') && (data_window_response != 'j') && (data_window_response == null)) {
                // data_window.counter = correctCounter;
                return "<div style='margin:auto;width: auto; font-size: 150%'>" +
                    "<span style='font-weight: bold; font-size: 100px; color: red;'>0 points!</span><br><br>" +
                    '</div>';
            } else if (data_window_response == data_window.rewarded_answer[0]) {
                // correctCounter = correctCounter + 10;
                // data_window.counter = correctCounter;
                return "<div style='margin:auto;width: auto; font-size: 150%'>" +
                    // "<font color='green' size='40'>CORRECT</font><br><br><br><br>" +
                    "<span style='font-weight: bold; font-size: 100px; color: green;'>+10 points!</span><br><br>" +
                    '</div>';
            } else if (data_window_response != data_window.rewarded_answer[0]) {
                // data_window.counter = correctCounter;
                return "<div style='margin:auto;width: auto; font-size: 150%'>" +
                    // "<font color='red' size='40'>INCORRECT</font><br><br><br><br>" +
                    "<span style='font-weight: bold; font-size: 100px; color: red;'>0 points!</span><br><br>" +
                    '</div>';
            }
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
        stimulus: '<div style="font-size:100px;">+</div>',
        choices: jsPsych.NO_KEYS,
        trial_duration: ITI_duration_time,
        data: {
            test_part: 'ITI-demo',
            ITI_duration: ITI_duration_time
        }
    };
}


function runExperiment(demo_pics_pairedT) {
    var numTrials = 6; // Change this number to set the number of trials

    var timeline = [];

    timeline.push(pavlovia_init);

    // timeline.push(demo_instruction)

    for (var i = 0; i < numTrials; i++) {
        var demo_pics_pairedT = demo_getBaskets();

        var trial = createTrialObject(demo_pics_pairedT);

        var displayResponse = createDisplayResponseObject(demo_pics_pairedT);
        var feedbackWindow = createFeedbackWindowObject(demo_pics_pairedT);
        var feedbackImageWindow = createFeedbackImageWindowObject(demo_pics_pairedT);
        var ITI_duration_time = createITIObject()

        if (!i == 0 && demo_pics_pairedT[6] == 1) {

            var mood_trial_baseline = {
                type: 'lmdlab-html-vas-response',
                data: {
                    test_part: "baseline_mood"
                },
                stimulus: 'How happy are you right now?',
                scale_colour: 'gray',
                labels: ['Very unhappy', 'Very happy'],
                on_finish: function () {
                    // saveTaskData();
                }
            };

            var mood_fixation = {
                type: 'html-keyboard-response',
                stimulus: '',
                choices: jsPsych.NO_KEYS,
                trial_duration: function () {
                    return 1500;
                },
                data: {
                    test_part: 'mood_fixation'
                }
            };

            var mood_trial_procedure = {
                timeline: [mood_trial_baseline, mood_fixation],
            }
            timeline.push(mood_trial_procedure);
        };

        timeline.push(trial, displayResponse, feedbackWindow, feedbackImageWindow, ITI_duration_time);

    }

    if (pav) timeline.push(pavlovia_finish);

    timeline.push(wait1sec);

    jsPsych.init({
        timeline: timeline,
        on_trial_finish: function (data) {},
        on_finish: function (data) {
            var prolificID = jsPsych.data.getURLVariable('subject');
            jsPsych.data.addProperties({
                'participant': prolificID
            });

            nextSection();
        }
    });
}