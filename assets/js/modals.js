
var beta_modal = document.getElementById("modalBeta");
var join_modal = document.getElementById("modalJoin");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var join_modal_close  = document.getElementsByClassName("close")[1];

window.onload = function() {
  beta_modal.style.display = "block";
};

span.onclick = function() {
  beta_modal.style.display = "none";
};
join_modal_close.onclick = function() {
  join_modal.style.display = "none";
};

btn.onclick = function(){
join_modal.style.display = "block";
};

window.onclick = function(event) {
  if (event.target == beta_modal) {
    beta_modal.style.display = "none";
  }   else if (event.target == join_modal) {
    join_modal.style.display = "none";
  }

};