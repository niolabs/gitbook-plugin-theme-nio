require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function(event) {
      // allow dynamic active location in the header
      var activeLocation = gitbook.state.config.pluginsConfig['theme-nio']['active-location'];
      $(`#nav__list--${activeLocation}`).addClass('active');
      // custom search bar placeholder text
      $('#book-search-input input').attr('placeholder', 'search');
    	// Remove active chapter globally
     	$('ul.summary li').removeClass('active--chapter');
    	// this will give us the selected sub-menus level
      var level = $('ul.summary li li.active').data('level');

     	if (level) {
	     	// find the position of the first period after the 2nd index (which won't work for three-digit levels)
	     	var dot = level.indexOf('.', 2);
	     	// the parent is the substring before the second period
	     	var parent = level.substring(0, dot);
     		$('ul.summary li[data-level="'+parent+'"]').addClass('active--chapter');
     	}

      // This is a hack in order to get the sidebar animation working
      $('ul.summary > li.active').addClass('animating');
      setTimeout(function() {
        $('ul.summary > li').removeClass('animating');
      }, 50);
    });

    gitbook.events.bind("exercise.submit", function() {
        // do something
    });
});
