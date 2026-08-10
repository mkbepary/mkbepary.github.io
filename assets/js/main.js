$(document).ready(function(){
	const themeVersion = "revamp-1";

	// Options menu is hidden by default
	$('#theme').hide();
	$('#lan').hide();

	// Handle 'About Me' content
	$('#aboutme').click(function(e) {
		e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
		if(!$(this).hasClass('active')) {
				// Update navbar
				clearActiveLinks();
				$(this).addClass('active');

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#aboutmeContent');
		}

	});

	// Handle 'Publications' content
	$('#publications').click(function(e) {
		e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
		if(!$(this).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			$(this).addClass('active');

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#publicationsContent');
		}
	});

	// Handle 'Blog' content
	$('#blog').click(function(e) {
		e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
		if(!$(this).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			$(this).addClass('active');

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#blogContent');
		}
	});

	// Handle 'Academic' content
	$('#academic').click(function(e) {
		e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
		if(!$(this).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			$(this).addClass('active');

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#academicContent');
		}
	});

	// Handle 'Particular' content
	$('#particular').click(function(e) {
		e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
		if(!$(this).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			$(this).addClass('active');

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#particularContent');
		}
	});

	// Handle 'Conferences' content
	$('#conferences').click(function(e) {
		e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
		if(!$(this).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			$(this).addClass('active');

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#conferencesContent');
		}
	});

	// Handle 'Profile' content
	$('#experience').click(function(e) {
		e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
	if(!$(this).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			$(this).addClass('active');

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#experienceContent');
		}
	});

	// Handle 'Research' content
	$('#projects').click(function(e) {
		e.preventDefault();

		// If the div has already the class active, no need to reload the divs...
		if(!$(this).hasClass('active')) {
			// Update navbar
			clearActiveLinks();
			$(this).addClass('active');

			// Hide other contents
			clearActiveDivs();

			// Show current content
			activateDiv('#projectsContent');
		}
	});
	
	// Handle 'Resources' content
$('#resources').click(function(e) {
		e.preventDefault();

	// If the div has already the class active, no need to reload the divs...
if(!$(this).hasClass('active')) {
		// Update navbar
		clearActiveLinks();
			$(this).addClass('active');

		// Hide other contents
		clearActiveDivs();

		// Show current content
		activateDiv('#resourcesContent');
	}
});



	// Handle 'Photos' content
	// $('#photos').click(function(e) {

	// 	// If the div has already the class active, no need to reload the divs...
	// 	if(!$(e.target).hasClass('active')) {
	// 		// Update navbar
	// 		clearActiveLinks();
	// 		activateLink(e);

	// 		// Hide other contents
	// 		clearActiveDivs();

	// 		// Show current content
	// 		activateDiv('#photosContent');
	// 	}
	// });

	// **************************** //
	// Handles the Publications events
	// **************************** //

	// Copies the citation to the clipboard
	$(document).on("click", "#citation", function(){
		var text = $(this).parent().parent().next()[0].innerHTML;

		navigator.clipboard.writeText(text);

		toastr.success('Citation copied');
	});

	// ******************** //
	// Handles the Blog events
	// ******************** //

	// Opens the blog post in a new tab
	$('.clickable').click(function(e) {
		window.open($(e.currentTarget)[0].childNodes[1].innerText, '_blank').focus();
	});


	// *************************** //
	// Handle the rest of the content
	// Omit this part if you don't have more content
	// *************************** //
	
	// If the user has not selected a theme, then select the default one according to the user's preferences
	if(localStorage.getItem("theme") === null){
		localStorage.theme = "light";
		if (window.matchMedia('(prefers-color-scheme: dark)').matches)
			localStorage.theme = "dark";
	}

	// Always load the light theme
	$('<link>').appendTo('head').attr({
		type: 'text/css',
		rel: 'stylesheet',
		href: 'assets/css/light.css?v=' + themeVersion
	});

	// If the user has the dark theme, then replace the light theme with the dark one
	if (localStorage.theme == "dark") {
		$("link[href^='assets/css/light.css']").remove();
		$('<link>').appendTo('head').attr({
			type: 'text/css',
			rel: 'stylesheet',
			href: 'assets/css/dark.css?v=' + themeVersion
		});
		$('#theme').empty().append("<i class='fa-solid fa-lightbulb'></i>");
	}

	// Controls the option menu toggler to show/hide the language and theme selectors
	$('#options-toggler').click(function(e) {
		if(!$(e.currentTarget).hasClass('active')) {
			$(e.currentTarget).addClass('active');
			$('#theme').show("fast");
			$('#lan').show("fast");
		}
		else {
			$(e.currentTarget).removeClass('active');
			$('#theme').hide("fast");
			$('#lan').hide("fast");
		}
	})

	// Alternates between light and dark themes
	$('#theme').click(function(e) {
		if(localStorage.theme != "dark"){
			$('#theme').empty().append("<i class='fa-solid fa-lightbulb'></i>");

			localStorage.theme = "dark"

			$("link[href^='assets/css/light.css']").remove();
			$('<link>').appendTo('head').attr({
				type: 'text/css',
				rel: 'stylesheet',
				href: 'assets/css/dark.css?v=' + themeVersion
			});
		}
		else {
			$('#theme').empty().append("<i class='fa-regular fa-lightbulb'></i>");

			localStorage.theme = "light"

			$("link[href^='assets/css/dark.css']").remove();
			$('<link>').appendTo('head').attr({
				type: 'text/css',
				rel: 'stylesheet',
				href: 'assets/css/light.css?v=' + themeVersion
			});
		}
	})

	
	// Create the language manager
	const langManager = new LanguageManager();
	
	// Alternates between the different available languages
	$('#lan').click(function() {
        const newLang = langManager.getNextLanguage();
        langManager.setLanguage(newLang);
    });
});

// Clears the active links
function clearActiveLinks() {
	$('#navbarList .nav-item .nav-link').each(function() {
		$(this).removeClass('active');
	});
}

// Clears the active divs
function clearActiveDivs() {
	$('.section-panel.active').each(function() {
		$(this).removeClass('active');
	});
}

// Activates the link
function activateLink(elem) {
	// Accept either an event or an element. Ensure left panel visibility.
	var tgt = elem && elem.currentTarget ? elem.currentTarget : (elem && elem.id ? elem : null);
	if (tgt && tgt.id == "particular")
		$('#leftPanel').hide();
	else
		$('#leftPanel').show();
}

// Activates the div
function activateDiv(divId) {
	$(divId).addClass('active');

	// Scrolls to the content
	scrollToContent(divId);
}

// Scrolls to the content
function scrollToContent(divId) {
	var target = $(window).width() < 768 ? $(divId) : $('#main-content');

	$('html, body').animate({
		scrollTop: target.offset().top
	}, 150);
}
