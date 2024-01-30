/**
 * jspsych-html-button-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a button response
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins["lmdlab-rest-trial-limit"] = (function() {

	var plugin = {};

	plugin.info = {
		name: 'lmdlab-rest-trial',
		description: '',
		parameters: {
			stimulus: {
				type: jsPsych.plugins.parameterType.HTML_STRING,
				pretty_name: 'Stimulus',
				default: undefined,
				description: 'The HTML string to be displayed'
			},
			choices: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Choices',
				default: undefined,
				array: true,
				description: 'The labels for the buttons.'
			},
			button_html: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Button HTML',
				default: '<button class="lmdlab-btn-dark">%choice%</button>',
				array: true,
				description: 'The html of the button. Can create own style.'
			},
			prompt: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Prompt',
				default: null,
				description: 'Any content here will be displayed under the button.'
			},
			stimulus_duration: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'Stimulus duration',
				default: null,
				description: 'How long to hide the stimulus.'
			},
			trial_duration: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: 'Trial duration',
		        default: 300000, // 300,000 = 5 min
        		description: 'How long to show the trial.'
		      },
			margin_vertical: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Margin vertical',
				default: '0px',
				description: 'The vertical margin of the button.'
			},
			margin_horizontal: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Margin horizontal',
				default: '8px',
				description: 'The horizontal margin of the button.'
			},
			response_ends_trial: {
				type: jsPsych.plugins.parameterType.BOOL,
				pretty_name: 'Response ends trial',
				default: true,
				description: 'If true, then trial will end when user responds.'
			},
			backcolor_darker: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: 'Background color input',
				default: '#5d5d5d',
				description: "Dark background for rest screen"
			},
			pre_iti: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: "Pre-stimulus duration",
				default: 500
			},
			post_iti: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: "Post-stimulus duration",
				default: 500
			},
		}
	}


	plugin.trial = function(display_element, trial) {

		let backcolor_start = document.querySelector('body').style.backgroundColor;

		// store response
		let response = {
			rt: null,
			button: null
		};

		let rest_warning = 0;

		// start time
		let start_time = performance.now();

		// CURRENT main event
		// (just to get things running in separate functions)
		jsPsych.pluginAPI.setTimeout(function() {

			display_state();

		}, trial.pre_iti); // this is where the ITI goes


		// display stimulus
		let display_state = function(){

			document.querySelector('body').style.backgroundColor = trial.backcolor_darker;

			// var html = '<div> <p style="color:white;">'+trial.stimulus+'</p></div>';
			var html = '<div  id="jspsych-html-button-response-stimulus">'+trial.stimulus+'</div>';
			//display buttons
			var buttons = [];
			if (Array.isArray(trial.button_html)) {
			if (trial.button_html.length == trial.choices.length) {
				buttons = trial.button_html;
			} else {
				console.error('Error in html-button-response plugin. The length of the button_html array does not equal the length of the choices array');
			}
			} else {
				for (var i = 0; i < trial.choices.length; i++) {
					buttons.push(trial.button_html);
				}
			}
			html += '<div id="jspsych-html-button-response-btngroup">';
			for (var i = 0; i < trial.choices.length; i++) {
				var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
				html += '<div class="jspsych-html-button-response-button" style="display: inline-block; margin:'+trial.margin_vertical+' '+trial.margin_horizontal+'" id="jspsych-html-button-response-button-' + i +'" data-choice="'+i+'">'+str+'</div>';
			}
			html += '</div>';

			// show prompt if there is one
			if (trial.prompt !== null) {
				html += trial.prompt;
			}

			display_element.innerHTML = html;

			// add event listeners to buttons
			for (var i = 0; i < trial.choices.length; i++) {
				display_element.querySelector('#jspsych-html-button-response-button-' + i).addEventListener('click', function(e){
					var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
					after_response(choice);
				});
			}

			// not used: hide image if timing is set
			if (trial.stimulus_duration !== null) {
				jsPsych.pluginAPI.setTimeout(function() {
					display_element.querySelector('#jspsych-html-button-response-stimulus').style.visibility = 'hidden';
				}, trial.stimulus_duration);
			}

			// show warning if rest duration is set
			if (trial.trial_duration !== null) {

				jsPsych.pluginAPI.setTimeout(function() {
					display_warning();
				}, trial.trial_duration);
			}
		}


		// function to handle responses by the subject
		function display_warning() {

			rest_warning = 1;

			document.querySelector('body').style.backgroundColor = 'purple';

			let warning_text = "<p style='font-size: 5rem; color: white;'>Please limit rest breaks to just a minute,<br><br>or a few minutes at most.<br><br><br><br>This is important to ensure similar experience<br><br>across all participants.<br><br><br><br>Thank you!</p><br><br><br><br>";

			var html = '<div  id="jspsych-html-button-response-stimulus">' + warning_text + '</div>';

			//display buttons
			var buttons = [];
			if (Array.isArray(trial.button_html)) {
				if (trial.button_html.length == trial.choices.length) {
					buttons = trial.button_html;
				} else {
					console.error('Error in html-button-response plugin. The length of the button_html array does not equal the length of the choices array');
				}
			} else {
				for (var i = 0; i < trial.choices.length; i++) {
					buttons.push(trial.button_html);
				}
			}
			html += '<div id="jspsych-html-button-response-btngroup">';
			for (var i = 0; i < trial.choices.length; i++) {
				var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
				html += '<div class="jspsych-html-button-response-button" style="display: inline-block; margin:'+trial.margin_vertical+' '+trial.margin_horizontal+'" id="jspsych-html-button-response-button-' + i +'" data-choice="'+i+'">'+str+'</div>';
			}
			html += '</div>';

			// show prompt if there is one
			if (trial.prompt !== null) {
				html += trial.prompt;
			}

			display_element.innerHTML = html;

			// add event listeners to buttons
			for (var i = 0; i < trial.choices.length; i++) {
				display_element.querySelector('#jspsych-html-button-response-button-' + i).addEventListener('click', function(e){
					var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
					after_response(choice);
				});
			}

			if (trial.response_ends_trial) {
				after_response(choice);
			}
		};



		// function to handle responses by the subject
		function after_response(choice) {

			// measure rt
			var end_time = performance.now();
			var rt = end_time - start_time;
			response.button = parseInt(choice);
			response.rt = rt;

			// after a valid response, the stimulus will have the CSS class 'responded'
			// which can be used to provide visual feedback that a response was recorded
			display_element.querySelector('#jspsych-html-button-response-stimulus').className += ' responded';

			// disable all the buttons after a response
			var btns = document.querySelectorAll('.jspsych-html-button-response-button button');
			for(var i=0; i<btns.length; i++){
				//btns[i].removeEventListener('click');
				btns[i].setAttribute('disabled', 'disabled');
			}

			if (trial.response_ends_trial) {
				display_post_iti();
			}
		};


		// show post-iti if desired
		let display_post_iti = function(){

			// clear display
			display_element.innerHTML = '';

			// KEEP background setting to allow for ITI after break
			document.querySelector('body').style.backgroundColor = backcolor_start;

			// call transition after some iti/isi
			jsPsych.pluginAPI.setTimeout(function() {
				end_trial();
			}, trial.post_iti);
		} // end transition function


		// function to end trial when it is time
		function end_trial() {

			// kill any remaining setTimeout handlers
			jsPsych.pluginAPI.clearAllTimeouts();

			// gather the data to store for the trial
			var trial_data = {
				rt: response.rt,
				stimulus: trial.stimulus,
				response: response.button,
				rest_warning: rest_warning,
			};

			// clear the display
			display_element.innerHTML = '';
			// move on to the next trial
			jsPsych.finishTrial(trial_data);
		};


	};

	return plugin;
})();
