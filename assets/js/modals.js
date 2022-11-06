var beta_modal = document.getElementById("modalBeta");
var join_modal = document.getElementById("modalJoin");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("beta_close");
var join_modal_close = document.getElementsByClassName("join_close");

if (beta_modal) {

    window.onload = function() {
        beta_modal.style.display = "block";
        beta_modal.style.animation = fade;
        beta_modal.style.animationDuration = "1s";
    };
    span.onclick = function() {
        beta_modal.style.display = "none";
        beta_modal.style.animation = fade_out;
        beta_modal.style.animationDuration = "1s";
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
        join_modal.style.display = "block";
        join_modal.style.animation = "fade";
        join_modal.style.animationDuration = "1s";
    };
    // When the user clicks the button, open the modal 

    window.onclick = function(event) {
        if (event.target == beta_modal) {
            beta_modal.style.display = "none";
        } else if (event.target == join_modal) {
            join_modal.style.display = "none";
        }
    };
    join_modal_close.onclick = function() {
        join_modal.style.display = "none";
        join_modal.style.animation = "fade_out";
        join_modal.style.animationDuration = "1s";

    };
}