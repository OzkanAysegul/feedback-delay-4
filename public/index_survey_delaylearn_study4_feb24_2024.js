// index_survey.js
//
// questionnaires

// set variables
var scaleDisplayWidth = '60%';
var questions_required = true; // true;


var survey_leadin = ['In the next short questionnaire, the instructions are:'];



// Define rest trial
var rest_text = "<p style='font-size: 42px; color: white;'>Great work! Please take a break.<br><br><br><br><i>(For example, stand up, stretch, get some water)</i><br><br><br><br><br>When you are ready, press the button<br><br>to start the next section.</p><br><br><br><br>";
var rest_trial = {
	type: 'lmdlab-rest-trial-limit',
	data: {
		exp_name: "survey",
		exp_stage: "rest",
		subjectID: subjectID
	},
	stimulus: rest_text,
	choices: ['<font size="+2.5">Continue</font>'],
	pre_iti: 500,
	post_iti: 1500,
};



// PHQ-9 Patient Health Questionnaire-9
var PHQ9_scale = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

var PHQ9_qn = [
	{ prompt: "Little interest or pleasure in doing things.", name: 'PHQ1', labels: PHQ9_scale},
	{ prompt: "Feeling down, depressed, or hopeless.", name: 'PHQ2', labels: PHQ9_scale},
	{ prompt: "Trouble falling or staying asleep, or sleeping too much.", name: 'PHQ3', labels: PHQ9_scale},
	{ prompt: "Feeling tired or having little energy.", name: 'PHQ4', labels: PHQ9_scale},
	{ prompt: "I have experienced levitation where I am able to float in mid-air.", name: 'Catch', labels: PHQ9_scale}, // infrequency item / catch item
	{ prompt: "Poor appetite or overeating.", name: 'PHQ5', labels: PHQ9_scale},
	{ prompt: "Feeling bad about yourself &#8211; or that you are a failure or have let yourself or your family down.", name: 'PHQ6', labels: PHQ9_scale},
	{ prompt: "Trouble concentrating on things, such as reading the newspaper or watching television.", name: 'PHQ7', labels: PHQ9_scale},
	{ prompt: "Moving or speaking so slowly that other people could have noticed? Or the opposite &#8211; being so fidgety or restless that you have been moving around a lot more than usual.", name: 'PHQ8', labels: PHQ9_scale},
	{ prompt: "Thoughts that you would be better off dead or of hurting yourself in some way.", name: 'PHQ9', labels: PHQ9_scale},
];

var PHQ9_pretext = ['Over the <u>last two weeks</u>, how often have you been bothered by any of the following problems?'];

var PHQ9_pre = {
	type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'PHQ9',
		subjectID: subjectID
	},
	stimulus: '<p style="font-size: 2.0rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 2.2rem; line-height: 1.3; color: #000080"> ' + PHQ9_pretext + '</p><br><br><br><p style="font-size: 2.0rem"> Thank you for your continued attention and focus!</p><br><br><br>',
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




// GAD7 Anxiety
var GAD7_scale = ["Not at all", "Several days", "More than half the days", "Nearly every day"];

var GAD7_qn = [
	{ prompt: "Feeling nervous, anxious, or on edge.", name: 'GAD1', labels: GAD7_scale},
	{ prompt: "Not being able to stop or control worrying.", name: 'GAD2', labels: GAD7_scale},
	{ prompt: "Worrying too much about different things.", name: 'GAD3', labels: GAD7_scale},
	{ prompt: "Trouble relaxing.", name: 'GAD4', labels: GAD7_scale},
	{ prompt: "Being so restless that it is hard to sit still.", name: 'GAD5', labels: GAD7_scale},
	{ prompt: "Becoming easily annoyed or irritable.", name: 'GAD6', labels: GAD7_scale},
	{ prompt: "Feeling afraid, as if something awful might happen.", name: 'GAD7', labels: GAD7_scale},
];

var GAD7_pretext = ['Over the <u>last two weeks</u>, how often have you been bothered by the following problems?'];

var GAD7_pre = {
	type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'GAD7',
		subjectID: subjectID
	},
	stimulus: '<p style="font-size: 2.0rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 2.2rem; line-height: 1.3; color: #000080"> ' + GAD7_pretext + '</p><br><br><br><p style="font-size: 2.0rem"> Thank you for your continued attention and focus!</p><br><br><br>',
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



