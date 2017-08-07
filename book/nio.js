require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function(event) {
      const activeLocation = gitbook.state.config.pluginsConfig['theme-nio']['active-location'];
      $(`#nav__list--${activeLocation}`).addClass('active');
    	// Remove active chapter globally
     	$('ul.summary li').removeClass('active--chapter');
    	// this will give us the selected sub-menus level
      const level = $('ul.summary li li.active').data('level');
     	if (level) {
	     	// find the position of the second period
	     	const dot = level.indexOf('.', 2);
	     	// the parent is the substring up until the second period
	     	const parent = level.substring(0, dot);
     		$('ul.summary li[data-level="'+parent+'"]').addClass('active--chapter');
     	}
    });

    gitbook.events.bind("exercise.submit", function() {
        // do something
    });
});
