// index_survey.js
//
// questionnaires

// set variables
var scaleDisplayWidth = 800; // in px
var questions_required = true;


var survey_leadin = ['For the next short questionnaire, the instructions are:'];



// Define rest trial
var rest_text = "<p style='font-size: 42px; color: white;'>Great work! Please take a short break.<br><br><br><br><i>(For example, stand up, stretch, get some water)</i><br><br><br><br><br>When you are ready, press the button<br><br>to start the next section.</p><br><br><br><br>";
var rest_trial = {
	type: 'lmdlab-rest-trial',
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

var GAD7_pretext = ['Over the <u>last two weeks</u>, how often have you been bothered by the following problems?'
];

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

var PHQ9_pretext = ['Over the <u>last two weeks</u>, how often have you been bothered by any of the following problems?'
];


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
  randomize_question_order: false,
  on_finish: function () { saveTaskData_survey() }
};

var PHQ9_comb = {
  timeline: [PHQ9_pre, PHQ9]
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
var MASQ_pretext = ['Below is a list of feelings, sensations, problems, and experiences that people<br>' +
  									'sometimes have. Read each item and then choose the response that best<br>' +
									  'describes how much you have felt or experienced things this way during the<br>' +
									  '<b>past week, including today</b>.'];

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
    subjectID: subjectID
  },
  required: questions_required,
  preamble: MASQ_pretext,
  questions: MASQ_7_qn,
  button_label: 'Continue',
  scale_width: scaleDisplayWidth,
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