// shorted version from International Personality Item Pool (IPIP); used by Eldar et al. 2015
var HPS_scale = ["Very inaccurate", "Moderately inaccurate", "Neither accurate nor inaccurate", "Moderately accurate", "Very accurate"];

var HPS_qn = [
	{ prompt: "I frequently get into moods where I feel very speeded up and irritable.", name: 'hps1', labels: HPS_scale },
	{ prompt: "I think that my moods don't change more than most people's do.", name: 'hps2', labels: HPS_scale }, // reverse
	{ prompt: "I have often felt happy and irritable at the same time.", name: 'hps3', labels: HPS_scale },
	{ prompt: "I can slow myself down when I want to.", name: 'hps4', labels: HPS_scale }, // reverse
	{ prompt: "I am a person whose moods go up and down easily.", name: 'hps5', labels: HPS_scale },
	{ prompt: "I frequently find that my thoughts are racing.", name: 'hps6', labels: HPS_scale },
	{ prompt: "I am usually in an average sort of mood, not too high and not too low.", name: 'hps7', labels: HPS_scale }, // reverse
	{ prompt: "I am often so restless that it is impossible for me to sit still.", name: 'hps8', labels: HPS_scale },
	{ prompt: "I get so happy or energetic that I am almost giddy.", name: 'hps9', labels: HPS_scale },
	{ prompt: "I feel emotions with extreme intensity.", name: 'hps10', labels: HPS_scale },
	{ prompt: "I am considered to be kind of eccentric.", name: 'hps11', labels: HPS_scale },
	{ prompt: "When I feel very excited and happy, I almost always know the reason.", name: 'hps12', labels: HPS_scale }, // reverse
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
	stimulus: '<p style="font-size: 2.5rem">In the next short questionnaire, the instructions are:<br><br><br></p><p style="font-size: 2.2rem; line-height: 1.3; color: #000080"> ' + HPS_pretext + '</p><br><br><br><p style="font-size: 2.0rem"> Thank you for your continued attention and focus!</p><br><br><br>',
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



// MASQ Mood and Anxiety Symptom Questionnaire // Anhedonic depression subscale
// 
// reverse-coded items:  1, 9, 15, 19, 23, 25
// 
// ADDED 2 items:  HADS item 2 and item 6
var MASQ_scale = ["Not at all", "A little bit", "Moderately", "Quite a bit", "Extremely"];

var MASQ_7_qn = [
	{ prompt: "I felt really happy.", name: 'MASQ1', labels: MASQ_scale},
	{ prompt: "I felt withdrawn from other people.", name: 'MASQ5', labels: MASQ_scale},
	{ prompt: "I felt like I had a lot to look forward to.", name: 'MASQ9', labels: MASQ_scale},
	{ prompt: "I felt like nothing was very enjoyable.", name: 'MASQ11', labels: MASQ_scale}, // (including because we are not getting DASS)
	{ prompt: "I felt like I had a lot of interesting things to do.", name: 'MASQ15', labels: MASQ_scale},
	{ prompt: "I felt really lively, “up”.", name: 'MASQ19', labels: MASQ_scale},
	{ prompt: "I felt like I had a lot of energy.", name: 'MASQ23', labels: MASQ_scale},
	{ prompt: "I felt like I was having a lot of fun.", name: 'MASQ25', labels: MASQ_scale},
	{ prompt: "I feel as if I am slowed down.", name: 'HADS2', labels: MASQ_scale}, // HADS item 2!! //
	{ prompt: "I have lost interest in my appearance.", name: 'HADS6', labels: MASQ_scale}, // HADS item 6!! //
];

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
	stimulus: '<p style="font-size: 2.0rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 2.2rem; line-height: 1.3; color: #000080"> ' + MASQ_pretext + '</p><br><br><br><p style="font-size: 2.0rem"> Thank you for your continued attention and focus!</p><br><br><br>',
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
// reverse-coded items:  1, 3, 6, 7, 10, 13, 14, 16, 19
// 
// ADDED:  1 BDI question, 1 LOT-R question, 1 RRQ question
var STAI_scale = ["Almost never", "Sometimes", "Often", "Almost always"];

var STAI_qn = [
	{ prompt: "I feel pleasant.", name: 'STAI1', labels: STAI_scale},
	// { prompt: "I feel nervous and restless.", name: 'STAI2', labels: STAI_scale}, // excluding because GAD overlap: GAD item_1 + item_5 (average these scores)
	{ prompt: "I feel satisfied with myself.", name: 'STAI3', labels: STAI_scale},
	{ prompt: "I wish I could be as happy as others seem to be.", name: 'STAI4', labels: STAI_scale},
	// { prompt: "I feel like a failure.", name: 'STAI5', labels: STAI_scale}, // excluding because PHQ overlap:  PHQ item_6
	{ prompt: "I feel rested.", name: 'STAI6', labels: STAI_scale},
	{ prompt: "I am 'calm, cool, and collected'.", name: 'STAI7', labels: STAI_scale},
	{ prompt: "I feel that difficulties are piling up so that I cannot overcome them.", name: 'STAI8', labels: STAI_scale},
	{ prompt: "I worry too much over something that really does not matter.", name: 'STAI9', labels: STAI_scale},
	{ prompt: "I am happy.", name: 'STAI10', labels: STAI_scale},
	{ prompt: "I have disturbing thoughts.", name: 'STAI11', labels: STAI_scale},
	{ prompt: "I lack self-confidence.", name: 'STAI12', labels: STAI_scale},
	{ prompt: "I feel secure.", name: 'STAI13', labels: STAI_scale},
	{ prompt: "I make decisions easily.", name: 'STAI14', labels: STAI_scale},
	{ prompt: "I know the months of the year.", name: 'Catch', labels: STAI_scale}, // frequency item / catch item (feb 2024)
	{ prompt: "I feel inadequate.", name: 'STAI15', labels: STAI_scale},
	{ prompt: "I am content.", name: 'STAI16', labels: STAI_scale},
	{ prompt: "Some unimportant thought runs through my mind and bothers me.", name: 'STAI17', labels: STAI_scale},
	{ prompt: "I take disappointments so keenly that I can not put them out of my mind.", name: 'STAI18', labels: STAI_scale},
	{ prompt: "I am a steady person.", name: 'STAI19', labels: STAI_scale},
	{ prompt: "I get in a state of tension or turmoil as I think over my recent concerns and interests.", name: 'STAI20', labels: STAI_scale},
	{ prompt: "I do not feel particularly guilty.", name: 'BDI5', labels: STAI_scale}, // BDI questionnaire !! //
	{ prompt: "In uncertain times, I usually expect the best.", name: 'LOTR1', labels: STAI_scale}, // LOT-R questionnaire !! //
	{ prompt: "I tend to 'ruminate' or dwell over things that happen to me for a really long time afterward.", name: 'RRQ3', labels: STAI_scale}, // RRQ questionnaire !! //
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
	stimulus: '<p style="font-size: 2.0rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 2.2rem; line-height: 1.3; color: #000080"> ' + STAI_pretext + '</p><br><br><br><p style="font-size: 2.0rem"> Thank you for your continued attention and focus!</p><br><br><br>',
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
	num_answers: STAI_scale.length,
	randomize_question_order: false,
	on_finish: function () { saveTaskData_survey() }
};

var STAI_comb = {
	timeline: [STAI_pre, STAI]
}




// AES
// Apathy Evaluation Scale
//
// reverse-coded items:  all except 6, 10, 11 (1, 2, 3, 4, 5, 7, 8, 9, 12, 13, 14, 15, 16, 17, 18)
// 
// ADDED 1 item: FSS fatigue scale item 9 (oct 2023)
var AES_scale = ["Not at all characteristic", "Slightly characteristic", "Somewhat characteristic", "Very characteristic"];

var AES_qn = [
	{ prompt: "I am interested in things.", name: 'AES1', labels: AES_scale},
	{ prompt: "I get things done during the day.", name: 'AES2', labels: AES_scale},
	{ prompt: "Getting things started on my own is important to me.", name: 'AES3', labels: AES_scale},
	{ prompt: "I am interested in having new experiences.", name: 'AES4', labels: AES_scale},
	{ prompt: "I am interested in learning new things", name: 'AES5', labels: AES_scale},
	{ prompt: "I put little effort into anything.", name: 'AES6', labels: AES_scale},
	{ prompt: "I approach life with intensity.", name: 'AES7', labels: AES_scale},
	{ prompt: "Seeing a job through to the end is important to me.", name: 'AES8', labels: AES_scale},
	{ prompt: "I have been to the moon.", name: 'Catch', labels: AES_scale}, // infrequency item / catch item (updated Nov 24 2023)
	{ prompt: "I spend time doing things that interest me. ", name: 'AES9', labels: AES_scale},
	{ prompt: "Someone has to tell me what to do each day.", name: 'AES10', labels: AES_scale},
	{ prompt: "I am less concerned about my problems than I should be.", name: 'AES11', labels: AES_scale},
	{ prompt: "I have friends", name: 'AES12', labels: AES_scale},
	{ prompt: "Getting together with friends is important to me.", name: 'AES13', labels: AES_scale},
	{ prompt: "When something good happens, I get excited.", name: 'AES14', labels: AES_scale},
	{ prompt: "I have an accurate understanding of my problems.", name: 'AES15', labels: AES_scale},
	{ prompt: "Getting things done during the day is important to me.", name: 'AES16', labels: AES_scale},
	{ prompt: "I have initiative.", name: 'AES17', labels: AES_scale},
	{ prompt: "I have motivation.", name: 'AES18', labels: AES_scale},
	{ prompt: "Fatigue interferes with my work, family, or social life.", name: 'FSS9', labels: AES_scale}, // FSS fatigue scale item 9 !!
];

// AES separate source
var AES_pretext = ['For each question, choose the answer that best describes your' +
  								 'thoughts, feelings, and actions during the <b>past 4 weeks</b>.'];

var AES_PRE = {
	type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'AES',
		subjectID: subjectID
	},
	stimulus: '<p style="font-size: 2.0rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 2.2rem; line-height: 1.3; color: #000080"> ' + AES_pretext + '</p><br><br><br><p style="font-size: 2.0rem"> Thank you for your continued attention and focus!</p><br><br><br>',
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
// 
// reverse-coded items:  2, 5, 6, 11, 12, 14, 16, 17, 18, 20
// 
// includes original numbers [2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 17, 18, 20]
// 0-3 scale
// reverse-coded items based-on-survey-numbers:  1, 3, 4, 9, 10, 11, 12, 13, 14, 15
// 
// Problem:  original scale lowest option was 'a little'
// var SDS_scale_original = ["A little of the time", "Some of the time", "Good part of the time", "Most of the time"];
// Initial ADAPTED:  Add "none of the time" and drop "Good part of the time"
// reasoning:  all except the SDS (and STAI) include a "not at all", "none of the time", "did not apply to me at all", "completely untrue", "not at all" option:  PHQ-9, GAD-7, DASS, CESD, HADS, AES, AMI, MASQ, STICSA-T, PSWQ, MEDI, ...
// Support from ECDEU manual (Guy, 1976): "A revised version of the SDS that appears in the Early Clinical Drug Evaluation Program Unite (ECDEU) manual (Guy, 1976) ... adds a rating of 0 = none of the time
// var SDS_scale = ["None of the time", "A little of the time", "Some of the time", "Most of the time"];
// 
// Current ADAPTED:  Modified first option, from "A little of the time" to "Rarely or none fo the time", to accomplish above goal.  German SDS
var SDS_scale = ["Rarely or none of the time", "Some of the time", "Good part of the time", "Most of the time"];

var zung_qn = [
	// { prompt: "I feel down-hearted and blue.", name: 'SDS1', labels: SDS_scale}, // excluding because PHQ overlap: PHQ item_2
	{ prompt: "Morning is when I feel the best.", name: 'SDS2', labels: SDS_scale}, // reverse
	{ prompt: "I have crying spells or feel like it.", name: 'SDS3', labels: SDS_scale},
	// { prompt: "I have trouble sleeping at night.", name: 'SDS4', labels: SDS_scale}, // excluding because PHQ overlap: PHQ item_3
	{ prompt: "I eat as much as I used to.", name: 'SDS5', labels: SDS_scale}, // reverse
	{ prompt: "I still enjoy sex.", name: 'SDS6', labels: SDS_scale}, // reverse
	{ prompt: "I notice that I am losing weight.", name: 'SDS7', labels: SDS_scale},
	{ prompt: "I have trouble with constipation.", name: 'SDS8', labels: SDS_scale},
	{ prompt: "I engage in recollection about what I was doing one hundred years ago.", name: 'Catch', labels: SDS_scale}, // infrequency item / catch item (updated Nov 22 2023)
	{ prompt: "My heart beats faster than usual.", name: 'SDS9', labels: SDS_scale},
	{ prompt: "I get tired for no reason.", name: 'SDS10', labels: SDS_scale},
	{ prompt: "My mind is as clear as it used to be.", name: 'SDS11', labels: SDS_scale}, // reverse
	{ prompt: "I find it easy to do the things I used to.", name: 'SDS12', labels: SDS_scale}, // reverse
	// { prompt: "I am restless and can not keep still.", name: 'SDS13', labels: SDS_scale}, // excluding because GAD overlap: GAD item_5
	{ prompt: "I feel hopeful about the future.", name: 'SDS14', labels: SDS_scale}, // reverse
	// { prompt: "I am more irritable than usual.", name: 'SDS15', labels: SDS_scale}, // excluding because GAD overlap: GAD item_6
	{ prompt: "I find it easy to make decisions.", name: 'SDS16', labels: SDS_scale}, // reverse
	{ prompt: "I feel that I am useful and needed.", name: 'SDS17', labels: SDS_scale}, // reverse
	{ prompt: "My life is pretty full.", name: 'SDS18', labels: SDS_scale}, // reverse
	// { prompt: "I feel that others would be better off if I were dead.", name: 'SDS19', labels: SDS_scale}, // excluding because PHQ overlap: PHQ item_9
	{ prompt: "I still enjoy the things I used to do.", name: 'SDS20', labels: SDS_scale}, // reverse
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
	stimulus: '<p style="font-size: 2.0rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 2.2rem; line-height: 1.3; color: #000080"> ' + SDS_pretext + '</p><br><br><br><p style="font-size: 2.0rem"> Thank you for your continued attention and focus!</p><br><br><br>',
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
	num_answers: SDS_scale.length,
	randomize_question_order: false,
	on_finish: function () { saveTaskData_survey() }
};

var SDS_comb = {
  timeline: [SDS_pre, SDS]
}




// STICSA
// State-Trait Inventory of Cognitive and Somatic Anxiety – Somatic Anxiety
// 
// added description for 'butterflies' in item 20, given potential problems for non-native English speakers ("a nervous or fluttery feeling in my stomach")
// catch added Oct 2023
var STICSA_scale= ["Not at All", "A Little", "Moderately", "Very Much So"];

var STICSA_qn = [
	// { prompt: "My heart beats fast.", name: 'STICSA1', labels: STICSA_scale}, // excluding because SDS overlap:  SDS item_9
	{ prompt: "My muscles are tense.", name: 'STICSA2', labels: STICSA_scale},
	{ prompt: "I feel dizzy.", name: 'STICSA6', labels: STICSA_scale},
	{ prompt: "My muscles feel weak.", name: 'STICSA7', labels: STICSA_scale},
	{ prompt: "I feel trembly and shaky.", name: 'STICSA8', labels: STICSA_scale}, // (including because we are not getting DASS)
	{ prompt: "My face feels hot.", name: 'STICSA12', labels: STICSA_scale},
	{ prompt: "My arms and legs feel stiff.", name: 'STICSA14', labels: STICSA_scale},
	{ prompt: "I breathe every day.", name: 'Catch', labels: STICSA_scale}, // frequency item / catch item (Nov 24 2023)
	{ prompt: "My throat feels dry.", name: 'STICSA15', labels: STICSA_scale}, // (including because we are not getting DASS)
	{ prompt: "My breathing is fast and shallow.", name: 'STICSA18', labels: STICSA_scale}, // (including because we are not getting DASS)
	{ prompt: "I have butterflies in my stomach (a nervous or fluttery feeling in my stomach).", name: 'STICSA20', labels: STICSA_scale},
	{ prompt: "My palms feel clammy (damp).", name: 'STICSA21', labels: STICSA_scale},
];

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
	stimulus: '<p style="font-size: 2.0rem">' + survey_leadin + '<br><br><br></p><p style="font-size: 2.2rem; line-height: 1.3; color: #000080"> ' + STICSA_pretext + '</p><br><br><br><p style="font-size: 2.0rem"> Thank you for your continued attention and focus!</p><br><br><br>',
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
	num_answers: STICSA_scale.length,
	randomize_question_order: false,
	on_finish: function () { saveTaskData_survey() }
};

