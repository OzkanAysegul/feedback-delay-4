

// var learnlist = JSON.parse(combinedescribed);

var combinationIndex = 0;

var indexes = [0];
var combination_count = 150;

function getBaskets() {
    
  var combination = learnlist[combinationIndex];
  // var targetTrial = combination.pattern_stimuli;
  var leftCombination = combination.choice_stimuli_1;
  var rightCombination = combination.choice_stimuli_2;
  var feedback_stim = combination.rewarded_answer;
  var conditions_definition = combination.condition;
  var feedback_duration = combination.feedback_time_duration;
  var mood_rating = combination.mood_rating;
  var correct_response = combination.correct_answer;
  var stimulus_left = combination.stim_left;
  var stimulus_right = combination.stim_right;

  var basket_0 = {};
  var basket_1 = {};

  // basket_0.image_1 = targetTrial;
  basket_1.image_1 = leftCombination;

  var basket_2 = {};

  basket_2.image_1 = rightCombination;

  
  var pics_pairedT = [];
  pics_pairedT.push(basket_0);
  pics_pairedT.push(basket_1);
  pics_pairedT.push(basket_2);
  pics_pairedT.push(feedback_stim);
  pics_pairedT.push(conditions_definition);
  pics_pairedT.push(feedback_duration);
  pics_pairedT.push(mood_rating);
  pics_pairedT.push(correct_response);
  pics_pairedT.push(stimulus_left);
  pics_pairedT.push(stimulus_right);


  combinationIndex = combinationIndex + 1;
    
  if (combinationIndex == combination_count) {
    // choice_trials = jsPsych.randomization.repeat(choice_trials, 1);
    combinationIndex = 0;
    indexes = [0];
  }
 
  return pics_pairedT

};


