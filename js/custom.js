(function () {
  "use strict";

  /*----------------------------------------
		Detect Mobile
	----------------------------------------*/
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  // navigation
  var OnePageNav = function () {
    var navToggler = $(".navbar-toggler");
    $(".smoothscroll[href^='#'], #pb-navbar ul li a[href^='#']").on(
      "click",
      function (e) {
        e.preventDefault();
        var hash = this.hash;

        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          700,
          "easeInOutExpo",
          function () {
            window.location.hash = hash;
          }
        );
      }
    );
    $("#pb-navbar ul li a[href^='#']").on("click", function (e) {
      if (navToggler.is(":visible")) {
        navToggler.click();
      }
    });

    $("body").on("activate.bs.scrollspy", function () {
      console.log("nice");
    });
  };

  var offCanvasNav = function () {
    // var toggleNav = $('.js-pb_nav-toggle'),
    // 		offcanvasNav = $('.js-pb_offcanvas-nav_v1');
    // if( toggleNav.length > 0 ) {
    // 	toggleNav.click(function(e){
    // 		$(this).toggleClass('active');
    // 		offcanvasNav.addClass('active');
    // 		e.preventDefault();
    // 	});
    // }
    // offcanvasNav.click(function(e){
    // 	if (offcanvasNav.hasClass('active')) {
    // 		offcanvasNav.removeClass('active');
    // 		toggleNav.removeClass('active');
    // 	}
    // 	e.preventDefault();
    // })
  };

  /*----------------------------------------
		Animate Scroll
	----------------------------------------*/

  var contentWayPoint = function () {
    var i = 0;
    $(".site-animate").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("site-animated")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .site-animate.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn site-animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft site-animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight site-animated");
                  } else {
                    el.addClass("fadeInUp site-animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 100,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "95%" }
    );
  };

  var navbarState = function () {
    var lastScrollTop = 0;
    $(window).scroll(function () {
      var $this = $(this),
        st = $this.scrollTop(),
        navbar = $(".site-navbar");

      if (st > 200) {
        navbar.addClass("scrolled");
      } else {
        navbar.removeClass("scrolled awake");
      }

      if (navbar.hasClass("scrolled") && st > 300) {
        if (st > lastScrollTop) {
          // if (navbar.hasClass('scrolled')) {
          // navbar.removeClass('awake');
          // navbar.addClass('sleep');
          // }
        } else {
          // if (navbar.hasClass('scrolled')) {
          // navbar.addClass('awake');
          // navbar.removeClass('sleep');
          // }
        }
        lastScrollTop = st;
      }
    });
  };

  var siteStellar = function () {
    $(window).stellar({
      responsive: true,
      parallaxBackgrounds: true,
      parallaxElements: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      scrollProperty: "scroll",
    });
  };

  // Page Nav
  var clickMenu = function () {
    $('.navbar-nav a:not([class="external"])').click(function (event) {
      var section = $(this).data("nav-section"),
        navbar = $(".navbar-nav");
      if (isMobile.any()) {
        $(".navbar-toggle").click();
      }
      if ($('[data-section="' + section + '"]').length) {
        $("html, body").animate(
          {
            scrollTop: $('[data-section="' + section + '"]').offset().top,
          },
          500,
          "easeInOutExpo"
        );
      }

      event.preventDefault();
      return false;
    });
  };

  // Reflect scrolling in navigation
  var navActive = function (section) {
    var $el = $(".navbar-nav");
    $el.find("li").removeClass("active");
    $el.each(function () {
      $(this)
        .find('a[data-nav-section="' + section + '"]')
        .closest("li")
        .addClass("active");
    });
  };

  var navigationSection = function () {
    var $section = $("section[data-section]");

    $section.waypoint(
      function (direction) {
        if (direction === "down") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: "150px",
      }
    );

    $section.waypoint(
      function (direction) {
        if (direction === "up") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: function () {
          return -$(this.element).height() - 155;
        },
      }
    );
  };

  var smoothScroll = function () {
    var $root = $("html, body");

    $(".smoothscroll").click(function () {
      $root.animate(
        {
          scrollTop: $($.attr(this, "href")).offset().top,
        },
        500
      );
      return false;
    });
  };

  var magnificPopupControl = function () {
    $(".image-popup").magnificPopup({
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-with-zoom",
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: "ease-in-out", // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function (openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });

    $(".with-caption").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      closeBtnInside: false,
      mainClass: "mfp-with-zoom mfp-img-mobile",
      image: {
        verticalFit: true,
        titleSrc: function (item) {
          return (
            item.el.attr("title") +
            ' &middot; <a class="image-source-link" href="' +
            item.el.attr("data-source") +
            '" target="_blank">image source</a>'
          );
        },
      },
      zoom: {
        enabled: true,
      },
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false,
    });
  };

  var portfolioMasonry = function () {
    $(".filters ul li").click(function () {
      $(".filters ul li").removeClass("active");
      $(this).addClass("active");

      var data = $(this).attr("data-filter");
      $grid.isotope({
        filter: data,
      });
    });

    if (document.getElementById("section-portfolio")) {
      var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: true,
        masonry: {
          columnWidth: ".all",
        },
      });
    }
  };

  // Scroll Progress Indicator
  var scrollProgress = function () {
    const progressBar = document.getElementById("scrollProgress");
    if (progressBar) {
      window.addEventListener("scroll", function () {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = progress + "%";
      });
    }
  };

  $(function () {
    OnePageNav();
    offCanvasNav();
    contentWayPoint();
    navbarState();
    clickMenu();
    smoothScroll();
    portfolioMasonry();
    initGitHubWidget();
    scrollProgress();
  });
})();

