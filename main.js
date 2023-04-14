$(document).ready(function () {
    const $window = $(window),
      $head = $("head"),
      $body = $("body");
    // Stops animations/transitions until the page has ...
  
    // ... loaded.
    $window.on("load", function () {
      window.setTimeout(function () {
        $body.removeClass("is-preload");
      }, 100);
    });
  
    // ... stopped resizing.
    let resizeTimeout;
  
    $window.on("resize", function () {
      console.log("resize");
      // Mark as resizing.
      $body.addClass("is-resizing");
  
      // Unmark after delay.
      clearTimeout(resizeTimeout);
  
      resizeTimeout = setTimeout(function () {
        $body.removeClass("is-resizing");
      }, 100);
    });
  
    // Sidebar.
    const $sidebar = $("#sidebar"),
      $sidebar_inner = $sidebar.children(".inner");
  
    // Hack: Workaround for Chrome/Android scrollbar position bug.
    if (browser.os == "android" && browser.name == "chrome")
      $(
        "<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>"
      ).appendTo($head);
  
    // Toggle.
    $('<a href="#" class="toggle">Toggle</a>').appendTo($sidebar);
  
    const toggle = () => {
      console.log("Toggling");
  
      $sidebar.toggleClass("inactive");
    };
  
    $sidebar.on("mouseenter", toggle);
    $sidebar.on("mouseleave", toggle);
  
    // Prevent certain events inside the panel from bubbling.
    $sidebar.on("click touchend touchstart touchmove", function (event) {
      // Prevent propagation.
      event.stopPropagation();
    });
  
    // Hide panel on body click/tap.
    $body.on("click touchend", function (event) {
      // Deactivate.
      $sidebar.addClass("inactive");
    });
  
    // Menu.
    const $menu = $("#menu"),
      $menu_openers = $menu.children("ul").find(".opener");
  
    // Openers.
    $menu_openers.each(function () {
      const $this = $(this);
  
      $this.on("click", function (event) {
        // Prevent default.
        event.preventDefault();
  
        // Toggle.
        $menu_openers.not($this).removeClass("active");
        $this.toggleClass("active");
  
        // Trigger resize (sidebar lock).
        $window.triggerHandler("resize.sidebar-lock");
      });
    });
  });
  
  // Learn more slide
  $(document).ready(function() {
    $('a[href^="#"]').on('click', function(event) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    });
  });
  