var STAI_pretext = ['A number of statements which people have used to describe themselves are<br>' +
  									'given below. Read each statement and then rate according to the labels to<br>' +
									  'indicate <b>how you generally feel</b>.<br><br>' +
									  'There are no right or wrong answers. Do not spend too much time on any one<br>' +
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
var AES_pretext = ['For each question, choose the answer that best describes your<br>' +
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
  scale_width: scaleDisplayWidth,
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
var SDS_pretext = ['Please read each statement and decide <b>how much</b> of the <br>' +
									 'time the statement describes how you have been feeling<br>' +
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


var STICSA_pretext = ['You will see a list of statements which can be used to describe how people feel.<br>'+
									  	'Below each statement are four options which indicate how often each statement<br>' +
									  	'is true of you.<br><br>' +
										  'Please read each statement carefully and select the option which best indicates<br>'+
										  'how often, <b>in general</b>, the statement is true of you.'
];

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
                    'the <u>underlined text</u>. For example, if the statement says, "<u>I wanted</u> to meet new people,” rate\n' +
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
		subjectID: subjectID
	},
	required: questions_required,
	preamble: PVSS_pretext,
	questions: PVSS_qn,
	button_label: 'Continue',
	scale_width: '70%',
	randomize_question_order: false,
	num_answers: 11, // need wider width here
	on_finish: function () { saveTaskData_survey() }
};

var PVSS_comb = {
	timeline: [PVSS_PRE, PVSS]
}

// ****************************************************************************************************************
//  We're using questionnaires until here. (Our surveys: PHQ9, GAD7, AES, MASQ7, SDS, STICSA, STAI, PVSS)
// ****************************************************************************************************************


// PSWQ Penn State Worry Questionnaire //
var PSWQ_scale = [" Not at all typical", "Rarely typical of me", "Somewhat typical of me", "Often typical of me", "Very typical of me"];

var PSWQ_8_qn = [
  { prompt: "My worries overwhelm me.", name: 'pswq1', labels: PSWQ_scale },
  { prompt: "Many situations make me worry.", name: 'pswq2', labels: PSWQ_scale },
  { prompt: "I know I shouldn't worry about things, but I just cannot help it.", name: 'pswq3', labels: PSWQ_scale },
  { prompt: "When I am under pressure I worry a lot.", name: 'pswq4', labels: PSWQ_scale },
  { prompt: "I am always worrying about something.", name: 'pswq5', labels: PSWQ_scale },
  { prompt: "As soon as I finish one task, I start to worry about everything else I have to do.", name: 'pswq6', labels: PSWQ_scale },
  { prompt: "I notice that I have been worrying about things.", name: 'pswq7', labels: PSWQ_scale },
  { prompt: "Once I start worrying, I can't stop.", name: 'pswq8', labels: PSWQ_scale },
];

// original pretext 
// Choose the response that best describes how typical or characteristic each item is of you.
var PSWQ_pretext = ['Rate each of the following statements on the scale ranging from<br>' +
                    '“not at all typical of me” to “very typical of me”.'];

var PSWQ_pre = {
  type: 'html-button-response',
  data: {
    exp_name: 'survey',
    exp_stage: 'PSWQ_8',
    subjectID: subjectID
  },
  stimulus: '<p style="font-size: 2.5rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 3rem; line-height: 1.3; color: #000080"> ' + PSWQ_pretext + '</p><br><br><br><p style="font-size: 2.5rem"> Thank you for your continued attention and focus!</p><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],

};

var PSWQ_8 = {
  type: 'lmdlab-survey-likert',
  data: {
    exp_name: 'survey',
    exp_stage: 'PSWQ_8',
    subjectID: subjectID
  },
  required: questions_required,
  preamble: PSWQ_pretext,
  questions: PSWQ_8_qn,
  button_label: 'Continue',
  scale_width: scaleDisplayWidth,
  randomize_question_order: false,
  on_finish: function () { saveTaskData_survey() }
};

var PSWQ_comb = {
  timeline: [PSWQ_pre, PSWQ_8]
}


// LSAS
// L Social Anxiety Scale
var lebsocial_scale = ["None", "Mild", "Moderate", "Severe"];

var lebsocial_qn = [
  { prompt: "Participating in small groups", name: 'lebsocial1', labels: lebsocial_scale },
  { prompt: "Talking to people in authority", name: 'lebsocial2', labels: lebsocial_scale },
  { prompt: "Going to a party", name: 'lebsocial3', labels: lebsocial_scale },
  { prompt: "Writing while being observed", name: 'lebsocial4', labels: lebsocial_scale },
  { prompt: "Calling someone you don't know very well.", name: 'lebsocial5', labels: lebsocial_scale },
  { prompt: "Talking with people you don't know very well", name: 'lebsocial6', labels: lebsocial_scale },
  { prompt: "Meeting strangers", name: 'lebsocial7', labels: lebsocial_scale },
  { prompt: "Entering a room when others are already seated", name: 'lebsocial8', labels: lebsocial_scale },
  { prompt: "Speaking up at a meeting", name: 'lebsocial9', labels: lebsocial_scale },
  { prompt: "Expressing a disagreement or disapproval to people you don't know very well", name: 'lebsocial10', labels: lebsocial_scale },
  { prompt: "Looking at people you don't know very well in the eyes", name: 'lebsocial11', labels: lebsocial_scale },
  { prompt: "Giving a report to a group", name: 'lebsocial12', labels: lebsocial_scale },
  { prompt: "Returning goods to a store", name: 'lebsocial13', labels: lebsocial_scale },
];

// original source: no introduction there
// separate source
// var LSAS_pretext = ['This measure assesses the way that social phobia plays a role in your life across a variety of situations.<br>'+
// 										'Read each situation carefully and answer two questions about it; the first question asks <br>' +
// 										'how anxious or fearful you feel in the situation; the second question asks how often you avoid it. <br>'+
// 										'If you come across a situation that you ordinarily do not experience, we ask that you imagine<br>' +
// 										'“<i>what if you were faced with that situation</i>”, and then rate the degree to which you would fear <br>'+
// 										'this hypothetical situation and how often you would tend to avoid it (using the 0 to 3 scales below). <br>'+ 
// 										'Please base your ratings on the way that situations have affected you in the last week (or other agreed time period).'
// ];
// adapted for only anxious/fearful response
var LSAS_pretext = ['This measure assesses the way that social phobia plays a role in your life across a<br>'+
										'variety of situations. Read each situation carefully and answer how <b>anxious</b> or<br>' +
										'<b>fearful</b> lyou feel in the situation.<br><br>'+
										'If you come across a situation that you ordinarily do not experience, we ask that you<br>' +
										'imagine “<i>what if you were faced with that situation</i>”, and then rate the degree to which<br>'+
										'you would be anxious or fearful in this hypothetical situation.<br><br>'+ 
										'Please base your ratings on the way that situations have affected you <b>in the last week</b>.'
];

// 		Seow_preamble: ['<strong>Read each bolded statement carefully and answer two questions about that statement. The first question asks how ANXIOUS or FEARFUL you feel in that situation. The second question asks how often you AVOID that situation.
// 										'Please base your ratings on the way that the situations have affected you in the LAST WEEK.</strong>'],

var LSAS_pre = {
  type: 'html-button-response',
  data: {
    exp_name: 'survey',
    exp_stage: 'LSAS',
    subjectID: subjectID
  },
  stimulus: '<p style="font-size: 2.5rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 3rem; line-height: 1.3; color: #000080"> ' + LSAS_pretext + '</p><br><br><br><p style="font-size: 2.5rem"> Thank you for your continued attention and focus!</p><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var LSAS = {
  type: 'lmdlab-survey-likert',
  data: {
    exp_name: 'survey',
    exp_stage: 'LSAS',
    subjectID: subjectID
  },
  required: questions_required,
  preamble: LSAS_pretext,
  questions: lebsocial_qn,
  button_label: 'Continue',
  scale_width: scaleDisplayWidth,
  randomize_question_order: false,
  on_finish: function () { saveTaskData_survey() }
};

var LSAS_comb = {
  timeline: [LSAS_pre, LSAS]
}


// Sociodem
// Demographic and sociological questions

var Sociodem_scale1 = ["College or University degree","A levels/AS levels or equivalent", "O levels/GCSEs or equivalent","CSEs or equivalent","NVQ or HND or HNC or equivalent", 
	"Other professional qualifications eg: nursing, teaching","None of the above","Prefer not to answer"];
var Sociodem_scale2 = ["Never/rarely","Sometimes", "Often","Most of the time","Do not drive on the motorway",
	"Do not know","Prefer not to answer"];
var Sociodem_scale3 = ["Prefer not to answer","Never", "Previous","Current"];
var Sociodem_scale4 = ["Daily or almost daily","Three or four times a week", "Once or twice a week","One to three times a month",
  "Special occasions only","Never","Prefer not to answer"
];

// var Sociodem_pretext = ['  preamble: "Please answer the question using the response options below:\n ",.<br><br>'+
// 										 'Please carefully consider and respond to each of the items below.<br>'
// ];

var Sociodem_pre = {
  type: 'html-button-response',
  data: {
    exp_name: 'survey',
    exp_stage: 'Sociodem',
	subjectID: subjectID
  },
  required: questions_required,
  stimulus: '<p style="font-size: 2.5rem">Next, we have a short questionnaire on demographics and behaviour.<br><br>Thank you for your continued attention and focus!</p><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var Sociodem_age = {
	type: 'lmdlab-survey-text',
	data: {
		exp_name: "survey",
		exp_stage: "Sociodem",
		subjectID: subjectID
	},
  required: questions_required,
	questions: [
		{ prompt: "<p style='font-size: 30px; line-height: 1.3'>Age:</p><br><br><br>", rows: 1, colums: 5, numbers: 1 },
	],
};

var Sociodem_education = {
  type: 'lmdlab-multi-select',
  data: {
    exp_name: 'survey',
    exp_stage: 'Sociodem',
	subjectID: subjectID
  },
  required: questions_required,
  questions: [
    {
      prompt:  '<font size="+3">Which of the following qualifications do you have?<br><br>(You can select more than one.)<br><br></font>', 
      options: Sociodem_scale1, 
      horizontal: false,
      name: 'Sociodem_education'
    }, 
  ], 
  randomize_question_order: true,
  font_size_choice: "+2",
  on_finish: function () { saveTaskData_survey() }
};

var Sociodem_drive = {
  type: 'lmdlab-survey-likert',
  data: {
    exp_name: 'survey',
    exp_stage: 'Sociodem',
    subjectID: subjectID
  },
  required: questions_required,
  preamble: '', //Sociodem_pretext,
  questions:[
    { prompt: '<font size="+3">How often do you drive faster than the speed limit on the motorway?<br><br></font>', name: 'Sociodem_drive', labels: Sociodem_scale2 },
  ],
  button_label: 'Continue',
  scale_width: scaleDisplayWidth*1.3,
  randomize_question_order: false,
  num_answers: 7,
  on_finish: function () { saveTaskData_survey() }
};

var Sociodem_smoke = {
  type: 'lmdlab-survey-likert',
  data: {
    exp_name: 'survey',
    exp_stage: 'Sociodem',
    subjectID: subjectID
  },
  required: questions_required,
  preamble: '', //Sociodem_pretext,
  questions:[
    { prompt: '<font size="+3">Are you or have you been a smoker (a user of nicotine cigarettes, vapes, etc.)?<br><br></font>', name: 'Sociodem_smoke', labels: Sociodem_scale3 },
  ],
  button_label: 'Continue',
  scale_width: scaleDisplayWidth*1,
  randomize_question_order: false,
  num_answers: 4,
  on_finish: function () { saveTaskData_survey() }
};

var Sociodem_alcohol = {
  type: 'lmdlab-survey-likert',
  data: {
    exp_name: 'survey',
    exp_stage: 'Sociodem',
    subjectID: subjectID
  },
  required: questions_required,
  preamble: '', //Sociodem_pretext,
  questions:[
    { prompt: '<font size="+3">How often do you drink alcohol?<br><br></font>', name: 'Sociodem_alcohol', labels: Sociodem_scale4 },
  ],
  button_label: 'Continue',
  scale_width: scaleDisplayWidth*1.3,
  randomize_question_order: false,
  num_answers: 7,
  on_finish: function () { saveTaskData_survey() }
};


var Sociodem_comb = {
  timeline: [Sociodem_pre, Sociodem_age, Sociodem_education, Sociodem_drive, Sociodem_smoke, Sociodem_alcohol]
}



// General intro and conclusion //
var survey_start_trial = {
  type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'introduction',
		subjectID: subjectID
	},

  stimulus: '<p style="font-size: 3rem">The study involves the completion of several questionnaires<br> about mood and personality.<br><br><br>Please read the instructions for <b>each set of questions</b>,<br>and then <b>carefully</b> answer each question.<br><br><br>Please note that the <b>instructions and options change</b><br>for different questionnaries.<br><br><br><br><b>Thank you for doing your best!</b><br><br><br>',
  choices: ['Continue'],
  button_html: ['<button class="lmdlab-btn">%choice%</button>'],
//   on_finish: function () { saveTaskData_surveyintro() }
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
	GAD7_comb,
	MASQ_comb,
	STAI_comb,
	AES_comb,
	SDS_comb,
	STICSA_comb,
    PVSS_comb
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
// 		Sociodem_comb, // NOT HERE Socio-dem here
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