				window.onscroll = function() {
					scrollEvent();
					activateTopScroll();
				};
				var windowheight = window.innerHeight;
				var navbar = document.getElementById("navbar");
				var sticky = navbar.offsetTop;
				var scroller = document.getElementById("ScrollTop");
				var home = document.getElementById("Top").offsetHeight;
				function openNav() {
					document.getElementById("mySidenav").style.opacity = "100%";
					document.getElementById("mySidenav").style.height = "100%";
					document.getElementById("mySidenav").style.width = "100%";
					document.body.style.overflowY = "hidden";
				}

				function closeNav() {
					document.getElementById("mySidenav").style.opacity = "0";
					document.getElementById("mySidenav").style.height = "0";
					document.getElementById("mySidenav").style.width = "0";
					document.body.style.overflowY = "initial";
				}
				function activateTopScroll() { 
                    if (window.pageYOffset >= home/2){
						scroller.classList.add("scrActive");
						scroller.style.display = "block";
					} else {
						scroller.classList.remove("scrActive");
						scroller.style.display = "none";
					}
				}
				    window.addEventListener('scroll', reveal);
					window.addEventListener('scroll', SecHeadExp);

    function reveal(){
      var reveals = document.querySelectorAll('.reveal');

      for(var i = 0; i < reveals.length; i++){

        
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 50;

        if(revealtop < windowheight - revealpoint){
          reveals[i].classList.add('loadUp');
        }
        else{
          reveals[i].classList.remove('loadUp');
        }
      }
    }
	function SecHeadExp(){
      var SecHeads = document.querySelectorAll('.sec-head');

      for(var i = 0; i < SecHeads.length; i++){

        var SecHeadstop = SecHeads[i].getBoundingClientRect().top;
        var SecHeadspoint = 50;

        if(SecHeadstop < windowheight - SecHeadspoint){
          SecHeads[i].classList.add('Expand');
        }
        else{
          SecHeads[i].classList.remove('Expand');
        }
      }
    }					
				function scrollEvent() {
				
					if (window.pageYOffset >= sticky) {
						navbar.classList.add("sticky");
						navbar.style.position = "fixed";
						document.getElementById("logo").style.display = 'inline';
					}
					 else {
						navbar.classList.remove("sticky");
						document.getElementById("logo").style.display = 'none';
					}
}
       
function openPage(pageName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("linkcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("link");
	for (i = 0; i < tablinks.length; i++) {
		
		tablinks[i].style.boxShadow = "";
		tablinks[i].style.textShadow = "";
		tablinks[i].style.color = "";
    }
    document.getElementById(pageName).style.display = "block";
	elmnt.style.textShadow = "0px 0px 4px aqua, 0 0 8px blue, 0 0 16px violet";
	elmnt.style.boxShadow = "";
	elmnt.style.color = color;
  }
  

var side_dropdown = document.getElementsByClassName("side_dropdown-btn");
var i;

for (i = 0; i < side_dropdown.length; i++) {
  side_dropdown[i].addEventListener("click", function() {
    this.classList.toggle("side_drpdwn_active");
    var side_dropdownContent = this.nextElementSibling;
    if (side_dropdownContent.style.display === "block") {
      side_dropdownContent.style.display = "none";
	  side_dropdownContent.style.maxHeight ="0vh";
    } else {
      side_dropdownContent.style.display = "block";
	  side_dropdownContent.style.maxHeight = side_dropdownContent.scrollHeight + "vh";
    }
  });
} 
 // Get the element with id="defaultOpen" and click on it
if(document.getElementById("defaultOpen").style.display != 'none') { document.getElementById("defaultOpen").click(); }