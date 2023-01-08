var beta_modal = document.getElementById("modalBeta");
var join_modal = document.getElementById("modalJoin");
var frame_modal = document.getElementById("modalFrame");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("beta_close")[0];
var join_modal_close = document.getElementsByClassName("join_close")[0];
var join_modal_close = document.getElementsByClassName("frame_close")[0];

if (frame_modal) {
    				function openFrame(pageName, elmnt) {
				    var i, framecontent, framelinks;
				    framecontent = document.getElementsByClassName("frame-content");
				    for (i = 0; i < framecontent.length; i++) {
				        framecontent[i].style.display = "none";
				    }
				    framelinks = document.getElementsByClassName("frame-link");
				    for (i = 0; i < framelinks.length; i++) {

				    }
                    frame_modal.style.display = "flex";
                            frame_modal.style.animation = "fade";
        frame_modal.style.animationDuration = "1s";
				    document.getElementById(pageName).style.display = "flex";
				}
 join_modal_close.onclick = function() {
        frame_modal.style.animation = "fade_out";
        frame_modal.style.animationDuration = "1s";
        frame_modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == join_modal) {
            frame_modal.style.display = "none";
        }
    };
}
if (beta_modal) {

    window.onload = function() {
        beta_modal.style.display = "flex";
        beta_modal.style.animation = "fade";
        beta_modal.style.animationDuration = "1s";
    };
    span.onclick = function() {
        beta_modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == beta_modal) {
            beta_modal.style.display = "none";
        }
    };

    closeBetaModal = function() {
        span.click();
    };
}
if (join_modal) {
    btn.onclick = function() {
        join_modal.style.display = "flex";
        join_modal.style.animation = "fade";
        join_modal.style.animationDuration = "1s";
    };
    // When the user clicks the button, open the modal 

    join_modal_close.onclick = function() {
        join_modal.style.animation = "fade_out";
        join_modal.style.animationDuration = "1s";
        join_modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == join_modal) {
            join_modal.style.display = "flex";
        }
    };
}