// Function to go back to full screen
function goBackToFullScreen() {
    // Request full screen mode
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }

    // Remove the dialog after a short delay
    setTimeout(function() {
      const dialog = document.querySelector(".fullscreen-dialog");
      if (dialog) {
        dialog.remove();
      }
    }, 100);
  }

// Function to handle the fullscreenchange event
function handleFullscreenChange() {
	// Check if the user has exited full screen mode
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
		// Show a custom dialog with the option to go back to full screen
		showFullscreenDialog();
	}
}

// Attach the fullscreenchange event listener
document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("mozfullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

// Function to show a custom dialog with the option to go back to full screen
function showFullscreenDialog() {
	// Create a custom dialog element
	const dialog = document.createElement("div");
	dialog.className = "fullscreen-dialog";

	// Add the dialog content
	dialog.innerHTML = `
	  <center><p style='font-size: 30px; line-height: 1.3'>You have exited full screen mode.<br><br></p>
	  <button class=fullscreen-btn onclick="goBackToFullScreen()">Please click here to return to full screen</button>
	`;

	// Append the dialog to the document body
	document.body.appendChild(dialog);

	// Pause the code execution while displaying the alert
	setTimeout(function() {
// 		alert("Please go back to full screen mode.");
	}, 0);
}
