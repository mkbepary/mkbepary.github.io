$(document).ready(function(){
	const themeVersion = "revamp-1";
	const sectionRoutes = {
		aboutme: {
			path: "/",
			panel: "#aboutmeContent",
			title: "Md Kawser Bepary | Hardware Security, RTL & Formal Verification"
		},
		experience: {
			path: "/profile/",
			panel: "#experienceContent",
			title: "Profile | Md Kawser Bepary"
		},
		projects: {
			path: "/research/",
			panel: "#projectsContent",
			title: "Research | Md Kawser Bepary"
		},
		publications: {
			path: "/publications/",
			panel: "#publicationsContent",
			title: "Publications | Md Kawser Bepary"
		},
		resources: {
			path: "/resources/",
			panel: "#resourcesContent",
			title: "Resources | Md Kawser Bepary"
		}
	};

	// Options menu is hidden by default
	$('#theme').hide();
	$('#lan').hide();

	$('#navbarList .nav-link').click(function(e) {
		const route = sectionRoutes[this.id];
		if (!route)
			return;

		e.preventDefault();
		if (normalisePath(window.location.pathname) !== route.path)
			window.history.pushState({ section: this.id }, "", route.path);

		activateSection(this.id, sectionRoutes, true);
	});

	$(window).on("popstate", function() {
		activateSection(routeIdFromPath(window.location.pathname, sectionRoutes), sectionRoutes, false);
	});

	activateSection(routeIdFromPath(window.location.pathname, sectionRoutes), sectionRoutes, false);



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
		$("link[href^='/assets/css/light.css'], link[href^='assets/css/light.css']").remove();
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

			$("link[href^='/assets/css/light.css'], link[href^='assets/css/light.css']").remove();
			$('<link>').appendTo('head').attr({
				type: 'text/css',
				rel: 'stylesheet',
				href: 'assets/css/dark.css?v=' + themeVersion
			});
		}
		else {
			$('#theme').empty().append("<i class='fa-regular fa-lightbulb'></i>");

			localStorage.theme = "light"

			$("link[href^='/assets/css/dark.css'], link[href^='assets/css/dark.css']").remove();
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

function normalisePath(path) {
	if (!path || path === "")
		return "/";

	path = path.replace(/\/index\.html$/, "/");

	if (path !== "/" && !path.endsWith("/"))
		path += "/";

	return path;
}

function routeIdFromPath(path, sectionRoutes) {
	const currentPath = normalisePath(path);
	const routeId = Object.keys(sectionRoutes).find(function(id) {
		return sectionRoutes[id].path === currentPath;
	});

	return routeId || "aboutme";
}

function activateSection(routeId, sectionRoutes, scroll) {
	const route = sectionRoutes[routeId] || sectionRoutes.aboutme;

	clearActiveLinks();
	$('#' + routeId).addClass('active');
	clearActiveDivs();
	activateDiv(route.panel, scroll);
	updateRouteMetadata(route);
}

function updateRouteMetadata(route) {
	const absoluteUrl = "https://mkbepary.github.io" + route.path;

	document.title = route.title;
	$("link[rel='canonical']").attr("href", absoluteUrl);
	$("meta[property='og:url']").attr("content", absoluteUrl);
	$("meta[property='og:title']").attr("content", route.title);
	$("meta[name='twitter:title']").attr("content", route.title);
}

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
function activateDiv(divId, scroll) {
	$(divId).addClass('active');

	// Scrolls to the content
	if (scroll)
		scrollToContent(divId);
}

// Scrolls to the content
function scrollToContent(divId) {
	var target = $(window).width() < 768 ? $(divId) : $('#main-content');

	$('html, body').animate({
		scrollTop: target.offset().top
	}, 150);
}
