
// var described = '[{"pattern_stimuli":"images/pattern_3.png","choice_stimuli_1":"images/choice_trial_5.png","choice_stimuli_2":"images/choice_trial_6.png","correct_answer":"d","condition":"long3_highreward1","feedback_time_duration":7000,"mood_rating":0},{"pattern_stimuli":"images/pattern_7.png","choice_stimuli_1":"images/choice_trial_13.png","choice_stimuli_2":"images/choice_trial_14.png","correct_answer":"l","condition":"short3_highreward1","feedback_time_duration":2000,"mood_rating":0},{"pattern_stimuli":"images/pattern_5.png","choice_stimuli_1":"images/choice_trial_9.png","choice_stimuli_2":"images/choice_trial_10.png","correct_answer":"l","condition":"short1_highreward1","feedback_time_duration":2000,"mood_rating":0},{"pattern_stimuli":"images/pattern_6.png","choice_stimuli_1":"images/choice_trial_11.png","choice_stimuli_2":"images/choice_trial_12.png","correct_answer":"l","condition":"short2_highreward1","feedback_time_duration":2000,"mood_rating":1},{"pattern_stimuli":"images/pattern_8.png","choice_stimuli_1":"images/choice_trial_15.png","choice_stimuli_2":"images/choice_trial_16.png","correct_answer":"d","condition":"short4_highreward1","feedback_time_duration":2000,"mood_rating":0}]';

var demo_learnlist = JSON.parse(demodescribedshorter);

// console.log(demo_learnlist);

var combinationIndex = 0;

var indexes = [0];
var combination_count = 6;

function demo_getBaskets() {
    
  var combination = demo_learnlist[combinationIndex];
  var targetTrial = combination.pattern_stimuli;
  var leftCombination = combination.choice_stimuli_1;
  var rightCombination = combination.choice_stimuli_2;
  var feedback_stim = combination.rewarded_answer;
  var conditions_definition = combination.condition;
  var feedback_duration = combination.feedback_time_duration
  var mood_rating = combination.mood_rating
  var correct_answer = combination.correct_answer;

  var basket_0 = {};
  var basket_1 = {};

  basket_0.image_1 = targetTrial;
  basket_1.image_1 = leftCombination;

  var basket_2 = {};

  basket_2.image_1 = rightCombination;

  
  var demo_pics_pairedT = [];
  demo_pics_pairedT.push(basket_0);
  demo_pics_pairedT.push(basket_1);
  demo_pics_pairedT.push(basket_2);
  demo_pics_pairedT.push(feedback_stim);
  demo_pics_pairedT.push(conditions_definition);
  demo_pics_pairedT.push(feedback_duration);
  demo_pics_pairedT.push(mood_rating);
  demo_pics_pairedT.push(correct_answer);

  combinationIndex = combinationIndex + 1;
    
  if (combinationIndex == combination_count) {
    // choice_trials = jsPsych.randomization.repeat(choice_trials, 1);
    combinationIndex = 0;
    indexes = [0];
  }
 
  return demo_pics_pairedT

};


