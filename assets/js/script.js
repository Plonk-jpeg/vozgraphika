// Fonction pour détecter un appareil mobile ou un PC avec un écran tactile
function isMobileOrTouchDevice() {
  return /Mobi|Android|Touch/i.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded", function () {
  let preventRemoveFading = false;
  const videoElement = document.querySelector('.star-warp-video');

  function isDesktop() {
    return window.innerWidth > 1024;
  }

  if (videoElement && !isDesktop()) {
    videoElement.style.display = 'none';
  }

  function addFadingClass() {
    if (videoElement) {
      videoElement.classList.add('fading');
    }
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

  const menuButton = document.querySelector("html body header nav#header-menu-button div");
  const menuPanel = document.querySelector("html body header nav#header-menu-button .menu-panel ul");

  menuButton.onclick = function () {
    document.querySelector("button").classList.toggle("js-active");
    menuPanel.classList.toggle("js-active");
    addFadingClass();
  };

  const buttons = document.querySelectorAll("section.container-blender-work ul.blender-list li button");
  const modal = document.querySelector("html body .blender-reveal");
  const closeModalButton = document.querySelector("html main .blender-reveal button.close-modal");

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
    console.log("Total DeltaY:", totalDeltaY);
    opacityElements.forEach((x) => x.classList.toggle("fade"));
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      opacityElements.forEach((x) => x.classList.remove("fade"));
    }, 850);
  }

  window.addEventListener("wheel", handleScroll);

  const navButtons = document.querySelectorAll(".slct-btn");
  navButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      preventRemoveFading = true;
      setTimeout(() => {
        preventRemoveFading = false;
      }, 1000);
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  function observerCallback(entries, observer) {
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

  if (videoElement && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(videoElement);
  }
});
