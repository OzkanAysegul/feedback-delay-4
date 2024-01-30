// adapted from jspsych-html-vas-response
// 
// https://psyarxiv.com/avj92/
// 
// https://kinleyid.github.io/rsrch/html-vas-response/
// 
// GE Wimmer 2023


jsPsych.plugins["option-scale-rating"] = (function() {
	// the name above is how we'll reference this

	var plugin = {};

	plugin.info = {
		// the name here should be the same
		name: "option-scale-rating",
		parameters: {
			// these are parameters that the plug_in takes in...
			// block_number: { //
			//   type: jsPsych.plugins.parameterType.INT,
			//   default: undefined
			// },
			// trial_number: { //
			//   type: jsPsych.plugins.parameterType.INT,
			//   default: undefined
			// },
			stimulus: { //
			  type: jsPsych.plugins.parameterType.INT,
			  default: undefined
			},
			text: {
				type: jsPsych.plugins.parameterType.HTML_STRING,
				pretty_name: "Stimulus",
				default: undefined,
			},
			value_true: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: "true max value of stim",
				default: null
			},
			prob_true: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: "true probability of max of stim",
				default: null
			},
			labels: {
				type: jsPsych.plugins.parameterType.HTML_STRING,
				pretty_name: "Labels",
				default: [],
				array: true,
			},
			ticks: {
				type: jsPsych.plugins.parameterType.BOOL,
				pretty_name: "Ticks",
				default: false,
			},
			scale_width: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: "VAS width",
				default: 40
			},
			scale_height: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: "VAS height",
				default: 60
			},
			scale_colour: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: "Scale colour",
				default: 'gray'
			},
			scale_cursor: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: "Scale cursor",
				default: 'pointer'
			},
			marker_colour: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: "Marker colour",
				default: 'rgba(0, 0, 0, 0.5)'
			},
			tick_colour: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: "tick colour",
				default: 'gray'
			},
			line_height: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: "VAS line height",
				default: 10
			},
			header_size: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: "header font size",
				default: '2.8rem'
			},
			label_size: {
				type: jsPsych.plugins.parameterType.STRING,
				pretty_name: "label font size",
				default: '2.2rem'
			},
			prompt: {
				type: jsPsych.plugins.parameterType.HTML_STRING,
				pretty_name: "Prompt",
				default: null
			},
			button_label: {
				type: jsPsych.plugins.parameterType.HTML_STRING,
				pretty_name: "Buton label",
				default: 'Continue'
			},
			required: {
				type: jsPsych.plugins.parameterType.BOOL,
				pretty_name: "Response required",
				default: true
			},
			pre_iti: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: "Pre-stimulus duration",
				default: 1000
			},
			stimulus_duration: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: "Stimulus duration",
				default: null
			},
			trial_duration: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: "Trial duration",
				default: null
			},
			response_ends_trial: {
				type: jsPsych.plugins.parameterType.BOOL,
				pretty_name: "Response ends trial",
				default: true
			},
			clear_html: {
				type: jsPsych.plugins.parameterType.INT,
				pretty_name: "Clears screen: allows for same-image trial pairs if set = 0",
				default: 1
			},
		}
	}

	plugin.trial = function(display_element, trial) {


		let stim_image = "images/" + "choice_trial_" + trial.stimulus + ".png";


		let parentDiv = document.body;
		let w = parentDiv.clientWidth;
		console.log("w:", w)
		let h = parentDiv.clientHeight;

		let imageSize = w/5;

		let response = {
			rt: null,
			response: null,
		};

		// SET PRE-ITI
		jsPsych.pluginAPI.setTimeout(function() {
			display_scale();
		}, trial.pre_iti); // this is where the ITI goes


		// do everything else
		let display_scale = function(){


			// place start and goal images here, and roadblock/shortcut if present
			var html = '<div></div>';	

			// html += '<div class="startImage"><img src=' + stim_image + ' style="width:' + imageSize + 'px;height:' + imageSize + 'px;"></div>';
			html += '<div class="startImage" style="margin-top: 280px;"><img src=' + stim_image + ' style="width:' + imageSize + 'px;height:' + imageSize + 'px;"></div>';


			// half of the thumb width value from jspsych.css, used to adjust the label positions
			var half_thumb_width = 7.5;
// 				html += '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>';
			// html += '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>';
			html += '<div id="jspsych-html-vas-response-wrapper" style="margin: 30px 0px;">';
			// html += '<br><br><br>';
			html += '<div id="jspsych-html-vas-response-stimulus" style="font-size: ' + trial.header_size + ';">' + '<br>' + trial.text + "</div><br><br><br>";
			html +=
				'<div class="jspsych-html-vas-response-container" style="position:relative; margin: 0 auto 3em auto;';
			if (trial.scale_width !== null) {
				html += "width:" + trial.scale_width + "vh;";
			} else {
				html += "width:40vh;";
			}
			html += '">';
			// Create clickable container for VAS
			html += '<div id="jspsych-html-vas-response-vas" style="position: relative; left: 0px; top: 0px; height: ' + trial.scale_height + 'px; width: 100%; ' +
				'cursor: ' + trial.scale_cursor + ';">';
			// Draw horizontal line in VAS container
			html += '<div style="position: relative; background: ' + trial.scale_colour + '; width: 100%; height: ' + trial.line_height + 'px; top: ' + ((trial.scale_height/2) - (trial.line_height/2)) + 'px"></div>'
		
			// Draw vertical line, but hide it at first
			html += '<div id="jspsych-html-vas-response-vline" style="visibility: hidden; position: absolute; left: 0px; background-color: ' + trial.marker_colour + '; height: ' + trial.scale_height + 'px; width: 2px; top: 0px"></div>'
			html += "</div>";
			html += "<div>";
			for (var j = 0; j < trial.labels.length; j++) {
				var label_width_perc = 100 / (trial.labels.length - 1);
				var percent_of_range = j * (100 / (trial.labels.length - 1));
				var percent_dist_from_center = ((percent_of_range - 50) / 50) * 100;
				var offset = (percent_dist_from_center * half_thumb_width) / 100;
				html +=
					'<div style="border: 1px solid transparent; display: inline-block; position: absolute; ' +
					"left:calc(" +
					percent_of_range +
					"% - (" +
					label_width_perc +
					"% / 2) - " +
					offset +
					"px); text-align: center; width: " +
					label_width_perc +
					'%;">';
				html += '<span style="text-align: center; font-size: ' + trial.label_size + ';">' + trial.labels[j] + "</span>";
				html += "</div>";
			}
			html += "</div>";
			html += "</div>";
			html += "</div>";

			if (trial.prompt !== null) {
				html += trial.prompt;
			}
			html += '<br><br>';
			// Submit button
			html +=
				'	<button id="jspsych-html-vas-response-next" class="lmdlab-btn" ' +
				(trial.required ? "disabled" : "") +
				">" +
				trial.button_label +
				"</button>";

			display_element.innerHTML = html;

			let vas = document.getElementById('jspsych-html-vas-response-vas');
			// Add minor ticks
			for (var j = 0; j < trial.labels.length; j++) {
				var label_width_pct = 100 / (trial.labels.length - 1);
				var pct_of_range = j * (100 / (trial.labels.length - 1));
				var mtick = document.createElement('div');
				mtick.style.position = 'absolute';
				mtick.style.height = (trial.scale_height/2) + 'px';
				mtick.style.width = '2px';
				mtick.style.top = (trial.scale_height/4) + 'px';
				mtick.style.background = trial.tick_colour;
				mtick.style.left = (pct_of_range/100 * vas.clientWidth - 1) + 'px';
				vas.appendChild(mtick);
			}

			// Function to move vertical tick
			let pct_tick = null;
			let vas_enabled = true;
			vas.onclick = function(e) {
				if (!vas_enabled) {
					return;
				}
				var vas = document.getElementById('jspsych-html-vas-response-vas');
				var vas_rect = vas.getBoundingClientRect();
				if (e.clientX <= vas_rect.right && e.clientX >= vas_rect.left) {
					var element = vas;
					var vline = document.getElementById('jspsych-html-vas-response-vline');
					var cx = Math.round(e.clientX);
					vline.style.left = (e.clientX - vas_rect.left - 1) + 'px';
					vline.style.visibility = 'visible';
					console.log(pct_tick);
					pct_tick = (e.clientX - vas_rect.left) / vas_rect.width;
					console.log(pct_tick);
					vas.appendChild(vline);
					var continue_button = document.getElementById('jspsych-html-vas-response-next');
					continue_button.disabled = false;
				}
			}

			let continue_button = document.getElementById('jspsych-html-vas-response-next');
			continue_button.onclick = function() {
				// measure response time
				var endTime = performance.now();
				response.rt = Math.round(endTime - startTime);
				response.response = pct_tick;
				if (trial.response_ends_trial) {
					end_trial();
				} else {
					vas_enabled = false;
				}
			}

			// hide stimulus if stimulus_duration is set
			if (trial.stimulus_duration !== null) {
				jsPsych.pluginAPI.setTimeout(function() {
					var stim = document.getElementById('jspsych-html-vas-response-stimulus');
					stim.style.visibility = 'hidden';
				}, trial.stimulus_duration);
			}

			// end trial if trial_duration is set
			if (trial.trial_duration !== null) {
				jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
			}

			let startTime = performance.now();

		}; // end display_scale



		function end_trial() {

			// kill any remaining setTimeout handlers
			jsPsych.pluginAPI.clearAllTimeouts();

			// save data
			let trialdata = {
      			// block_curr: trial.block_number,
		      	// trial_curr: trial.trial_number,
				value_true: trial.prob_true,
				rt: response.rt,
				stimulus: trial.stimulus,
				text: trial.text,
				response: response.response,
				// ideally save to store whether fullscreen or not when game played
				userinteract: interaction,
				subjectID: subjectID
			};

			if (trial.clear_html==1) {
				display_element.innerHTML = '';
			} else {
				display_element.innerHTML = '<div class="startImage"><img src=' + stim_image + ' style="width:' + imageSize + 'px;height:' + imageSize + 'px;"></div>';
			}

			// next trial
			jsPsych.finishTrial(trialdata);
		}; // end end_trial


	}; // end plugin.trial

  return plugin;
})();