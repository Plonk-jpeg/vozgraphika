document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
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
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('loading');
    });
  }

  // Fonctionnalité du menu
  document.querySelector("html body header nav#header-menu-button div").onclick = function () {
    document.querySelector("button").classList.toggle("js-active");
    document.querySelector("html body header nav#header-menu-button .menu-panel ul").classList.toggle("js-active");
  };

  // Gestion des boutons pour ouvrir et fermer le modal
  const buttons = document.querySelectorAll("section.container-blender-work ul.blender-list li button");
  const modal = document.querySelector("html body .blender-reveal");
  const closeModalButton = document.querySelector("html main .blender-reveal button.close-modal");

  for (let button of buttons) {
    button.addEventListener("click", function () {
      modal.classList.add("js-active");
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Stopper le défilement
    });
  }

  closeModalButton.addEventListener("click", function () {
    modal.classList.remove("js-active");
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Stopper le défilement
  });

  // Gestion du défilement
  const opacityElements = document.querySelectorAll(".visible-on-scroll");
  let isScrolling;
  let totalDeltaY = 0; // Variable pour stocker la valeur cumulative de deltaY

  // Fonction pour gérer l'événement de défilement
  function handleScroll(event) {
    totalDeltaY += event.deltaY;

    // Assurez-vous que la valeur cumulative de deltaY ne devienne pas négative
    if (totalDeltaY < 0) {
      totalDeltaY = 0;
    }

    // Ajoutez ou supprimez la classe "fading" en fonction du défilement
    const videoElement = document.querySelector('.logotheque-arch-video');
    if (videoElement) {
      if (totalDeltaY >= 100) {
        videoElement.classList.add('fading');
      } else if (totalDeltaY === 0) {
        videoElement.classList.remove('fading');
      }
    }

    // Affichez la valeur cumulative dans la console
    console.log("Total DeltaY:", totalDeltaY);

    // Ajoutez ou supprimez la classe "fade" en fonction de la direction du défilement
    opacityElements.forEach((x) => x.classList.toggle("fade"));

    // Effacez le délai pour supprimer la classe "fade"
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      opacityElements.forEach((x) => x.classList.remove("fade"));
    }, 850);
  }

  // Écoutez l'événement de défilement
  window.addEventListener("wheel", handleScroll);

  // Intersection Observer pour la vidéo
  const videoElement = document.querySelector('.logotheque-arch-video');
  if (videoElement && "IntersectionObserver" in window) {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // 10% visible
    };

    // Callback pour l'observer
    function observerCallback(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoElement.classList.remove('fading');
        } else {
          videoElement.classList.add('fading');
        }
      });
    }

    // Créez l'observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observez l'élément vidéo
    observer.observe(videoElement);
  }
});
