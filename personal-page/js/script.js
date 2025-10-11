// Personal page JavaScript

$(document).ready(function () {
    // Gérer le scroll vers l'ancre au chargement de la page
    if (window.location.hash) {
        // Attendre que tout soit chargé
        setTimeout(function() {
            const hash = window.location.hash;
            const target = $(hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800, 'swing');
            }
        }, 500); // Délai pour s'assurer que la page est complètement chargée
    }

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Active menu highlighting based on scroll position
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });

        // Animate elements on scroll
        $('.pillar-icon-item, .impact-box, .discovery-card, .photo-item, .timeline-item').each(function() {
            let elementTop = $(this).offset().top;
            let elementBottom = elementTop + $(this).outerHeight();
            let viewportTop = $(window).scrollTop();
            let viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).css('opacity', '1');
                $(this).css('transform', 'translateY(0)');
            }
        });
    });

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(href).offset().top - 50,
            }, 500, 'linear')
        }
    });
});

// Vanta.js Waves Effect
let vantaEffect;
if (typeof VANTA !== 'undefined') {
    vantaEffect = VANTA.WAVES({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x5a7a9a,        // Gris-bleu clair et doux
        backgroundColor: 0x2a3545, // Fond gris plus lumineux
        shininess: 60.00,       // Encore plus brillant
        waveHeight: 18.00,
        waveSpeed: 0.75,
        zoom: 0.65
    });

    // Resize handler to ensure waves always fill the section
    window.addEventListener('resize', function() {
        if (vantaEffect) {
            vantaEffect.resize();
        }
    });
}

// Typed.js effect for personal page
var typed = new Typed(".typing-text", {
    strings: ["Endlessly Curious", "Passionate", "Collaborative", "Perseverant"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// Vanilla Tilt effect
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});

// Visibility change handler
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Personal Life | A.Vray";
        $("#favicon").attr("href", "assets/images/logo/white.png");
    } else {
        document.title = "Come Back!";
        $("#favicon").attr("href", "assets/images/logo/white.png");
    }
});

// Disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe passion boxes and value items
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.passion-box, .value-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
