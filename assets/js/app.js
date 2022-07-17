				window.onscroll = function() {
					scrollEvent();
					activateTopScroll();
				};
				var navbar = document.getElementById("navbar");
				var sticky = navbar.offsetTop;
				var scroller = document.getElementById("ScrollTop");
				var home = document.getElementById("section-home").offsetHeight;
				function openNav() {
					document.getElementById("mySidenav").style.width = "100%";
					document.getElementById("mySidenav").style.height = "100%";
					document.getElementById("main").style.marginLeft = "250px";
					document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
					document.body.style.overflowY = "hidden";
				}

				function closeNav() {
					document.getElementById("mySidenav").style.width = "0";
					document.getElementById("mySidenav").style.height = "0";
					document.getElementById("main").style.marginLeft = "0";
					document.body.style.backgroundColor = "#00004d";
					
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

    function reveal(){
      var reveals = document.querySelectorAll('.reveal');

      for(var i = 0; i < reveals.length; i++){

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 50;

        if(revealtop < windowheight - revealpoint){
          reveals[i].classList.add('loadUp');
        }
        else{
          reveals[i].classList.remove('loadUP');
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
  
  // Get the element with id="defaultOpen" and click on it
if(document.getElementById("defaultOpen").style.display != 'none') { document.getElementById("defaultOpen").click(); }