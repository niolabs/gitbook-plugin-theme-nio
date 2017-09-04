require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function(event) {
      // allow dynamic active location in the header
      var activeLocation = gitbook.state.config.pluginsConfig['theme-nio']['active-location'];
      $(`#nav__list--${activeLocation}`).addClass('active');

      // custom search bar placeholder text
      $('#book-search-input input').attr('placeholder', 'search');

      // add class to active parent chapter
      // remove active chapter globally
     	$('ul.summary li').removeClass('active--chapter');
      // get the level of the selected sub-menu
      var level = $('ul.summary li li.active').data('level');

     	if (level) {
        // find the position of the first period after the 2nd index (only works for one or two-digit levels)
	     	var dot = level.indexOf('.', 2);
	     	// the parent is the substring before the second period
	     	var parent = level.substring(0, dot);
     		$('ul.summary li[data-level="'+parent+'"]').addClass('active--chapter');
     	}

      // this gets the sidebar animation working
      $('ul.summary > li.active').addClass('animating');
      setTimeout(function() {
        $('ul.summary > li').removeClass('animating');
      }, 50);

      // add class to blockquote according to key
      var blkquotes = $('blockquote');
      var classMap = {
          '[info]': 'info',
          '[warning]': 'warning',
          '[danger]': 'danger',
          '[success]': 'success'
      }

      var iconMap = {
          '[info]': '<i class="fa fa-info-circle"></i>',
          '[warning]': '<i class="fa fa-exclamation-circle"></i>',
          '[danger]': '<i class="fa fa-ban"></i>',
          '[success]': '<i class="fa fa-check-circle"></i>'
      }

      blkquotes.each(function() {
        for (alertType in classMap) {
            htmlStr = $(this).html()

            if (htmlStr.indexOf(alertType) > 0) {
                // remove alertType from text, replace with icon
                htmlStr = htmlStr.replace(alertType, iconMap[alertType]);
                $(this).html(htmlStr);

                // add class
                $(this).addClass(classMap[alertType]);
            }
        }
      })
    });

    gitbook.events.bind("exercise.submit", function() {
        // do something
    });
});