var STICSA_comb = {
  timeline: [STICSA_pre, STICSA]
}




// PVSS Positive Valence Systems Scale
// 
// returned to 9 options:  re-added "extremely" at ends
// var PVSS_scale = ["Extremely untrue of me", "Very untrue of me", "  Moderately untrue of me", "Slightly untrue of me",
//   "Neutral", "Slightly true of me", " Moderately true of me", " Very true of me", "Extremely true of me"];
var PVSS_scale = ["Extremely untrue of me", "Very", "  Moderately", "Slightly untrue of me",
  "Neutral", "Slightly true of me", " Moderately", " Very", "Extremely true of me"];

var PVSS_qn = [
	{ prompt: "I <u>savored</u> my first bite of food after feeling hungry.", name: 'PVSS1', labels: PVSS_scale},
	{ prompt: "I <u>put energy</u> into activities I enjoy.", name: 'PVSS2', labels: PVSS_scale},
	{ prompt: "I <u>was delighted</u> to catch a breath of fresh air outdoors.", name: 'PVSS3', labels: PVSS_scale},
	{ prompt: "I <u>wanted</u> to spend time with people I know.", name: 'PVSS4', labels: PVSS_scale},
	{ prompt: "A fun activity during the weekend sustained my good mood <u>throughout the new week</u>.", name: 'PVSS5', labels: PVSS_scale},
	{ prompt: "It <u>felt good</u> to have physical contact with someone I felt close to.", name: 'PVSS6', labels: PVSS_scale},
	{ prompt: "I <u>expected</u> to enjoy a brief moment outdoors.", name: 'PVSS7', labels: PVSS_scale},
	{ prompt: "I <u>looked forward</u> to hearing feedback on my work.", name: 'PVSS8', labels: PVSS_scale},
	{ prompt: "I know how to count to ten.", name: 'Catch', labels: PVSS_scale}, // frequency item / catch item (Nov 24 2023)
	{ prompt: "I <u>expected</u> to enjoy my meals.", name: 'PVSS9', labels: PVSS_scale},
	{ prompt: "Receiving praise about my work made me feel pleased <u>for the rest of the day</u>.", name: 'PVSS10', labels: PVSS_scale},
	{ prompt: "I <u>looked forward</u> to spending time with others.", name: 'PVSS11', labels: PVSS_scale},
	{ prompt: "I <u>wanted</u> to accomplish goals I set for myself.", name: 'PVSS12', labels: PVSS_scale},
	{ prompt: "I <u>expected</u> to enjoy being hugged by someone I love.", name: 'PVSS13', labels: PVSS_scale},
	{ prompt: "I <u>wanted</u> to participate in a fun activity with friends.", name: 'PVSS14', labels: PVSS_scale},
	{ prompt: "I <u>worked hard</u> to earn positive feedback on my projects.", name: 'PVSS15', labels: PVSS_scale},
	{ prompt: "I <u>looked forward</u> to an upcoming meal.", name: 'PVSS16', labels: PVSS_scale},
	{ prompt: "I <u>felt pleased</u> when I reached a goal I set for myself.", name: 'PVSS17', labels: PVSS_scale},
	{ prompt: "Getting a hug from someone close to me made me happy <u>even after</u> we parted.", name: 'PVSS18', labels: PVSS_scale},
	{ prompt: "I <u>expected</u> to master the tasks I undertook.", name: 'PVSS19', labels: PVSS_scale},
	{ prompt: "I <u>actively pursued</u> activities I thought would be fun.", name: 'PVSS20', labels: PVSS_scale},
	{ prompt: "I <u>went out of my way</u> to admire the beauty around me.", name: 'PVSS21', labels: PVSS_scale},
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
	stimulus: '<p style="font-size: 2.5rem">In the next short questionnaire, the instructions are:<br><br><br></p><p style="font-size: 2.2rem; line-height: 1.3; color: #000080"> ' + PVSS_pretext + '</p><br><br><br><p style="font-size: 2.0rem"> Thank you for your continued attention and focus!</p><br><br><br>',
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




// general intro and conclusion //
var survey_start = {
	type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'introduction',
		subjectID: subjectID
	},
	stimulus: '<p style="font-size: 3rem; line-height: 1.3">Great work!<br><br>The final part today involves the completion of several questionnaires.<br>There is a rest break half way through.</b><br><br><br>',
	choices: ['Continue'],
	button_html: ['<button class="lmdlab-btn">%choice%</button>'],
	on_finish: function () { saveTaskData_surveyintro() }
};

