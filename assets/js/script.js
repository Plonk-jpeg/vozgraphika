document.addEventListener("DOMContentLoaded", function () {
  let preventRemoveFading = false;

  function addFadingClass(element) {
    if (element) {
      element.classList.add('fading');
    }
  }
  const socialLinks = document.querySelectorAll(".socials a");
  const videoElement = document.querySelector('.star-warp-video');
  const loader = document.querySelector('.loader');
  const videoFront = document.querySelector('.video-front');
  const videoBg = document.querySelector('.video-bg video');
  let videosLoaded = false;
  let pageLoaded = false;

  // Function to detect a mobile or touch device
  function isMobileOrTouchDevice() {
    return /Mobi|Android|Touch/i.test(navigator.userAgent);
  }

  // Function to check if the screen is desktop-sized
  function isDesktop() {
    return window.innerWidth > 1024;
  }

  // Function to hide the loader
  function hideLoader(loader) {
    loader.classList.add('hidden');
    loader.addEventListener('transitionend', () => {
      loader.remove();
    });
  }

  // Function to check if both videos are loaded
  function checkVideosLoaded(videoFront, videoBg, loader, pageLoaded, hideLoader) {
    if (videoFront.readyState >= 3 && videoBg.readyState >= 3) {
      if (pageLoaded) {
        hideLoader(loader);
      }
    }
  }

  // Function to handle the intersection observer callback
  function observerCallback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!preventRemoveFading) {
          videoElement.classList.remove('fading');
        }
      } else {
        videoElement.classList.add('fading');
      }
    });
  }

  if (videoElement && !isDesktop()) {
    videoElement.style.display = 'none';
  }

  window.onload = function () {
    if (!isMobileOrTouchDevice()) {
      const videoContainer = document.querySelector('.star-warp-video');
      const video = document.createElement('video');
      video.src = 'assets/img/work/star-warp.mp4';
      video.playsInline = true;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      videoContainer.appendChild(video);
    } else {
      const videoContainer = document.querySelector('.star-warp-video');
      videoContainer.parentNode.removeChild(videoContainer);
      const video = document.querySelector('.star-warp-video video');
      if (video) {
        video.parentNode.removeChild(video);
      }
    }
  };

  // Event listeners for videos to check if they are ready
  videoFront.addEventListener('canplaythrough', () => checkVideosLoaded(videoFront, videoBg, loader, pageLoaded, hideLoader));
  videoBg.addEventListener('canplaythrough', () => checkVideosLoaded(videoFront, videoBg, loader, pageLoaded, hideLoader));

  // Fallback to hide loader after 3 seconds if videos take too long
  const timeout = setTimeout(() => {
    if (!videosLoaded) {
      hideLoader(loader);
    }
  }, 3000);

  // Hide loader when the page is fully loaded
  window.addEventListener('load', () => {
    pageLoaded = true;
    clearTimeout(timeout);
    if (videosLoaded) {
      hideLoader(loader);
    }
  });

  // Set random video background
  const randomNum = Math.floor(Math.random() * 14) + 1;
  const videoPath = `assets/video/video_${randomNum}.webm`;
  const logoElement = document.getElementById('randomBackground');
  logoElement.src = videoPath;
  logoElement.load();

  // Lazy load images
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.removeAttribute('loading');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('loading');
    });
  }

  // Menu button click event
  const menuButton = document.querySelector(".menu-btn button");
  const menuSpan = document.querySelector(".menu-btn span");
  const menuPanel = document.querySelector("#header-menu-button .menu-panel ul");

  function toggleMenu() {
    menuButton.classList.toggle("js-active");
    menuPanel.classList.toggle("js-active");

    if (menuButton.classList.contains("js-active")) {
      videoElement.classList.add("hidden-fade");
      videoElement.addEventListener("transitionend", function handleTransitionEnd() {
        videoElement.remove();
      });
    }

    addFadingClass(videoElement);
  }

  menuButton.addEventListener("click", toggleMenu);
  menuSpan.addEventListener("click", toggleMenu);
  // Modal functionality
  const buttons = document.querySelectorAll("section.container-blender-work ul.blender-list li button");
  const modal = document.querySelector(".blender-reveal");
  const closeModalButton = document.querySelector(".blender-reveal button.close-modal");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      modal.classList.add("js-active");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  closeModalButton.addEventListener("click", function () {
    modal.classList.remove("js-active");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll event for opacity elements
  const opacityElements = document.querySelectorAll(".visible-on-scroll");
  let isScrolling;
  let totalDeltaY = 0;

  function handleScroll(event) {
    totalDeltaY += event.deltaY;
    if (totalDeltaY < 0) {
      totalDeltaY = 0;
    }
    if (videoElement) {
      if (totalDeltaY >= 100) {
        videoElement.classList.add('fading');
      } else if (totalDeltaY === 0 && !preventRemoveFading) {
        videoElement.classList.remove('fading');
      }
    }
    opacityElements.forEach((x) => x.classList.toggle("fade"));
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      opacityElements.forEach((x) => x.classList.remove("fade"));
    }, 850);
  }

  window.addEventListener("wheel", handleScroll);

  // Navigation buttons click event
  const navButtons = document.querySelectorAll(".slct-btn");
  navButtons.forEach(button => {
    button.addEventListener('click', function () {
      preventRemoveFading = true;
      setTimeout(() => {
        preventRemoveFading = false;
      }, 1000);
    });
  });

  // Intersection observer for fading effect on video element
  if (videoElement && "IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(videoElement);
  }

  // Intersection observer for addendum container
  let timer;
  const addendumObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timer = setTimeout(() => {
          const addendumContainer = document.querySelector('.slide-container-multi-addendum-container');
          addendumContainer.classList.add('visible');
        }, 3000);
      } else {
        clearTimeout(timer);
      }
    });
  }, {
    threshold: 0.1
  });

  const addendumElement = document.querySelector('.slide-content-multi-bg');
  addendumObserver.observe(addendumElement);

  // Handle click on social links
  socialLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();  // Empêche la redirection immédiate

      const span = this.nextElementSibling;
      if (span) {
        span.style.transform = 'scale(500)';

        setTimeout(() => {
          window.location.href = this.href;  // Redirection après 0.25s

          // Remet l'échelle à son état initial après 0.25s
          setTimeout(() => {
            span.style.transform = 'scale(1)';
          }, 250);
        }, 250);
      }
    });
  });
  socialLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();  // Empêche la redirection immédiate

      const span = this.nextElementSibling;
      if (span) {
        span.style.transform = 'scale(500)';

        setTimeout(() => {
          window.location.href = this.href;  // Redirection après 0.25s

          // Remet l'échelle à son état initial après 0.25s
          setTimeout(() => {
            span.style.transform = 'scale(1)';
          }, 250);
        }, 250);
      }
    });
  });
});