// document.addEventListener("DOMContentLoaded", function() {

// 	var circleProgress = (function(selector) {
// 	  var wrapper = document.querySelectorAll(selector);
// 	  Array.prototype.forEach.call(wrapper, function(wrapper, i) {
// 		var wrapperWidth,
// 		  wrapperHeight,
// 		  percent,
// 		  innerHTML,
// 		  context,
// 		  lineWidth,
// 		  centerX,
// 		  centerY,
// 		  radius,
// 		  newPercent,
// 		  speed,
// 		  from,
// 		  to,
// 		  duration,
// 		  start,
// 		  strokeStyle,
// 		  text;

// 		var getValues = function() {
// 		  wrapperWidth = parseInt(window.getComputedStyle(wrapper).width);
// 		  wrapperHeight = wrapperWidth;
// 		  percent = wrapper.getAttribute('data-cp-percentage');
// 		  innerHTML = '<span class="percentage"><strong>' + percent + '</strong> %</span><canvas class="circleProgressCanvas" width="' + (wrapperWidth * 2) + '" height="' + wrapperHeight * 2 + '"></canvas>';
// 		  wrapper.innerHTML = innerHTML;
// 		  text = wrapper.querySelector(".percentage");
// 		  canvas = wrapper.querySelector(".circleProgressCanvas");
// 		  wrapper.style.height = canvas.style.width = canvas.style.height = wrapperWidth + "px";
// 		  context = canvas.getContext('2d');
// 		  centerX = canvas.width / 2;
// 		  centerY = canvas.height / 2;
// 		  newPercent = 0;
// 		  speed = 1;
// 		  from = 0;
// 		  to = percent;
// 		  duration = 1000;
// 		  lineWidth = 25;
// 		  radius = canvas.width / 2 - lineWidth;
// 		  strokeStyle = wrapper.getAttribute('data-cp-color');
// 		  start = new Date().getTime();
// 		};

// 		function animate() {
// 		  requestAnimationFrame(animate);
// 		  var time = new Date().getTime() - start;
// 		  if (time <= duration) {
// 			var x = easeInOutQuart(time, from, to - from, duration);
// 			newPercent = x;
// 			text.innerHTML = Math.round(newPercent) + " %";
// 			drawArc();
// 		  }
// 		}

// 		function drawArc() {
// 		  var circleStart = 1.5 * Math.PI;
// 		  var circleEnd = circleStart + (newPercent / 50) * Math.PI;
// 		  context.clearRect(0, 0, canvas.width, canvas.height);
// 		  context.beginPath();
// 		  context.arc(centerX, centerY, radius, circleStart, 4 * Math.PI, false);
// 		  context.lineWidth = lineWidth;
// 		  context.strokeStyle = "#ddd";
// 		  context.stroke();
// 		  context.beginPath();
// 		  context.arc(centerX, centerY, radius, circleStart, circleEnd, false);
// 		  context.lineWidth = lineWidth;
// 		  context.strokeStyle = strokeStyle;
// 		  context.stroke();

