// index_survey.js
//
// questionnaires

// set variables
var scaleDisplayWidth = '60%';
var questions_required = false; // true;


var survey_leadin = ['For the next short questionnaire, the instructions are:'];



// Define rest trial
var rest_text = "<p style='font-size: 42px; color: white;'>Great work! Please take a short break.<br><br><br><br><i>(For example, stand up, stretch, get some water)</i><br><br><br><br><br>When you are ready, press the button<br><br>to start the next section.</p><br><br><br><br>";
var rest_trial = {
	type: 'lmdlab-rest-trial-limit',
	data: {
		exp_name: "survey",
		exp_stage: "rest",
		subjectID: subjectID
	},
	stimulus: rest_text,
	choices: ['<font size="+2.5">Continue</font>'],
	background_color: 'DarkGray',
};

// GAD7 Anxiety
var GAD7_scale = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

var GAD7_qn = [
  { prompt: "Feeling nervous, anxious, or on edge.", name: 'GAD7_1', labels: GAD7_scale },
  { prompt: "Not being able to stop or control worrying.", name: 'GAD7_2', labels: GAD7_scale },
  { prompt: "Worrying too much about different things.", name: 'GAD7_3', labels: GAD7_scale },
  { prompt: "Trouble relaxing.", name: 'GAD7_4', labels: GAD7_scale },
  { prompt: "Being so restless that it is hard to sit still.", name: 'GAD7_5', labels: GAD7_scale },
  { prompt: "Becoming easily annoyed or irritable.", name: 'GAD7_6', labels: GAD7_scale },
  { prompt: "Feeling afraid, as if something awful might happen.", name: 'GAD7_7', labels: GAD7_scale },
];

var GAD7_pretext = ['Over the <u>last two weeks</u>, how often have you been bothered by the following problems?'];

var GAD7_pre = {
  type: 'html-button-response',
  data: {
    exp_name: 'survey',
    exp_stage: 'GAD7',
    subjectID: subjectID
  },
  stimulus: '<p style="font-size: 2.5rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 3rem; line-height: 1.3; color: #000080"> ' + GAD7_pretext + '</p><br><br><br><p style="font-size: 2.5rem"> Thank you for your continued attention and focus!</p><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var GAD7 = {
  type: 'lmdlab-survey-likert',
  data: {
    exp_name: 'survey',
    exp_stage: 'GAD7',
    subjectID: subjectID
  },
  required: questions_required,
  preamble: GAD7_pretext,
  questions: GAD7_qn,
  button_label: 'Continue',
  scale_width: scaleDisplayWidth,
  num_answers: GAD7_scale.length,
  randomize_question_order: false,
  on_finish: function () { saveTaskData_survey() }
};

var GAD7_comb = {
  timeline: [GAD7_pre, GAD7]
}


// PHQ-9 Patient Health Questionnaire-9
var PHQ9_scale = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

