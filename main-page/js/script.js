$(document).ready(function () {

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

        // scroll spy
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
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("lWo9qgrpbp9ujj_1e");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again. \nError: " + JSON.stringify(error));
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | A.VRAY";
            $("#favicon").attr("href", "assets/images/logo/white.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/logo/white.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["control theory", "reinforcement learning", "computer vision", "machine learning", "robotics", "deep learning"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    if (type === "skills") {
        response = await fetch("skills/skills.json")
    } else if (type === "config") {
        response = await fetch("config.json")
    } else if (type === "education") {
        response = await fetch("education/education.json")
    } else {
        response = await fetch("./projects/projects.json")
    }
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showEducation(educationData) {
    let educationContainer = document.querySelector("#education .box-container");
    let educationHTML = "";
    
    educationData.forEach(edu => {
        educationHTML += `
        <div class="box">
            <div class="image">
                <img draggable="false" src="./${edu.image}" alt="${edu.institution}">
            </div>
            <div class="content">
                <h3>${edu.degree}</h3>
                <p>${edu.institution}</p>
                <h4>${edu.period} | ${edu.status}</h4>
            </div>
        </div>`;
    });
    
    educationContainer.innerHTML = educationHTML;
}

async function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    
    // Récupérer la configuration
    const config = await fetchData("config");
    const featuredProjects = config.featured.projects;
    const maxProjects = config.display.maxProjectsOnHome;
    
    // Filtrer et limiter les projets
    let selectedProjects = projects;
    if (config.display.showOnlyFeatured) {
        selectedProjects = projects.filter(project => featuredProjects.includes(project.name));
    }
    selectedProjects = selectedProjects.slice(0, maxProjects);
    
    selectedProjects.forEach(project => {
        // Créer la liste des liens disponibles
        let linksHTML = '';
        if (project.links.report) {
            linksHTML += `<a href="projects/reports/${project.links.report}.pdf" class="btn" target="_blank" title="Report">
                <i class="fas fa-file-pdf"></i>
            </a>`;
        }
        if (project.links.poster) {
            linksHTML += `<a href="projects/posters/${project.links.poster}.pdf" class="btn" target="_blank" title="Poster">
                <i class="fas fa-image"></i>
            </a>`;
        }
        if (project.links.code) {
            linksHTML += `<a href="${project.links.code}" class="btn" target="_blank" title="Code">
                <i class="fas fa-code"></i>
            </a>`;
        }
        
        projectHTML += `
        <div class="box tilt">
            <img draggable="false" src="projects/images/${project.image}.jpg" alt="${project.name}" />
            <div class="project-title-overlay">
                <h3>${project.name}</h3>
            </div>
            <div class="content">
                <h3 class="project-title">${project.name}</h3>
                ${linksHTML ? `<div class="project-links">${linksHTML}</div>` : ''}
                <p class="project-desc">${project.desc}</p>
            </div>
        </div>`;
    });
    projectsContainer.innerHTML = projectHTML;
    

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->
    
    // Ajouter le support tactile pour mobile
    addMobileSupport();

}

// Fonction pour gérer le clic/tap sur mobile
function addMobileSupport() {
    const boxes = document.querySelectorAll('.work .box');
    
    boxes.forEach(box => {
        box.addEventListener('click', function(e) {
            // Si on clique sur un lien (bouton), ne pas interférer
            if (e.target.closest('.btn')) {
                return;
            }
            
            // Toggle la classe active
            const isActive = this.classList.contains('active');
            
            // Fermer tous les autres projets
            boxes.forEach(b => b.classList.remove('active'));
            
            // Toggle celui-ci
            if (!isActive) {
                this.classList.add('active');
            }
        });
    });
    
    // Fermer l'overlay si on clique en dehors
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.work .box')) {
            boxes.forEach(b => b.classList.remove('active'));
        }
    });
}

fetchData().then(data => {
    showSkills(data);
});

fetchData("education").then(data => {
    showEducation(data);
});

fetchData("projects").then(async data => {
    await showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
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

// // Start of Tawk.to Live Chat
// var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
// (function () {
//     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
//     s1.async = true;
//     s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
//     s1.charset = 'UTF-8';
//     s1.setAttribute('crossorigin', '*');
//     s0.parentNode.insertBefore(s1, s0);
// })();
// // End of Tawk.to Live Chat