// 		}
// 		var update = function() {
// 		  getValues();
// 		  animate();
// 		}
// 		update();

// 		var btnUpdate = document.querySelectorAll(".btn-update")[0];
// 		btnUpdate.addEventListener("click", function() {
// 		  wrapper.setAttribute("data-cp-percentage", Math.round(getRandom(5, 95)));
// 		  update();
// 		});
// 		wrapper.addEventListener("click", function() {
// 		  update();
// 		});

// 		var resizeTimer;
// 		window.addEventListener("resize", function() {
// 		  clearTimeout(resizeTimer);
// 		  resizeTimer = setTimeout(function() {
// 			clearTimeout(resizeTimer);
// 			start = new Date().getTime();
// 			update();
// 		  }, 250);
// 		});
// 	  });

// 	  //
// 	  // http://easings.net/#easeInOutQuart
// 	  //  t: current time
// 	  //  b: beginning value
// 	  //  c: change in value
// 	  //  d: duration
// 	  //
// 	  function easeInOutQuart(t, b, c, d) {
// 		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
// 		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
// 	  }

// 	});

// 	circleProgress('.counter');

// 	// Gibt eine Zufallszahl zwischen min (inklusive) und max (exklusive) zurück
// 	function getRandom(min, max) {
// 	  return Math.random() * (max - min) + min;
// 	}
//   });

var galleryThumbs = new Swiper(".gallery-thumbs", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "3",
  //loop: true,
  // coverflowEffect: {
  //   rotate: 50,
  //   stretch: 0,
  //   depth: 100,
  //   modifier: 1,
  //   slideShadows : true,
  // },

  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 50,
    modifier: 6,
    slideShadows: false,
  },
});

var galleryTop = new Swiper(".swiper-container.testimonial", {
  speed: 400,
  spaceBetween: 50,
  autoplay: {
    delay: 30000,
    disableOnInteraction: false,
    //loop: true,
  },
  direction: "vertical",
  pagination: {
    clickable: true,
    el: ".swiper-pagination",
    type: "bullets",
  },
  thumbs: {
    swiper: galleryThumbs,
  },
});

// GitHub Contribution Widget Functionality
var initGitHubWidget = function () {
  const username = "utshabkg";

  // Hide loading and show calendar
  const loadingElement = document.getElementById("gh-widget-loading");
  const calendarElement = document.querySelector(".gh-widget-calendar");

  if (loadingElement && calendarElement) {
    // Check if GitHubCalendar is available
    if (typeof GitHubCalendar !== "undefined") {
      try {
        GitHubCalendar(calendarElement, username, {
          responsive: true,
          tooltips: true,
          global_stats: false,
        });

        // Hide loading state
        loadingElement.style.display = "none";
      } catch (error) {
        console.log("Error initializing GitHub calendar:", error);
        // Fallback: show basic message
        calendarElement.innerHTML =
          '<div style="text-align: center; padding: 40px; color: #8b949e;">GitHub contributions will be displayed here</div>';
        loadingElement.style.display = "none";
      }
    } else {
      // Fallback if library isn't loaded
      calendarElement.innerHTML =
        '<div style="text-align: center; padding: 40px; color: #8b949e;">GitHub calendar loading...</div>';
      loadingElement.style.display = "none";
    }

    // Fetch additional GitHub user data
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((userData) => {
        // Update user info
        const avatarElement = document.getElementById("gh-widget-userAvatar");
        const fullNameElement = document.getElementById("gh-widget-fullName");

        if (avatarElement && userData.avatar_url) {
          avatarElement.innerHTML = `<img src="${userData.avatar_url}" alt="${
            userData.name || username
          }" />`;
        }

        if (fullNameElement && userData.name) {
          fullNameElement.textContent = userData.name;
        }
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });

    // Set some default stats
    setTimeout(() => {
      const yearlyElement = document.getElementById(
        "gh-widget-yearlyContributions"
      );
      const longestElement = document.getElementById("gh-widget-longestStreak");
      const currentElement = document.getElementById("gh-widget-currentStreak");

      if (yearlyElement) yearlyElement.textContent = "200+";
      if (longestElement) longestElement.textContent = "15";
      if (currentElement) currentElement.textContent = "5";
    }, 1000);
  }
};
