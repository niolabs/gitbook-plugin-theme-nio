require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function(event) {

      function resetToc() {
        $('.js-toolbar-action > .fa').removeClass('fa-chevron-down--rotate180');
        $('.book-header').removeClass('toc-open');
      };

      function setBodyScroll() {
        const scrollDistance = 50;
        if ($(window).scrollTop() > scrollDistance) {
          $('body').addClass('scrolled');
        }
        else {
          $('body').removeClass('scrolled');
        }
      }

      function bindScrollEvent() {
        $(window).bind('scroll', setBodyScroll);
      }

      function bindHashEvent() {
        // for any link that includes a '#', but not only a '#'
        $('a[href*="#"]').click(function(e) {
          // if an internal page link
          if (e.currentTarget.href.includes(window.location.pathname)) {
            $('html, body').animate({ scrollTop: $(e.currentTarget.hash).offset().top}, 1000);
          // else append hash to page and go to page while keeping the url without the hash out of the history
          } else {
            window.location.replace(e.currentTarget.href);
          }
        });
      }

      // scroll to top of header on page change, initialize TOC as closed
      $(document).ready(function(){
        if (window.location.hash === ""){
          $(window).scrollTop(0);
        } else {
          $('html, body').animate({ scrollTop: $(window.location.hash).offset().top}, 1000);
        };
        setBodyScroll();
        bindHashEvent();
        bindScrollEvent();
        resetToc();
        $('.accordion').removeClass('accordionClose');
        $('table').wrap('<div class="scrolling-wrapper"></div>');
        // in mobile, force page change when active chapter is clicked
        if ($(window).width() < 600) {
          $('.active').click( function(e) {
            window.location.href = e.target.href;
          });
        }
      });

      // allow dynamic active location in the header
      var activeLocation = gitbook.state.config.pluginsConfig['theme-nio']['active-location'];
      $(`#nav__list--${activeLocation}`).addClass('active');

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
          '[info]': '<i class="fa fa-info-circle fa-2x blockquote-icon"></i>',
          '[warning]': '<i class="fa fa-exclamation-circle fa-2x blockquote-icon"></i>',
          '[danger]': '<i class="fa fa-ban fa-2x blockquote-icon"></i>',
          '[success]': '<i class="fa fa-check-circle fa-2x blockquote-icon"></i>'
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
                $(this).addClass('callout');
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

function checkNioSession() {
  const loggedIn = /^(.*;)?\s*nio_session\s*=/.test(document.cookie);
  if (loggedIn) {
    document.body.classList.add('session--active');
  }
}

checkNioSession();
