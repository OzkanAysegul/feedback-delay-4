/**
 * jspsych-image-slider-response-modified
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins['image-slider-response-modified-2'] = (function () {

    var plugin = {};

    jsPsych.pluginAPI.registerPreload('image-slider-response', 'stimulus', 'image');

    plugin.info = {
        name: 'image-slider-response-modified-2',
        description: '',
        parameters: {
            stimulus: {
                type: jsPsych.plugins.parameterType.IMAGE,
                pretty_name: 'Stimulus',
                default: undefined,
                description: 'The image to be displayed'
            },
            stimulus_height: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Image height',
                default: null,
                description: 'Set the image height in pixels'
            },
            stimulus_width: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Image width',
                default: null,
                description: 'Set the image width in pixels'
            },
            maintain_aspect_ratio: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Maintain aspect ratio',
                default: true,
                description: 'Maintain the aspect ratio after setting width or height'
            },
            min: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Min slider',
                default: 0,
                description: 'Sets the minimum value of the slider.'
            },
            max: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Max slider',
                default: 100,
                description: 'Sets the maximum value of the slider',
            },
            slider_start: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Slider starting value',
                default: 50,
                description: 'Sets the starting value of the slider',
            },
            step: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Step',
                default: 1,
                description: 'Sets the step of the slider'
            },
            labels: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Labels',
                default: [],
                array: true,
                description: 'Labels of the slider.',
            },
            slider_width: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Slider width',
                default: 600,
                description: 'Width of the slider in pixels.'
            },
            button_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Button label',
                default: 'Continue',
                array: false,
                description: 'Label of the button to advance.'
            },
            require_movement: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Require movement',
                default: false,
                description: 'If true, the participant will have to move the slider before continuing.'
            },
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prompt',
                default: null,
                description: 'Any content here will be displayed below the slider.'
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
                default: null,
                description: 'How long to show the trial.'
            },
            response_ends_trial: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Response ends trial',
                default: true,
                description: 'If true, trial will end when user makes a response.'
            },
            render_on_canvas: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Render on canvas',
                default: true,
                description: 'If true, the image will be drawn onto a canvas element (prevents blank screen between consecutive images in some browsers).' +
                    'If false, the image will be shown via an img element.'
            }
        }
    };

    plugin.trial = function (display_element, trial) {

        var height, width;
        var html;
        var half_thumb_width = 7.5;

        if (trial.render_on_canvas) {
            var image_drawn = false;

            if (display_element.hasChildNodes()) {
                while (display_element.firstChild) {
                    display_element.removeChild(display_element.firstChild);
                }
            }

            var content_wrapper = document.createElement('div');
            content_wrapper.id = "jspsych-image-slider-response-wrapper";
            content_wrapper.style.margin = "100px 0px";

            // Create canvas element for the first image
            var canvas1 = document.createElement("canvas");
            canvas1.id = "jspsych-image-slider-response-stimulus1";
            canvas1.style.margin = 0;
            canvas1.style.padding = 0;
            var ctx1 = canvas1.getContext("2d");
            var img1 = new Image();
            img1.onload = function () {
                if (!image_drawn) {
                    getHeightWidth1();
                    ctx1.drawImage(img1, 0, 0, width, height);
                }
            };
            img1.src = trial.stimulus[0];

            function getHeightWidth1() {
                if (trial.stimulus_height !== null) {
                    height = trial.stimulus_height;
                    if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
                        width = img1.naturalWidth * (trial.stimulus_height / img1.naturalHeight);
                    }
                } else {
                    height = img1.naturalHeight;
                }
                if (trial.stimulus_width !== null) {
                    width = trial.stimulus_width;
                    if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
                        height = img1.naturalHeight * (trial.stimulus_width / img1.naturalWidth);
                    }
                } else if (!(trial.stimulus_height !== null & trial.maintain_aspect_ratio)) {
                    width = img1.naturalWidth;
                }
                canvas1.height = height;
                canvas1.width = width;
            }
            getHeightWidth1();

            // Create canvas element for the second image
            var canvas2 = document.createElement("canvas");
            canvas2.id = "jspsych-image-slider-response-stimulus2";
            canvas2.style.margin = 0;
            canvas2.style.padding = 0;
            var ctx2 = canvas2.getContext("2d");
            var img2 = new Image();
            img2.onload = function () {
                if (!image_drawn) {
                    getHeightWidth2();
                    ctx2.drawImage(img2, 0, 0, width, height);
                }
            };
            img2.src = trial.stimulus[1];

            function getHeightWidth2() {
                if (trial.stimulus_height !== null) {
                    height = trial.stimulus_height;
                    if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
                        width = img2.naturalWidth * (trial.stimulus_height / img2.naturalHeight);
                    }
                } else {
                    height = img2.naturalHeight;
                }
                if (trial.stimulus_width !== null) {
                    width = trial.stimulus_width;
                    if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
                        height = img2.naturalHeight * (trial.stimulus_width / img2.naturalWidth);
                    }
                } else if (!(trial.stimulus_height !== null & trial.maintain_aspect_ratio)) {
                    width = img2.naturalWidth;
                }
                canvas2.height = height;
                canvas2.width = width;
            }
            getHeightWidth2();

            // Add both canvas elements to content wrapper
            content_wrapper.insertBefore(canvas1, content_wrapper.firstElementChild);
            content_wrapper.insertBefore(canvas2, canvas1.nextElementSibling);

            // Create container with sliders and labels
            var slider_container = document.createElement('div');
            slider_container.classList.add("jspsych-image-slider-response-container");
            slider_container.style.position = "relative";
            slider_container.style.margin = "40px auto 3em auto";
            if (trial.slider_width !== null) {
                slider_container.style.width = 600 + 'px';
            }

            // Create HTML string with sliders and labels, and add to slider container
            html = '<div><div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; margin-top: 20px;">';
            html += '<input type="range" class="jspsych-slider" value="' + trial.slider_start + '" min="' + trial.min + '" max="' + trial.max + '" step="' + trial.step + '" id="jspsych-image-slider-response-response1" style="width: 48%;">';
            html += '<input type="range" class="jspsych-slider" value="' + trial.slider_start + '" min="' + trial.min + '" max="' + trial.max + '" step="' + trial.step + '" id="jspsych-image-slider-response-response2" style="width: 48%;">';
            html += '</div>';

            // Create labels for both sliders
            html += '<div style="display: flex; justify-content: space-between; margin-top: 10px;">';
            html += '<div style="text-align: center; width: 48%;"><span style="text-align: center; font-size: 120%;">' + trial.labels[0] + '</span></div>';
            html += '<div style="text-align: center; width: 48%;"><span style="text-align: center; font-size: 120%;">' + trial.labels[1] + '</span></div>';
            html += '</div></div>';

            // Add HTML to slider container
            slider_container.innerHTML = html;

            // Add canvas and slider container to content wrapper
            content_wrapper.insertBefore(slider_container, canvas2.nextElementSibling);

            // Add content wrapper to display element
            display_element.insertBefore(content_wrapper, null);

            // Draw images on canvas
            if (img1.complete && Number.isFinite(width) && Number.isFinite(height)) {
                ctx1.drawImage(img1, 0, 0, width, height);
                image_drawn = true;
            }
            if (img2.complete && Number.isFinite(width) && Number.isFinite(height)) {
                ctx2.drawImage(img2, 0, 0, width, height);
                image_drawn = true;
            }

            // Add prompt if there is one
            if (trial.prompt !== null) {
                display_element.insertAdjacentHTML('beforeend', trial.prompt);
            }

            // Add submit button
            var submit_btn = document.createElement('button');
            submit_btn.id = "jspsych-image-slider-response-next";
            submit_btn.classList.add("jspsych-btn");
            submit_btn.disabled = (trial.require_movement) ? true : false;
            submit_btn.innerHTML = trial.button_label;
            display_element.insertBefore(submit_btn, display_element.nextElementSibling);

        } else {
            // Code for non-canvas rendering (similar to your original code)

            html = '<div id="jspsych-image-slider-response-wrapper" style="margin: 100px 0px;">';
            html += '<div id="jspsych-image-slider-response-stimulus1">';
            html += '<img src="' + trial.stimulus[0] + '" style="';
            if (trial.stimulus_height !== null) {
                html += 'height:' + trial.stimulus_height + 'px; '
                if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
                    html += 'width: auto; ';
                }
            }
            if (trial.stimulus_width !== null) {
                html += 'width:' + trial.stimulus_width + 'px; '
                if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
                    html += 'height: auto; ';
                }
            }
            html += '"></img>';
            html += '</div>';
            html += '<div id="jspsych-image-slider-response-stimulus2">';
            html += '<img src="' + trial.stimulus[1] + '" style="';
            if (trial.stimulus_height !== null) {
                html += 'height:' + trial.stimulus_height + 'px; '
                if (trial.stimulus_width == null && trial.maintain_aspect_ratio) {
                    html += 'width: auto; ';
                }
            }
            if (trial.stimulus_width !== null) {
                html += 'width:' + trial.stimulus_width + 'px; '
                if (trial.stimulus_height == null && trial.maintain_aspect_ratio) {
                    html += 'height: auto; ';
                }
            }
            html += '"></img>';
            html += '</div>';

            html += '<div class="jspsych-image-slider-response-container" style="position:relative; margin: 0px auto 3em auto; width:600px';
            if (trial.slider_width !== null) {
                html += 600 + 'px;';
            } else {
                html += 'auto;';
            }
            html += '">';
            html += '<input type="range" class="jspsych-slider" value="' + trial.slider_start + '" min="' + trial.min + '" max="' + trial.max + '" step="' + trial.step + '" id="jspsych-image-slider-response-response1"></input>';
            html += '<input type="range" class="jspsych-slider" value="' + trial.slider_start + '" min="' + trial.min + '" max="' + trial.max + '" step="' + trial.step + '" id="jspsych-image-slider-response-response2"></input>';
            html += '<div>'
            for (var j = 0; j < trial.labels.length; j++) {
                // ... Similar label creation code as before ...
            }
            html += '</div>';
            html += '</div>';
            html += '</div>';

            if (trial.prompt !== null) {
                html += trial.prompt;
            }

            // Add submit button
            html += '<button id="jspsych-image-slider-response-next" class="jspsych-btn" ' + (trial.require_movement ? "disabled" : "") + '>' + trial.button_label + '</button>';

            display_element.innerHTML = html;

            // set image dimensions after image has loaded (so that we have access to naturalHeight/naturalWidth)
            var img1 = display_element.querySelector('#jspsych-image-slider-response-stimulus1 img');
            var img2 = display_element.querySelector('#jspsych-image-slider-response-stimulus2 img');
            // ... Similar image dimension setting code as before ...

        }

        var response = {
            rt: null,
            response: null
        };

        if (trial.require_movement) {
            // Enable the submit button only after the slider is moved
            display_element.querySelector('#jspsych-image-slider-response-response1').addEventListener('click', function () {
                display_element.querySelector('#jspsych-image-slider-response-next').disabled = false;
            });

            display_element.querySelector('#jspsych-image-slider-response-response2').addEventListener('click', function () {
                display_element.querySelector('#jspsych-image-slider-response-next').disabled = false;
            });
        }

        display_element.querySelector('#jspsych-image-slider-response-next').addEventListener('click', function () {
            // Measure response time
            var endTime = performance.now();
            response.rt = endTime - startTime;
            response.response1 = display_element.querySelector('#jspsych-image-slider-response-response1').valueAsNumber;
            response.response2 = display_element.querySelector('#jspsych-image-slider-response-response2').valueAsNumber;

            if (trial.response_ends_trial) {
                end_trial();
            } else {
                // Disable the submit button after a response is recorded
                display_element.querySelector('#jspsych-image-slider-response-next').disabled = true;
            }
        });

        function end_trial() {
            jsPsych.pluginAPI.clearAllTimeouts();

            // Save data
            var trialdata = {
                rt: response.rt,
                stimulus1: trial.stimulus[0],
                stimulus2: trial.stimulus[1],
                slider_start: trial.slider_start,
                response1: response.response1,
                response2: response.response2
            };

            display_element.innerHTML = '';

            // Move to the next trial
            jsPsych.finishTrial(trialdata);
        }

        if (trial.stimulus_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function () {
                // Hide the stimuli after the specified duration
                display_element.querySelector('#jspsych-image-slider-response-stimulus1').style.visibility = 'hidden';
                display_element.querySelector('#jspsych-image-slider-response-stimulus2').style.visibility = 'hidden';
            }, trial.stimulus_duration);
        }

        // End the trial after the specified duration
        if (trial.trial_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function () {
                end_trial();
            }, trial.trial_duration);
        }

        var startTime = performance.now();
    };

    return plugin;
})();