var PHQ9_qn = [
  { prompt: "Little interest or pleasure in doing things.", name: 'PHQ9_1', labels: PHQ9_scale },
  { prompt: "Feeling down, depressed, or hopeless.", name: 'PHQ9_2', labels: PHQ9_scale },
  { prompt: "Trouble falling or staying asleep, or sleeping too much.", name: 'PHQ9_3', labels: PHQ9_scale },
  { prompt: "Feeling tired or having little energy.", name: 'PHQ9_4', labels: PHQ9_scale },
  { prompt: "I have experienced levitation where I am able to float in mid-air.", name: 'Catch', labels: PHQ9_scale }, // infrequency item / catch item / there was no catch trial in the running version
  { prompt: "Poor appetite or overeating.", name: 'PHQ9_5', labels: PHQ9_scale },
  { prompt: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down.", name: 'PHQ9_6', labels: PHQ9_scale },
  { prompt: "Trouble concentrating on things, such as reading the newspaper or watching television.", name: 'PHQ9_7', labels: PHQ9_scale },
  { prompt: "Moving or speaking so slowly that other people could have noticed?<br>Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual.", name: 'PHQ9_8', labels: PHQ9_scale },
  { prompt: "Thoughts that you would be better off dead or of hurting yourself in some way.", name: 'PHQ9_9', labels: PHQ9_scale },

];

var PHQ9_pretext = ['Over the <u>last two weeks</u>, how often have you been bothered by any of the following problems?'];


var PHQ9_pre = {
  type: 'html-button-response',
  data: {
    exp_name: 'survey',
    exp_stage: 'PHQ9',
    subjectID: subjectID
  },
  stimulus: '<p style="font-size: 2.5rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 3rem; line-height: 1.3; color: #000080"> ' + PHQ9_pretext + '</p><br><br><br><p style="font-size: 2.5rem"> Thank you for your continued attention and focus!</p><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var PHQ9 = {
  type: 'lmdlab-survey-likert',
  data: {
    exp_name: 'survey',
    exp_stage: 'PHQ9',
    subjectID: subjectID
  },
  required: questions_required,
  preamble: PHQ9_pretext,
  questions: PHQ9_qn,
  button_label: 'Continue',
  scale_width: scaleDisplayWidth,
  num_answers: PHQ9_scale.length,
  randomize_question_order: false,
  on_finish: function () { saveTaskData_survey() }
};

var PHQ9_comb = {
  timeline: [PHQ9_pre, PHQ9]
}



// shorted version from International Personality Item Pool (IPIP); used by Eldar et al. 2015
var HPS_scale = ["Very inaccurate", "Moderately inaccurate", "Neither accurate nor inaccurate", "Moderately accurate", "Very accurate"];

var HPS_qn = [
	{ prompt: "I frequently get into moods where I feel very speeded up and irritable.", name: 'hps1', labels: HPS_scale },
	{ prompt: "I think that my moods don't change more than most people's do.", name: 'hps2', labels: HPS_scale },
	{ prompt: "I have often felt happy and irritable at the same time.", name: 'hps3', labels: HPS_scale },
	{ prompt: "I can slow myself down when I want to.", name: 'hps4', labels: HPS_scale },
	{ prompt: "I am a person whose moods go up and down easily.", name: 'hps5', labels: HPS_scale },
	{ prompt: "I frequently find that my thoughts are racing.", name: 'hps6', labels: HPS_scale },
	{ prompt: "I am usually in an average sort of mood, not too high and not too low.", name: 'hps7', labels: HPS_scale },
	{ prompt: "I am often so restless that it is impossible for me to sit still.", name: 'hps8', labels: HPS_scale },
	{ prompt: "I get so happy or energetic that I am almost giddy.", name: 'hps9', labels: HPS_scale },
	{ prompt: "I feel emotions with extreme intensity.", name: 'hps10', labels: HPS_scale },
	{ prompt: "I am considered to be kind of eccentric.", name: 'hps11', labels: HPS_scale },
	{ prompt: "When I feel very excited and happy, I almost always know the reason.", name: 'hps12', labels: HPS_scale },
];

// separate source
// Please rate each item on a scale of 1 to 5.
var HPS_pretext = ['For each question below, please select the option that describes you the best.'];

var HPS_PRE = {
	type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'HPS',
		subjectID: subjectID
	},
	stimulus: '<p style="font-size: 2.5rem">In the next short questionnaire, the instructions are:<br><br><br></p><p style="font-size: 3rem; line-height: 1.3; color: #000080; max-width: 60ch"> ' + HPS_pretext + '</p><br><br><br><p style="font-size: 2.5rem"> Thank you for your continued attention and focus!</p><br><br><br>',
	choices: ['Continue'],
	button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var HPS = {
	type: 'lmdlab-survey-likert',
	data: {
		exp_name: 'survey',
		exp_stage: 'HPS',
		subjectID: subjectID
	},
	required: questions_required,
	preamble: HPS_pretext,
	questions: HPS_qn,
	button_label: 'Continue',
	scale_width: scaleDisplayWidth,
	num_answers: HPS_scale.length,
	randomize_question_order: false,
	on_finish: function () { saveTaskData_survey() }
};

var HPS_comb = {
	timeline: [HPS_PRE, HPS]
}



// MASQ Mood and Anxiety Symptom Questionnaire //
var MASQ_scale = ["Not at all", "A little bit", "Moderately", "Quite a bit", "Extremely"];

var MASQ_7_qn = [
  { prompt: "I felt really happy.", name: 'masq1', labels: MASQ_scale },
  { prompt: "I felt withdrawn from other people.", name: 'masq2', labels: MASQ_scale },
  { prompt: "I felt like I had a lot to look forward to.", name: 'masq3', labels: MASQ_scale },
  { prompt: "I felt like I had a lot of interesting things to do.", name: 'masq4', labels: MASQ_scale },
  { prompt: "I felt really lively, “up”.", name: 'masq5', labels: MASQ_scale },
  { prompt: "I felt like I had a lot of energy.", name: 'masq6', labels: MASQ_scale },
  { prompt: "I felt like I was having a lot of fun.", name: 'masq7', labels: MASQ_scale },
  { prompt: "I feel as if I am slowed down.", name: 'hads2', labels: MASQ_scale }, // HADS question!! //
  { prompt: "I have lost interest in my appearance.", name: 'hads6', labels: MASQ_scale }, // HADS question!! //
];


// the version of the script is below.
// var MASQ_7_qn = [
// 	{ prompt: "I felt really happy.", name: 'masq1', labels: MASQ_scale },
// 	{ prompt: "I felt withdrawn from other people.", name: 'masq5', labels: MASQ_scale },
// 	{ prompt: "I felt like I had a lot to look forward to.", name: 'masq9', labels: MASQ_scale },
// 	{ prompt: "I felt like nothing was very enjoyable.", name: 'masq11', labels: MASQ_scale }, // (including because we are not getting DASS)
// 	{ prompt: "I felt like I had a lot of interesting things to do.", name: 'masq15', labels: MASQ_scale },
// 	{ prompt: "I felt really lively, “up”.", name: 'masq19', labels: MASQ_scale },
// 	{ prompt: "I felt like I had a lot of energy.", name: 'masq23', labels: MASQ_scale },
// 	{ prompt: "I felt like I was having a lot of fun.", name: 'masq25', labels: MASQ_scale },
// 	{ prompt: "I feel as if I am slowed down.", name: 'hads2', labels: MASQ_scale }, // HADS item 2!! //
// 	{ prompt: "I have lost interest in my appearance.", name: 'hads6', labels: MASQ_scale }, // HADS item 6!! //
// ];

// used orignial pretext
var MASQ_pretext = ['Below is a list of feelings, sensations, problems, and experiences that people sometimes have.\n' +
							'Read each item and then choose the response that best describes how much you have felt or\n' +
							'experienced things this way during the <b>past week, including today</b>.'];

var MASQ_pre = {
  type: 'html-button-response',
  data: {
    exp_name: 'survey',
    exp_stage: 'MASQ_7',
    subjectID: subjectID
  },
  stimulus: '<p style="font-size: 2.5rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 3rem; line-height: 1.3; color: #000080"> ' + MASQ_pretext + '</p><br><br><br><p style="font-size: 2.5rem"> Thank you for your continued attention and focus!</p><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};


var MASQ_7 = {
	type: 'lmdlab-survey-likert',
	data: {
		exp_name: 'survey',
		exp_stage: 'MASQ_7',
		subjectID: subjectID,
	},
	required: questions_required,
	preamble: MASQ_pretext,
	questions: MASQ_7_qn,
	button_label: 'Continue',
	scale_width: '80%',
	num_answers: MASQ_scale.length,
	randomize_question_order: false,
	on_finish: function () { saveTaskData_survey() }
};

var MASQ_comb = {
  timeline: [MASQ_pre, MASQ_7]
}



// STAI
// State-Trait Anxiety Inventory – Trait
// 
// ADDED:  1 GAD-7 question, 1 BDI question, 1 LOT-R question, 1 RRQ question
var STAI_scale = ["Almost never", "Sometimes", "Often", "Almost always"];

var STAI_qn = [
  { prompt: "I feel pleasant.", name: 'STAI1', labels: STAI_scale },
//   { prompt: "I feel nervous and restless.", name: 'STAI2', labels: STAI_scale }, // excluding because GAD overlap: GAD item_1 + item_5 (average these scores)
  { prompt: "I feel satisfied with myself.", name: 'STAI3', labels: STAI_scale },
  { prompt: "I wish I could be as happy as others seem to be.", name: 'STAI4', labels: STAI_scale },
//   { prompt: "I feel like a failure.", name: 'STAI5', labels: STAI_scale }, // excluding because PHQ overlap:  PHQ item_6
  { prompt: "I feel rested.", name: 'STAI6', labels: STAI_scale },
  { prompt: "I am 'calm, cool, and collected'.", name: 'STAI7', labels: STAI_scale },
  { prompt: "I feel that difficulties are piling up so that I cannot overcome them.", name: 'STAI8', labels: STAI_scale },
  { prompt: "I worry too much over something that really does not matter.", name: 'STAI9', labels: STAI_scale },
  { prompt: "I am happy.", name: 'STAI10', labels: STAI_scale },
  { prompt: "I have disturbing thoughts.", name: 'STAI11', labels: STAI_scale },
  { prompt: "I lack self-confidence.", name: 'STAI12', labels: STAI_scale },
  { prompt: "I feel secure.", name: 'STAI13', labels: STAI_scale },
  { prompt: "I make decisions easily.", name: 'STAI14', labels: STAI_scale },
  { prompt: "I feel inadequate.", name: 'STAI15', labels: STAI_scale },
  { prompt: "I am content.", name: 'STAI16', labels: STAI_scale },
  { prompt: "Some unimportant thought runs through my mind and bothers me.", name: 'STAI17', labels: STAI_scale },
  { prompt: "I take disappointments so keenly that I can not put them out of my mind.", name: 'STAI18', labels: STAI_scale },
  { prompt: "I am a steady person.", name: 'STAI19', labels: STAI_scale },
  { prompt: "I get in a state of tension or turmoil as I think over my recent concerns and interests.", name: 'STAI20', labels: STAI_scale },
  { prompt: "I feel afraid, as if something awful might happen.", name: 'GAD7', labels: STAI_scale }, // GAD question !! // accidental GAD question - dropped in later summer 2023 subjects // removed from analysis
  { prompt: "I do not feel particularly guilty.", name: 'BDI5', labels: STAI_scale }, // BDI questionnaire !! //
  { prompt: "In uncertain times, I usually expect the best.", name: 'LOTR1', labels: STAI_scale }, // LOT-R questionnaire !! //
  { prompt: "I tend to 'ruminate' or dwell over things that happen to me for a really long time afterward.", name: 'RRQ3', labels: STAI_scale }, // RRQ questionnaire !! //
];

var STAI_pretext = ['A number of statements which people have used to describe themselves are\n' +
								'given below. Read each statement and then rate according to the labels to\n' +
								'indicate <b>how you generally feel</b>.<br>\n' +
								'There are no right or wrong answers. Do not spend too much time on any one\n' +
								'statement but give the answer which seems to describe how you generally feel.'];

var STAI_pre = {
  type: 'html-button-response',
  data: {
    exp_name: 'survey',
    exp_stage: 'STAI',
    subjectID: subjectID
  },
  stimulus: '<p style="font-size: 2.5rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 3rem; line-height: 1.3; color: #000080"> ' + STAI_pretext + '</p><br><br><br><p style="font-size: 2.5rem"> Thank you for your continued attention and focus!</p><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};  

var STAI = {
  type: 'lmdlab-survey-likert',
  data: {
    exp_name: 'survey',
    exp_stage: 'STAI',
    subjectID: subjectID
  },
  required: questions_required,
  preamble: STAI_pretext,
  questions: STAI_qn,
  button_label: 'Continue',
  scale_width: scaleDisplayWidth,
  randomize_question_order: false,
  on_finish: function () { saveTaskData_survey() }
};

var STAI_comb = {
  timeline: [STAI_pre, STAI]
}



// AES
// Apathy Evaluation Scale
var AES_scale = ["Not at all characteristic", "Slightly characteristic", "Somewhat characteristic", "Very characteristic"];

var AES_qn = [
  { prompt: "I am interested in things.", name: 'AES1', labels: AES_scale },
  { prompt: "I get things done during the day.", name: 'AES2', labels: AES_scale },
  { prompt: "Getting things started on my own is important to me.", name: 'AES3', labels: AES_scale },
  { prompt: "I am interested in having new experiences.", name: 'AES4', labels: AES_scale },
  { prompt: "I am interested in learning new things", name: 'AES5', labels: AES_scale },
  { prompt: "I put little effort into anything.", name: 'AES6', labels: AES_scale },
  { prompt: "I approach life with intensity.", name: 'AES7', labels: AES_scale },
  { prompt: "Seeing a job through to the end is important to me.", name: 'AES8', labels: AES_scale },
  { prompt: "I am someone who is reading this question; if so, please select the second option.", name: 'AES_catch', labels: AES_scale }, // trap question / it is different in the new version: 	{ prompt: "I have never seen the sun rise or set in my life.", name: 'Catch', labels: AES_scale }, // infrequency item / catch item
  { prompt: "I spend time doing things that interest me. ", name: 'AES9', labels: AES_scale },
  { prompt: "Someone has to tell me what to do each day.", name: 'AES10', labels: AES_scale },
  { prompt: "I am less concerned about my problems than I should be.", name: 'AES11', labels: AES_scale },
  { prompt: "I have friends", name: 'AES12', labels: AES_scale },
  { prompt: "Getting together with friends is important to me.", name: 'AES13', labels: AES_scale },
  { prompt: "When something good happens, I get excited.", name: 'AES14', labels: AES_scale },
  { prompt: "I have an accurate understanding of my problems.", name: 'AES15', labels: AES_scale },
  { prompt: "Getting things done during the day is important to me.", name: 'AES16', labels: AES_scale },
  { prompt: "I have initiative.", name: 'AES17', labels: AES_scale },
  { prompt: "I have motivation.", name: 'AES18', labels: AES_scale },
];

//AES separate source
var AES_pretext = ['For each question, choose the answer that best describes your' +
  								 'thoughts, feelings, and actions during the <b>past 4 weeks</b>.'];

var AES_PRE = {
  type: 'html-button-response',
  data: {
    exp_name: 'survey',
    exp_stage: 'AES',
    subjectID: subjectID
  },
  stimulus: '<p style="font-size: 2.5rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 3rem; line-height: 1.3; color: #000080"> ' + AES_pretext + '</p><br><br><br><p style="font-size: 2.5rem"> Thank you for your continued attention and focus!</p><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var AES = {
	type: 'lmdlab-survey-likert',
	data: {
		exp_name: 'survey',
		exp_stage: 'AES',
		subjectID: subjectID
	},
	required: questions_required,
	preamble: AES_pretext,
	questions: AES_qn,
	button_label: 'Continue',
	scale_width: '80%', // scaleDisplayWidth,
	num_answers: AES_scale.length,
	randomize_question_order: false,
	on_finish: function () { saveTaskData_survey() }
};

var AES_comb = {
  timeline: [AES_PRE, AES]
}


// SDS_Zung
// Zung Self-report Depression Scale
// var SDS_scale_original = ["A little of the time", "Some of the time", "Good part of the time", "Most of the time"];

// ADAPTED based on ZZZZ (add citation from version that shifted the options)
// NOTE Feb 2024:
// this is different than the usage in navrisk task, which went to "Rarely or none of the time" etc
var SDS_scale = ["None of the time", "A little of the time", "Some of the time", "Most of the time"];

var zung_qn = [
//   { prompt: "I feel down-hearted and blue.", name: 'SDS1', labels: SDS_scale }, // excluding because PHQ overlap: PHQ item_2
  { prompt: "Morning is when I feel the best.", name: 'SDS2', labels: SDS_scale },
  { prompt: "I have crying spells or feel like it.", name: 'SDS3', labels: SDS_scale },
//   { prompt: "I have trouble sleeping at night.", name: 'SDS4', labels: SDS_scale }, // excluding because PHQ overlap: PHQ item_3
  { prompt: "I eat as much as I used to.", name: 'SDS5', labels: SDS_scale },
  { prompt: "I still enjoy sex.", name: 'SDS6', labels: SDS_scale },
  { prompt: "I notice that I am losing weight.", name: 'SDS7', labels: SDS_scale },
  { prompt: "I have trouble with constipation.", name: 'SDS8', labels: SDS_scale },
  { prompt: "Right now, please respond with: Some of the time.", name: 'SDS_catch', labels: SDS_scale }, // infrequency item / catch item / it is different in new version of the script/ { prompt: "I think about how I was feeling one hundred years ago.", name: 'Catch', labels: SDS_scale }, // infrequency item / catch item
  { prompt: "My heart beats faster than usual.", name: 'SDS9', labels: SDS_scale },
  { prompt: "I get tired for no reason.", name: 'SDS10', labels: SDS_scale },
  { prompt: "My mind is as clear as it used to be.", name: 'SDS11', labels: SDS_scale },
  { prompt: "I find it easy to do the things I used to.", name: 'SDS12', labels: SDS_scale },
//   { prompt: "I am restless and can not keep still.", name: 'SDS13', labels: SDS_scale }, // excluding because GAD overlap: GAD item_5
  { prompt: "I feel hopeful about the future.", name: 'SDS14', labels: SDS_scale },
//   { prompt: "I am more irritable than usual.", name: 'SDS15', labels: SDS_scale }, // excluding because GAD overlap: GAD item_6
  { prompt: "I find it easy to make decisions.", name: 'SDS16', labels: SDS_scale },
  { prompt: "I feel that I am useful and needed.", name: 'SDS17', labels: SDS_scale },
  { prompt: "My life Is pretty full.", name: 'SDS18', labels: SDS_scale },
//  { prompt: "I feel that others would be better off if I were dead.", name: 'SDS19', labels: SDS_scale }, // excluding because PHQ overlap: PHQ item_9
  { prompt: "I still enjoy the things I used to do.", name: 'SDS20', labels: SDS_scale },
];

// separate source
// For each item below, please place a check mark in the column which best describes how often you 
// felt or behaved this way during the past several days
var SDS_pretext = ['Please read each statement and decide <b>how much</b> of the' +
									 'time the statement describes how you have been feeling' +
									 'during the <b>past several days</b>.'];

var SDS_pre = {
  type: 'html-button-response',
  data: {
    exp_name: 'survey',
    exp_stage: 'SDS',
    subjectID: subjectID
  },
  stimulus: '<p style="font-size: 2.5rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 3rem; line-height: 1.3; color: #000080"> ' + SDS_pretext + '</p><br><br><br><p style="font-size: 2.5rem"> Thank you for your continued attention and focus!</p><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var SDS = {
  type: 'lmdlab-survey-likert',
  data: {
    exp_name: 'survey',
    exp_stage: 'SDS',
    subjectID: subjectID
  },
  required: questions_required,
  preamble: SDS_pretext,
  questions: zung_qn,
  button_label: 'Continue',
  scale_width: scaleDisplayWidth,
  randomize_question_order: false,
  on_finish: function () { saveTaskData_survey() }
};

var SDS_comb = {
  timeline: [SDS_pre, SDS]
}



// STIC-SA
// State-Trait Inventory of Cognitive and Somatic Anxiety – Somatic Anxiety
var STICSA_scale = ["Not at All", "A Little", "Moderately", "Very Much So"];

var STICSA_qn = [
  { prompt: "My muscles are tense.", name: 'STICSA_1', labels: STICSA_scale },
  { prompt: "I feel dizzy.", name: 'STICSA_2', labels: STICSA_scale },
  { prompt: "My muscles feel weak.", name: 'STICSA_3', labels: STICSA_scale },
  { prompt: "My face feels hot.", name: 'STICSA_4', labels: STICSA_scale },
  { prompt: "My arms and legs feel stiff.", name: 'STICSA_5', labels: STICSA_scale },
  { prompt: "I have butterflies in my stomach (a nervous or fluttery feeling in my stomach).", name: 'STICSA_6', labels: STICSA_scale },
  { prompt: "My palms feel clammy.", name: 'STICSA_7', labels: STICSA_scale },
];

// the version of the script is below.

// var STICSA_qn = [
// 	// { prompt: "My heart beats fast.", name: 'STICSA_1', labels: STICSA_scale }, // excluding because SDS overlap:  SDS item_9
// 	{ prompt: "My muscles are tense.", name: 'STICSA_2', labels: STICSA_scale },
// 	{ prompt: "I feel dizzy.", name: 'STICSA_6', labels: STICSA_scale },
// 	{ prompt: "My muscles feel weak.", name: 'STICSA_7', labels: STICSA_scale },
// 	{ prompt: "I feel trembly and shaky.", name: 'STICSA_8', labels: STICSA_scale }, // (including because we are not getting DASS)
// 	{ prompt: "My face feels hot.", name: 'STICSA_12', labels: STICSA_scale },
// 	{ prompt: "My arms and legs feel stiff.", name: 'STICSA_14', labels: STICSA_scale },
// 	{ prompt: "I am better at seeing things with my eyes when there is light.", name: 'Catch', labels: STICSA_scale }, // infrequency item / catch item
// 	{ prompt: "My throat feels dry.", name: 'STICSA_15', labels: STICSA_scale }, // (including because we are not getting DASS)
// 	{ prompt: "My breathing is fast and shallow.", name: 'STICSA_18', labels: STICSA_scale }, // (including because we are not getting DASS)
// 	{ prompt: "I have butterflies in my stomach (a nervous or fluttery feeling in my stomach).", name: 'STICSA_20', labels: STICSA_scale },
// 	{ prompt: "My palms feel clammy.", name: 'STICSA_21', labels: STICSA_scale },
// ];


var STICSA_pretext = ['You will see a list of statements which can be used to describe how people feel.\n' +
									  	'Below each statement are four options which indicate how often each statement\n' +
									  	'is true of you. Please read each statement carefully and select the option which best indicates\n' +
										'how often, <b>in general</b>, the statement is true of you.'];


var STICSA_pre = {
  type: 'html-button-response',
  data: {
    exp_name: 'survey',
    exp_stage: 'STICSA',
    subjectID: subjectID
  },
  stimulus: '<p style="font-size: 2.5rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 3rem; line-height: 1.3; color: #000080"> ' + STICSA_pretext + '</p><br><br><br><p style="font-size: 2.5rem"> Thank you for your continued attention and focus!</p><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var STICSA = {
  type: 'lmdlab-survey-likert',
  data: {
    exp_name: 'survey',
    exp_stage: 'STICSA',
    subjectID: subjectID
  },
  required: questions_required,
  preamble: STICSA_pretext,
  questions: STICSA_qn,
  button_label: 'Continue',
  scale_width: scaleDisplayWidth,
  randomize_question_order: false,
  on_finish: function () { saveTaskData_survey() }
};

var STICSA_comb = {
  timeline: [STICSA_pre, STICSA]
}


// PVSS Positive Valence Systems Scale
// 
// returned to 9 options:  re-added "extremely" at ends
var PVSS_scale = ["Extremely untrue of me", "Very untrue of me", "  Moderately untrue of me", "Slightly untrue of me",
  "Neutral", "Slightly true of me", " Moderately true of me", " Very true of me", "Extremely true of me"];

var PVSS_qn = [
	{ prompt: "I <u>savored</u> my first bite of food after feeling hungry.", name: 'PVSS1', labels: PVSS_scale },
	{ prompt: "I <u>put energy</u> into activities I enjoy.", name: 'PVSS2', labels: PVSS_scale },
	{ prompt: "I <u>was delighted</u> to catch a breath of fresh air outdoors.", name: 'PVSS3', labels: PVSS_scale },
	{ prompt: "I <u>wanted</u> to spend time with people I know.", name: 'PVSS4', labels: PVSS_scale },
	{ prompt: "A fun activity during the weekend sustained my good mood <u>throughout the new week</u>.", name: 'PVSS5', labels: PVSS_scale },
	{ prompt: "It <u>felt good</u> to have physical contact with someone I felt close to.", name: 'PVSS6', labels: PVSS_scale },
	{ prompt: "I <u>expected</u> to enjoy a brief moment outdoors.", name: 'PVSS7', labels: PVSS_scale },
	{ prompt: "I <u>looked forward</u> to hearing feedback on my work.", name: 'PVSS8', labels: PVSS_scale },
// 	{ prompt: "I <u>enjoyed</u> my natural ability to turn completely invisible at will.", name: 'Catch', labels: PVSS_scale }, // infrequency item / catch item (Aug etc 2023)
	{ prompt: "I <u>enjoyed</u> the constant and extremely loud construction noise outside my bedroom.", name: 'Catch', labels: PVSS_scale }, // infrequency item / catch item (26 Sept 2023)
	{ prompt: "I <u>expected</u> to enjoy my meals.", name: 'PVSS9', labels: PVSS_scale },
	{ prompt: "Receiving praise about my work made me feel pleased <u>for the rest of the day</u>.", name: 'PVSS10', labels: PVSS_scale },
	{ prompt: "I <u>looked forward</u> to spending time with others.", name: 'PVSS11', labels: PVSS_scale },
	{ prompt: "I <u>wanted</u> to accomplish goals I set for myself.", name: 'PVSS12', labels: PVSS_scale },
	{ prompt: "I <u>expected</u> to enjoy being hugged by someone I love.", name: 'PVSS13', labels: PVSS_scale },
	{ prompt: "I <u>wanted</u> to participate in a fun activity with friends.", name: 'PVSS14', labels: PVSS_scale },
	{ prompt: "I <u>worked hard</u> to earn positive feedback on my projects.", name: 'PVSS15', labels: PVSS_scale },
	{ prompt: "I <u>looked forward</u> to an upcoming meal.", name: 'PVSS16', labels: PVSS_scale },
	{ prompt: "I <u>felt pleased</u> when I reached a goal I set for myself.", name: 'PVSS17', labels: PVSS_scale },
	{ prompt: "Getting a hug from someone close to me made me happy <u>even after</u> we parted .", name: 'PVSS18', labels: PVSS_scale },
	{ prompt: "I <u>expected</u> to master the tasks I undertook.", name: 'PVSS19', labels: PVSS_scale },
	{ prompt: "I <u>actively pursued</u> activities I thought would be fun.", name: 'PVSS20', labels: PVSS_scale },
	{ prompt: "I <u>went out of my way</u> to admire the beauty around me.", name: 'PVSS21', labels: PVSS_scale },
];

// Please indicate to what extent these statements describe your *responses over the last two weeks, including today*.
// 
// Did you NOT have this experience? No problem. Please indicate how you would have responded if you had experienced the situation over the last two weeks.
// Please consider only the aspect of the situation that is described, paying particular attention to the underlined text. For example, if the statement says, “I wanted to meet new people,” rate how much you wanted or would have wanted to meet new people over the last two weeks, assuming that the opportunity presented itself. Do not consider what the situation would have required of you or whether it would have been possible for you to meet people.
var PVSS_pretext = ['Please indicate to what extent these statements describe your responses <b>over the last two \n' +
                    'weeks, including today</b>.<br>\n' +
                    'Did you <b>not</b> have this experience? No problem. Please indicate how you <u>would have responded</u>\n' +
                    'if you had experienced the situation over the last two weeks.</b><br>\n' +
                    'Please consider only the aspect of the situation that is described, paying particular attention to\n' +
                    'the <u>underlined text</u>. For example, if the statement says, "<u>I wanted</u> to meet new people," rate\n' +
  					'how much you wanted or would have wanted to meet new people over the last two weeks,\n' +
                    'assuming that the opportunity presented itself. Do not consider what the situation would have\n' +
                    'required of you or whether it would have been possible for you to meet people.'];

var PVSS_PRE = {
	type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'PVSS',
		subjectID: subjectID
	},
	stimulus: '<p style="font-size: 2.5rem">In the next short questionnaire, the instructions are:<br><br><br></p><p style="font-size: 3rem; line-height: 1.3; color: #000080; max-width: 60ch"> ' + PVSS_pretext + '</p><br><br><br><p style="font-size: 2.5rem"> Thank you for your continued attention and focus!</p><br><br><br>',
	choices: ['Continue'],
	button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var PVSS = {
	type: 'lmdlab-survey-likert',
	data: {
		exp_name: 'survey',
		exp_stage: 'PVSS',
		subjectID: subjectID,
	},
	required: questions_required,
	preamble: PVSS_pretext,
	questions: PVSS_qn,
	button_label: 'Continue',
	scale_width: '90%',
	randomize_question_order: false,
	num_answers: PVSS_scale.length,
	on_finish: function () { saveTaskData_survey() }
};

var PVSS_comb = {
	timeline: [PVSS_PRE, PVSS]
}

// ****************************************************************************************************************
//  We're using questionnaires until here. (Our surveys: PHQ9, GAD7, HPS, AES, MASQ7, SDS, STICSA, STAI, PVSS)
// ****************************************************************************************************************




// General intro and conclusion //
var survey_start_trial = {
  type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'introduction',
		subjectID: subjectID
	},

  stimulus: '<p style="font-size: 3rem; line-height: 1.3">The study involves the completion of several questionnaires<br> about mood and personality.<br><br><br>Please read the instructions for <b>each set of questions</b>,<br>and then <b>carefully</b> answer each question.<br><br><br>Please note that the <b>instructions and options change</b><br>for different questionnaries.<br><br><br><br><b>Thank you for doing your best!</b><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
  on_finish: function () { saveTaskData_surveyintro() }
};

var survey_start = {
	timeline: [survey_start_trial]
};

var survey_end_trial = {
  type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'finish',
		subjectID: subjectID
	},
  stimulus: '<p style="font-size: 3rem">Thank you!  You have finished this part of the experiment!<br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var survey_end = {
	timeline: [survey_end_trial]
};


// Preload icar images //
var preload = {
		type: 'lmdlab-preload',
		data: {
			exp_name: "survey",
			exp_stage: "preload",
		    subjectID: subjectID
		},
		images: ["Stimuli/img/mx46_q_new.svg","Stimuli/img/mx46_a_new.svg","Stimuli/img/rsd8_q_new.svg"]
}

var survey_question = {
	type: 'lmdlab-survey-text',
	data: {
		exp_name: "survey",
		exp_stage: "feedback",
		subjectID: subjectID
	},
	required: questions_required,
	questions: [
		{ prompt: "<p style='font-size: 30px; line-height: 1.3'> Some feedback would help! Did you find anything unclear or need to be improved in this part? <br><br> If so, please describe them briefly.</p><br><br><br>", rows: 6 },
	],
	on_finish: function () { saveTaskData_survey() }
};


// randomize and add to timeline


// All the _comb items
var all_comb = [
	PHQ9_comb,
// 	GAD7_comb,
// 	MASQ_comb,
// 	STAI_comb,
// 	AES_comb,
// 	SDS_comb,
//     HPS_comb,
	STICSA_comb,
//     PVSS_comb
];


// Shuffle the array
var shuffled_comb = jsPsych.randomization.shuffle(all_comb);


// Split the shuffled array into two halves
var half_length = Math.ceil(shuffled_comb.length / 2); // We use Math.ceil() in case there is an odd number of items
var first_half = shuffled_comb.slice(0, half_length);
var second_half = shuffled_comb.slice(half_length);

// Assign to timelines
var survey_rand1 = {
  timeline: first_half
}

var survey_rand2 = {
  timeline: second_half
}


var survey_all = {
  timeline: all_comb
}

// Create final survey timeline //
var survey_final = {
	timeline: [
		survey_start,
	    survey_rand1,
	    rest_trial,
	    survey_rand2,
// 		survey_question, // NOT HERE
//     	survey_end, // NOT HERE
  	]
};


//// IF running separately, uncomment here ////

// var timeline_survey = [];
// timeline_survey.push(survey_final)

// jsPsych.init({
//
// 				timeline: timeline_survey,
// 				fullscreen: true,
// 				on_finish: function() {
// 					saveTaskData_survey();
// 					jsPsych.data.get().localSave('csv','results_survey.csv');
// 				}
//
// });