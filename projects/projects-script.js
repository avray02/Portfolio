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
    });

    // smooth scrolling - uniquement pour les liens internes (même page)
    $('a[href*="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        
        // Vérifier si c'est un lien interne (commence par # ou contient uniquement #section)
        // Ne pas empêcher la navigation si le lien pointe vers une autre page
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(href).offset().top - 50,
            }, 500, 'linear')
        }
        // Sinon, laisser le lien fonctionner normalement (navigation vers /index.html#section)
    });
});

async function fetchProjects() {
    const response = await fetch("/projects/projects.json");
    const data = await response.json();
    return data;
}

// Variable globale pour stocker tous les projets
let allProjects = [];
let currentFilter = 'all';

async function showAllProjects(filter = 'all') {
    let projectsContainer = document.querySelector("#work .box-container");
    if (!projectsContainer) {
        console.error("Projects container not found!");
        return;
    }
    
    // Si les projets ne sont pas encore chargés, les charger
    if (allProjects.length === 0) {
        allProjects = await fetchProjects();
    }
    
    let projectHTML = "";
    
    // Filtrer les projets selon la catégorie
    let filteredProjects = allProjects;
    if (filter !== 'all') {
        filteredProjects = allProjects.filter(project => {
            // Gérer les projets avec plusieurs catégories (séparées par un espace)
            const categories = project.category.toLowerCase().split(' ');
            return categories.includes(filter.toLowerCase());
        });
    }
    
    // Afficher les projets filtrés
    filteredProjects.forEach(project => {
        // Créer la liste des liens disponibles
        let linksHTML = '';
        if (project.links.report) {
            linksHTML += `<a href="/projects/reports/${project.links.report}.pdf" class="btn" target="_blank" title="Report">
                <i class="fas fa-file-pdf"></i>
            </a>`;
        }
        if (project.links.poster) {
            linksHTML += `<a href="/projects/posters/${project.links.poster}.pdf" class="btn" target="_blank" title="Poster">
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
            <img draggable="false" src="/projects/images/${project.image}.png" alt="${project.name}" />
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
    
    // Si aucun projet ne correspond au filtre
    if (filteredProjects.length === 0) {
        projectHTML = `<p class="no-projects">No projects found in this category.</p>`;
    }
    
    projectsContainer.innerHTML = projectHTML;
    
    // Initialiser l'effet tilt
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    
    // Animation scroll reveal
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });
    
    srtop.reveal('.work .box', { interval: 200 });
}

// Gestionnaire d'événements pour les boutons de filtrage
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Obtenir la catégorie du filtre
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;
            
            // Afficher les projets filtrés
            showAllProjects(filter);
        });
    });
}

// Charger les projets au chargement de la page
showAllProjects();

// Configurer les boutons de filtrage
setupFilterButtons();

// Désactiver le mode développeur
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

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });
