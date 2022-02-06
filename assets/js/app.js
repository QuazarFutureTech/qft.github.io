				window.onscroll = function() {
					myFunction();
				};
				var navbar = document.getElementById("navbar");
				var sticky = navbar.offsetTop;

				function openNav() {
					document.getElementById("mySidenav").style.width = "250px";
					document.getElementById("main").style.marginLeft = "250px";
					document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
				}

				function closeNav() {
					document.getElementById("mySidenav").style.width = "0";
					document.getElementById("main").style.marginLeft = "0";
					document.body.style.backgroundColor = "#00004d";
				}

				function myFunction() {
					if (window.pageYOffset >= sticky) {
						navbar.classList.add("sticky");
						document.getElementById("logo").style.display = 'inline';
					} else {
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