var survey_start_two = {
	type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'introduction',
		subjectID: subjectID
	},
	stimulus: '<p style="font-size: 3rem; line-height: 1.3">Please read the instructions for <b>each set of questions</b>,<br>and then <b>carefully</b> answer each question.<br><br><br>Please note that the <b>instructions and options change</b><br>for different questionnaries.<br><br><br><br><b>Thank you for doing your best!</b><br><br><br>',
	choices: ['Continue'],
	button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var survey_question = {
	type: 'lmdlab-survey-text',
	data: {
		exp_name: "survey",
		exp_stage: "feedback",
		subjectID: subjectID
	},
	required: questions_required,
	questions: [
		{ prompt: "<p style='font-size: 1.8rem; line-height: 1.3'> Some feedback would help! Did you find anything unclear or need to be improved in this part? <br><br> If so, please describe them briefly.</p><br><br><br>", rows: 6 },
	],
	on_finish: function () { saveTaskData_survey() }
};

var survey_resources = {
	type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'resources',
		subjectID: subjectID,
		databaseID: uid,
	},
	stimulus: '<p style="font-size: 2.0rem; line-height: 1.5">' +
  				'If you feel affected by the issues raised by these questions and<br>' +
				'wish to access any further support with regards to your mental<br>' +
				'health you can find more information on this website:<br><br>' +
				'https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/<br><br><br>' +
				'Should you wish to talk, any time of day or night, you can call<br>' +
				'116 123 to talk to the Samaritans you can also text "SHOUT"<br>' +
				'to 85258 to contact the Shout Crisis Text Line.<br><br><br><br></p>',
	choices: ['Continue'],
	button_html: ['<button class="lmdlab-btn">%choice%</button>'],
};

