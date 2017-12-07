require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function(event) {
      // google analytics, track changes inside docs
      ga('send', 'pageview');

      function resetToc() {
        $('.js-toolbar-action > .fa').removeClass('fa-chevron-down--rotate180');
        $('.book-header').removeClass('toc-open');
      };

      // scroll to top of header on page change, initialize TOC as closed
      $(document).ready(function(){
        $(window).scrollTop(0);
        resetToc();
        $('.accordion').removeClass('accordionClose');
        // in mobile, force page change when active chapter is clicked
        if ($(window).width() < 600) {
          $('.active').click( function(e) {
            window.location.href = e.target.href;
          });
        }
      });

      // this is a workaround so that the pubkeeper docs don't open in a new link
      // remove this as soon as the pubkeeper docs repo can be public and be part of an {%include %} block
      $('a[href="https://docs.pubkeeper.com"]').removeAttr('target');

      // allow dynamic active location in the header
      var activeLocation = gitbook.state.config.pluginsConfig['theme-nio']['active-location'];
      $(`#nav__list--${activeLocation}`).addClass('active');

      // use this to attach footer to any element
      // $( '.body-inner' ).append( $( '.primary-nio-footer' ) );

      // custom search bar placeholder text, add clickable icon, and search on return keypress
      $('#book-search-input').append($('<div id="search-icon"></div>'));
      $('#book-search-input input').attr('placeholder', 'Search');
      $('#book-search-input input').keypress(function (e) {
        var key = e.which;
        if (key === 13)  // the enter key code
        {
          $('.js-toolbar-action > .fa').click();
        }
      });
      $('#search-icon').click( function() {
        $('.js-toolbar-action > .fa').click();
      });

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

      // this gets the sidebar expand TOC animation working
      $('ul.summary > li.active').addClass('animating');
      setTimeout(function() {
        $('ul.summary > li').removeClass('animating');
      }, 50);

      $('ul.summary > li.chapter.active').addClass('animating');
      setTimeout(function() {
        $('ul.summary > li.chapter.active').removeClass('animating');
      }, 50);

      // replace header hamburger icon with chevron
      $('.js-toolbar-action > .fa').removeClass('fa-align-justify');
      $('.js-toolbar-action > .fa').addClass('fa-chevron-down');
      // remove unwanted page-header elements that are added on each page change
      if ($('.js-toolbar-action > .fa').length > 1) {
        $('.js-toolbar-action > .fa')[0].remove();
      }
      if ($('.book-header').length > 1) {
        $('.book-header')[1].remove();
      }
      // rotate chevron on click
      $('.js-toolbar-action > .fa').click( function() {
        $('.book-header').toggleClass('toc-open');
        $('.js-toolbar-action > .fa').toggleClass('fa-chevron-down--rotate180');
      });

      // add class to blockquote according to key
      var blkquotes = $('blockquote');
      var classMap = {
          '[info]': 'info',
          '[warning]': 'warning',
          '[danger]': 'danger',
          '[success]': 'success'
      };

      var iconMap = {
          '[info]': '<i class="fa fa-info-circle"></i>',
          '[warning]': '<i class="fa fa-exclamation-circle"></i>',
          '[danger]': '<i class="fa fa-ban"></i>',
          '[success]': '<i class="fa fa-check-circle"></i>'
      };

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

    gitbook.events.bind("start", function() {

        // do things one time only, on load of book

        // repurpose book-header as mobile TOC
        // attach book-header to header and add custom content
        $('.header').after($('.book-header'));
        $('.js-toolbar-action').after( $('.custom-book-header-content'));

    });
});
