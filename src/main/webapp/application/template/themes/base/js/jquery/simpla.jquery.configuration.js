$(document).ready(function(){
	
	$("#menu-nav li ul").hide(); // Hide all sub menus
		$("#menu-nav li p.current-row").parent().find("ul").slideToggle("slow"); //
		
    //Minimize section
		
		$(".section-header h3").css({ "cursor":"s-resize" }); // Give the h3 in Content Box Header a different cursor
		//$(".closed-box .content-box-content").hide(); // Hide the content of the header if it has the class "closed"
		//$(".closed-box .content-box-tabs").hide(); // Hide the tabs in the header if it has the class "closed"
		
		$(".section-head h3").click( // When the h3 is clicked...
			function () {
			  $(this).parent().next().toggle(); // Toggle the section
			  $(this).parent().parent().toggleClass("closed-box"); // Toggle the class "closed-box" on the content box
			  $(this).parent().find(".section-tabs").toggle(); // Toggle the tabs
			}
		);

    // section tabs:
		
		$('.section .section-content div.tab-content').hide(); // Hide the content divs
		$('ul.section-tabs li a.default-tab').addClass('current'); // Add the class "current" to the default tab
		$('.section-content div.default-tab').show(); // Show the div with class "default-tab"
		
		$('.section ul.section-tabs li a').click( // When a tab is clicked...
			function() { 
				$(this).parent().siblings().find("a").removeClass('current'); // Remove "current" class from all tabs
				$(this).addClass('current'); // Add class "current" to clicked tab
				var currentTab = $(this).attr('href'); // Set variable "currentTab" to the value of href of clicked tab
				$(currentTab).siblings().hide(); // Hide all content divs
				$(currentTab).show(); // Show the content div with the id equal to the id of clicked tab
				return false; 
			}
		);
});
  
  
  