var survey_end = {
	type: 'html-button-response',
	data: {
		exp_name: 'survey',
		exp_stage: 'finish',
		subjectID: subjectID
	},
	stimulus: '<p style="font-size: 3rem">Thank you!  You have finished this part of the experiment!<br><br><br>',
	choices: ['Continue'],
	button_html: ['<button class="lmdlab-btn">%choice%</button>'],
	on_finish: function () { saveTaskData_survey() }
};


// randomize and add to timeline

// all the _comb items
var all_comb = [
	PHQ9_comb,
	GAD7_comb,
	MASQ_comb,
	STAI_comb,
	AES_comb,
	SDS_comb,
    HPS_comb,
	STICSA_comb,
    PVSS_comb
];


// shuffle the array
var shuffled_comb = jsPsych.randomization.shuffle(all_comb);

// split the shuffled array into two halves
var half_length = Math.ceil(shuffled_comb.length / 2); // We use Math.ceil() in case there is an odd number of items
var first_half = shuffled_comb.slice(0, half_length);
var second_half = shuffled_comb.slice(half_length);

// assign to timelines
var survey_rand1 = {
  timeline: first_half
}

var survey_rand2 = {
  timeline: second_half
}

// create final survey timeline //
var survey_final = {
	timeline: [
		survey_start,
		survey_start_two,
	    survey_rand1,
	    rest_trial,
	    survey_rand2,
		survey_question,
		survey_resources,
    	survey_end,
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