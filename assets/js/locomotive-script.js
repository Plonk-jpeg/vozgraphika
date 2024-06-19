document.addEventListener("DOMContentLoaded", function (event) {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        lerp: 0.08,
        mobile: {
            breakpoint: 0,
            smooth: false,
            multiplier: 2,
            touchMultiplier: 2,
        },
        tablet: {
            breakpoint: 0,
            smooth: false,
        }
    });
    scroll.destroy();

    scroll.init();

    let pageHeight;
    window.addEventListener('load', function () {
        pageHeight = document.body.offsetHeight;
        console.log(pageHeight);
    });

    const changeColor = document.querySelector("html body header .header-logo");
    pageHeight = document.body.offsetHeight;
    const margin = 85;

    scroll.on('scroll', function (scroll) {
        const distanceScrolled = scroll.scroll.y;
        const windowHeight = window.innerHeight;

        if (distanceScrolled + windowHeight >= pageHeight - margin) {
            changeColor.classList.add("js-active");
            console.log('Vous avez atteint la fin de la page !');
        } else {
            changeColor.classList.remove("js-active");
        }
    });

    console.log(pageHeight);
    console.log(document.body.offsetWidth);

    const scrollTo = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-section]"),
        smooth: true,
    });

    let i = null;

    //main illustration section
    for (let e = 0; e < document.querySelectorAll(".selected-work-nav button").length; e++) {
        document.querySelectorAll(".selected-work-nav button")[e].addEventListener("click", (t => {
            t.preventDefault();
            let index = t.currentTarget.getAttribute("data-index");
            imagework.slideToLoop(index);
            scroll.scrollTo("#setList-1", {
                duration: 750,
                offset: -2000,
            });
            console.log("l'index est le:", e);

            // Ajoutez le délai pour appliquer l'opacité après un clic sur le bouton de navigation
            setTimeout(() => {
                const element = document.querySelector(".info-item.js-active ul:first-child li em");
                if (element) {
                    element.style.opacity = "0.33";
                }
            }, 1500);
        }), false);
    }

    let swiper = new Swiper(".swiper-container--marquee", {
        init: true,
        loop: true,
        speed: 1500,
        centeredSlides: true,
        allowTouchMove: 0,
        slidesPerView: 2,
        effect: "flip",
        flipEffect: {
            rotate: 180,
            slideShadows: false,
        },
        autoplay: {
            delay: 2500,
        },
    });

    //selected work swiper section
    let imagework = new Swiper(".swiper-container--selected-work", {
        init: true,
        loop: false,
        speed: 1000,
        slidesPerView: "auto",
        allowTouchMove: true,
        centeredSlides: true,
        effect: "coverflow",
        coverflowEffect: {
            slideShadows: false,
            modifier: 1,
            rotate: -5,
            depth: 200,
        },
        autoplay: {
            delay: 750000,
            disableOnInteraction: false,
        },
    });

    let worklist = new Swiper(".swiper-container--3", {
        init: true,
        effect: "coverflow",
        coverflowEffect: {
            slideShadows: false,
            modifier: 1,
            rotate: -5,
            stretch: -40,
            depth: 200,
        },
        loop: 1,
        allowTouchMove: false,
        slidesPerView: "auto",
        centeredSlides: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Ajout d'un délai pour appliquer l'opacité initiale
    function applyInitialOpacity() {
        setTimeout(() => {
            const element = document.querySelector(".info-item.js-active ul:first-child li em");
            if (element) {
                element.style.opacity = "0.33";
            }
        }, 1500);
    }

    // Appliquer l'opacité initiale à l'init
    imagework.on("init", (function () {
        document.querySelectorAll(".setlist-for-selected-work .info-item")[0].classList.add("js-active");
        document.querySelectorAll(".selected-work-nav button")[0].classList.add("js-active");
        console.log(imagework);

        applyInitialOpacity();
    }));
    // Fonctionnalité des boutons de menu
    const menuButtons = document.querySelectorAll("#menu1, #menu2, #menu3");
    menuButtons.forEach(button => {
        button.addEventListener("click", e => {
            const id = e.currentTarget.id;
            scroll.scrollTo(`#setList-${id[id.length - 1]}`, { duration: 750 });
        });
    });
    // Appliquer l'opacité lors du changement de slide
    imagework.on("slideChange", (function () {
        for (let e = 0; e < document.querySelectorAll(".setlist-for-selected-work .info-item").length; e++) {
            if (this.realIndex == e) {
                document.querySelectorAll(".setlist-for-selected-work .info-item")[e].classList.add("js-active");

                // Ajoutez le délai pour appliquer l'opacité
                applyInitialOpacity();
            } else {
                
                document.querySelectorAll(".setlist-for-selected-work .info-item")[e].classList.remove("js-active");

                // Réinitialiser l'opacité des éléments non actifs
                const element = document.querySelectorAll(".setlist-for-selected-work .info-item ul:first-child li em")[e];
                if (element) {
                    element.style.opacity = "";
                }
            }
        }

        for (let e = 0; e < document.querySelectorAll(".selected-work-nav button").length; e++) {
            this.realIndex == e ? document.querySelectorAll(".selected-work-nav button")[e].classList.add("js-active") : document.querySelectorAll(".selected-work-nav button")[e].classList.remove("js-active");
        }
    }));

    for (let e = 0; e < document.querySelectorAll(".selected-work-nav button").length; e++) {
        document.querySelectorAll(".selected-work-nav button")[e].addEventListener("click", (t => {
            t.preventDefault();
            let index = t.currentTarget.getAttribute("data-index");
            imagework.slideToLoop(index);
            scroll.scrollTo("#setList-1", {
                duration: 750,
            });
            console.log("l'index est le:", e);

            // Ajoutez le délai pour appliquer l'opacité après un clic sur le bouton de navigation
            applyInitialOpacity();
        }), false);
    }
});
