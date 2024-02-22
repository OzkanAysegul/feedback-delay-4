/**
 * lmdlab-survey-likert
 * a jspsych plugin for measuring items on a likert scale
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 * adapted by Elliott Wimmer and Shiyi Liang 2023
 * 
 */

jsPsych.plugins['lmdlab-survey-likert'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'lmdlab-survey-likert',
    description: '',
    parameters: {
      questions: {
        type: jsPsych.plugins.parameterType.COMPLEX,
        array: true,
        pretty_name: 'Questions',
        nested: {
          prompt: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Prompt',
            default: undefined,
            description: 'Questions that are associated with the slider.'
          },
          labels: {
            type: jsPsych.plugins.parameterType.STRING,
            array: true,
            pretty_name: 'Labels',
            default: undefined,
            description: 'Labels to display for individual question.'
          },
          name: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Question Name',
            default: '',
            description: 'Controls the name of data values associated with this question'
          }
        }
      },
			required: {
				type: jsPsych.plugins.parameterType.BOOL,
				pretty_name: 'Required',
				default: false,
				description: 'ALL questions required or not.'
			},
      randomize_question_order: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Randomize Question Order',
        default: false,
        description: 'If true, the order of the questions will be randomized'
      },
      preamble: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Preamble',
        default: null,
        description: 'String to display at top of the page.'
      },
      scale_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Scale width',
        default: null,
        description: 'Width of the likert scales in pixels.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'Label of the button.'
      },
      autocomplete: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Allow autocomplete',
        default: false,
        description: "Setting this to true will enable browser auto-complete or auto-fill for the form."
      },
      num_answers: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Number of answers',
        default: 5,
        description: "Number of answer options"
    	},
      background_color: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Background color',
        default: 'WhiteSmoke', // 'LightGray'
        description: "Background color"
    	},
			post_response_delay: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'blank iti',
				default: 1000,
				description: ''
			}
    }
  }

  plugin.trial = function(display_element, trial) {

    var startTime = performance.now();

    var response = {
      rt: null,
      response: null,
    };

    var question_data = {};

    if(trial.scale_width !== null){
      var w = trial.scale_width + 'px';
    } else {
      var w = '100%'; //100%
    }

    // yz meaning:
    // "y" is how left the black bar is 
    // "z" is how long the black bar is
    if(trial.num_answers>7){ // this is developed based on num_answer = 11
      var y = '5.6%'; // 8%
      var z = '90%'; // 85%
		} else if(trial.num_answers==7){
      var y = '7.5%'; // 8%
      var z = '85%'; // 85%
		} else if (trial.num_answers==6){
			var y = '9%';
      var z = '83%'
    } else if (trial.num_answers==4) { // num_answers 4 or 5
      var y = '11.35%'; // 11.25
      var z = '77.4%'; // 77.5
    } else if (trial.num_answers==5) { // num_answers 4 or 5
      var y = '11.25%'; // 11.25
      var z = '77.7%'; // 77.5
    }

    var html = "";
    // inject CSS for trial
    html += '<style id="jspsych-survey-likert-css">';

//     html += ".jspsych-survey-likert-statement { display:block; font-size: 16px; padding-top: 40px; margin-bottom:10px; }"+
//       ".jspsych-survey-likert-opts { list-style:none; width:"+w+"; margin:auto; padding:0 0 35px; display:block; font-size: 14px; line-height:1.1em; }"+
//       ".jspsych-survey-likert-opt-label { line-height: 1.1em; color: #444; }"+
//       ".jspsych-survey-likert-opts:before { content: ''; position:relative; top:11px; /*left:9.5%;*/ display:block; background-color:#efefef; height:4px; width:100%; }"+
//       ".jspsych-survey-likert-opts:last-of-type { border-bottom: 0; }"+
//       ".jspsych-survey-likert-opts li { display:inline-block; /*width:19%;*/ text-align:center; vertical-align: top; }"+
//       ".jspsych-survey-likert-opts li input[type=radio] { display:block; position:relative; top:0; left:50%; margin-left:-6px; }"
//     html += '</style>';
// left:gray_bar*11.25%


		// bar color is set as background-color:#888888; previously was #efefef
    html += ".jspsych-survey-likert-statement { display:block; font-size: 20; padding-top: 80px; margin-bottom:20px; }"+
      ".jspsych-survey-likert-opts { list-style:none; width:"+w+"; margin:auto; padding:0 0 100px; display:block; font-size: 18px; line-height:1.1em; }"+
      ".jspsych-survey-likert-opt-label { line-height: 1.1em; color: #444; }"+
      ".jspsych-survey-likert-opts:before { content: ''; position:relative; top:13px; left:"+y+"; display:block; background-color:#888888; height:4px; width:"+z+"; }"+
      ".jspsych-survey-likert-opts:last-of-type { border-bottom: 0; }"+
      ".jspsych-survey-likert-opts li { display:inline-block; /*width:19%;*/ text-align:center; vertical-align: top; }"+
      ".jspsych-survey-likert-opts li input[type=radio] { display:block; position:relative; top:0; left:50%; margin-left:-6px; background-color:#000000 }"
    html += '</style>';

//       ".jspsych-survey-likert-opts:before { content: ''; position:relative; top:13px; left:11.25%; display:block; background-color:#efefef; height:4px; width:77.5%; }"+

    // show preamble text
    if(trial.preamble !== null){
      html += '<div id="jspsych-survey-likert-preamble" class="jspsych-survey-likert-preamble"><br><br><br><div class="limit_word_heading">  '+trial.preamble+'</div></div>';
    }

    if ( trial.autocomplete ) {
      html += '<form id="jspsych-survey-likert-form">';
    } else {
      html += '<form id="jspsych-survey-likert-form" autocomplete="off">';
    }

    // add likert scale questions ///
    // generate question order. this is randomized here as opposed to randomizing the order of trial.questions
    // so that the data are always associated with the same question regardless of order
    var question_order = [];
    for(var i=0; i<trial.questions.length; i++){
      question_order.push(i);
    }
    if(trial.randomize_question_order){
      question_order = jsPsych.randomization.shuffle(question_order);
    }
    
    for (var i = 0; i < trial.questions.length; i++) {
      var question = trial.questions[question_order[i]];
			if (trial.required){
				question.required = true;
			} else{
				question.required = false;
			}
      // add question
      html += '<div class="jspsych-survey-likert-statement">' + question.prompt + '</div>';
      // add options
      var width = 100 / question.labels.length;
      var options_string = '<ul class="jspsych-survey-likert-opts" data-name="'+question.name+'" data-radio-group="Q' + question_order[i] + '">';
      for (var j = 0; j < question.labels.length; j++) {
        options_string += '<li style="width:' + width + '%"><label class="jspsych-survey-likert-opt-label"><input type="radio" name="Q' + question_order[i] + '" value="' + j + '"';
        if(question.required){
          options_string += ' required';
        }
        options_string += '><br><div class="limit_word">' + question.labels[j] + '</div></label></li>'; // added <br>
      }

			// css on word limit//
			//notation here: the "limit_word" defines how long each option is before wraping it into another line. If need to change, name it a different class before adding to Imdlab-style-Likert.css

      options_string += '</ul>	&nbsp;	&nbsp;	&nbsp;';
      html += options_string;
    }

    // add submit button
    html += '<input type="submit" id="jspsych-survey-likert-next" class="jspsych-survey-likert lmdlab-btn-dark" value="'+trial.button_label+'"><br><br><br></input>';

    html += '</form>'

    display_element.innerHTML = html;

    display_element.querySelector('#jspsych-survey-likert-form').addEventListener('submit', function(e){
      e.preventDefault();
      // measure response time
      var endTime = performance.now();
      var response_time = endTime - startTime;

      // create object to hold responses
      var matches = display_element.querySelectorAll('#jspsych-survey-likert-form .jspsych-survey-likert-opts');
      for(var index = 0; index < matches.length; index++){
        var id = matches[index].dataset['radioGroup'];
        var el = display_element.querySelector('input[name="' + id + '"]:checked');
        if (el === null) {
          var response = "";
        } else {
          var response = parseInt(el.value);
        }
        var obje = {};
        if(matches[index].attributes['data-name'].value !== ''){
          var name = matches[index].attributes['data-name'].value;
        } else {
          var name = id;
        }
        obje[name] = response;
        Object.assign(question_data, obje);
      }
      response.rt = response_time;

      handle_response();
    });

		function handle_response(){

			display_element.innerHTML = '';

			jsPsych.pluginAPI.setTimeout(function () {
				end_trial();//fill this place with function to call for object needed to appear after the delay
			}, trial.post_response_delay);
		}

		function end_trial(){

      var trial_data = {
        rt: response.rt,
        response: question_data,
        question_order: question_order,
        subjectID: subjectID
      };

      // next trial
			jsPsych.finishTrial(trial_data);
    };

  }; // end plugin

  return plugin;
})();
