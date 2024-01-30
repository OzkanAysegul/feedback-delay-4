/**
 * jsPsych plugin for showing scenes that mimic the experiments described in
 *
 * Fiser, J., & Aslin, R. N. (2001). Unsupervised statistical learning of
 * higher-order spatial structures from visual scenes. Psychological science,
 * 12(6), 499-504.
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins['vsl-grid-scene-response'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('vsl-grid-scene', 'stimuli', 'image');

  plugin.info = {
    name: 'vsl-grid-scene',
    description: '',
    parameters: {
      stimuli: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimuli',
        array: true,
        default: undefined,
        description: 'An array that defines a grid.'
      },
      image_size: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image size',
        array: true,
        default: [100,100],
        description: 'Array specifying the width and height of the images to show.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: 500000,
        description: 'How long to show the stimulus for in milliseconds.'
      },

      text: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Text for image',
        default: '',
        description: 'The text that appears above the image?'
      },

      key_forward: {
        type: jsPsych.plugins.parameterType.KEY,
        pretty_name: 'Key forward',
        default: 'ArrowRight',
        description: 'The key the subject can press in order to advance to the next page.'
      },
      allow_keys: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Allow keys',
        default: true,
        description: 'If true, the subject can use keyboard keys to navigate the pages.'
      },
      show_clickable_nav: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Show clickable nav',
        default: true,
        description: 'If true, then a "Previous" and "Next" button will be displayed beneath the instructions.'
      },
      button_label_next: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label next',
        default: 'Next',
        description: 'The text that appears on the button to go forwards.'
      },

    }
  }

  plugin.trial = function(display_element, trial) {

    var start_time = performance.now();

    function btnListener(evt){
    	evt.target.removeEventListener('click', btnListener);
    	if(this.id === 'jspsych-instructions-next'){
    		endTrial();
    	}
    }

    display_element.innerHTML = plugin.generate_stimulus(trial.stimuli, trial.image_size);

		// add 'Continue' button below grid
// 		display_element.innerHTML = display_element.innerHTML + '<br><br><button id="jspsych-fullscreen-btn" class="jspsych-btn">Continue</button>';

		if (trial.show_clickable_nav) {

			var nav_html = "<div class='jspsych-instructions-nav' style='padding: 10px 0px;'>";

			nav_html += "<br><br><button id='jspsych-instructions-next' class='jspsych-btn'"+
					"style='margin-left: 5px;'>"+trial.button_label_next+
					" &gt;</button></div>";

			var text_html = "<div class='jspsych-vsl-grid-scene-label' style='padding: 10px 0px;'>";

			text_html += '<div id="jspsych-vsl-grid-scene-text" class="jspsych-vsl-grid-scene-text"><strong>'+trial.text+'</strong></div>';

			display_element.innerHTML = display_element.innerHTML + text_html + nav_html;

			display_element.querySelector('#jspsych-instructions-next').addEventListener('click', btnListener);
		}


    jsPsych.pluginAPI.setTimeout(function() {
      endTrial();
    }, trial.trial_duration);




    function endTrial() {

			if (trial.allow_keys) {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboard_listener);
      }

      display_element.innerHTML = '';

      var trial_data = {
        stimulus: trial.stimuli
      };

      jsPsych.finishTrial(trial_data);
    }


		var after_response = function(info) {

      // have to reinitialize this instead of letting it persist to prevent accidental skips of pages by holding down keys too long
      keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.key_forward],
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
      // check if key is forwards end
      if (jsPsych.pluginAPI.compareKeys(info.key, trial.key_forward)) {
        endTrial();
      }

    };

    if (trial.allow_keys) {
      var keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.key_forward],
        rt_method: 'performance',
        persist: false
      });
    }

  };


  plugin.generate_stimulus = function(pattern, image_size) {
    var nrows = pattern.length;
    var ncols = pattern[0].length;

    // create blank element to hold code that we generate
    var html = '<div id="jspsych-vsl-grid-scene-dummy" css="display: none;">';

    // create table
    html += '<table id="jspsych-vsl-grid-scene table" '+
      'style="border-collapse: collapse; margin-left: auto; margin-right: auto;">';

    for (var row = 0; row < nrows; row++) {
      html += '<tr id="jspsych-vsl-grid-scene-table-row-'+row+'" css="height: '+image_size[1]+'px;">';

      for (var col = 0; col < ncols; col++) {
        html += '<td id="jspsych-vsl-grid-scene-table-' + row + '-' + col +'" '+
          'style="padding: '+ (image_size[1] / 10) + 'px ' + (image_size[0] / 10) + 'px; border: 1px solid #555;">'+
          '<div id="jspsych-vsl-grid-scene-table-cell-' + row + '-' + col + '" style="width: '+image_size[0]+'px; height: '+image_size[1]+'px;">';
        if (pattern[row][col] !== 0) {
          html += '<img '+
            'src="'+pattern[row][col]+'" style="width: '+image_size[0]+'px; height: '+image_size[1]+'"></img>';
        }
        html += '</div>';
        html += '</td>';
      }
      html += '</tr>';
    }

    html += '</table>';
    html += '</div>';

    return html;

  };

  return plugin;
})();
