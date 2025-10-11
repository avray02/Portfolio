// Athletic Performances JavaScript

$(document).ready(function () {
    // Menu toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll handling
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(href).offset().top - 80,
            }, 500, 'linear');
        }
    });

    // Load performances from JSON
    loadPerformances();

    // Filter functionality
    $('.filter-btn').on('click', function() {
        const filterValue = $(this).data('filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter cards
        if (filterValue === 'all') {
            $('.performance-card').fadeIn(400).removeClass('hidden');
        } else {
            $('.performance-card').each(function() {
                const category = $(this).data('category');
                if (category === filterValue) {
                    $(this).fadeIn(400).removeClass('hidden');
                } else {
                    $(this).fadeOut(400, function() {
                        $(this).addClass('hidden');
                    });
                }
            });
        }
    });
});

// Function to load performances from JSON
function loadPerformances() {
    $.getJSON('./performances.json', function(data) {
        const container = $('.performance-grid');
        container.empty(); // Clear existing cards
        
        data.performances.forEach((perf, index) => {
            const card = createPerformanceCard(perf);
            container.append(card);
            
            // Entrance animation
            setTimeout(() => {
                card.css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }, index * 100);
        });
    }).fail(function() {
        console.error('Error loading performances.json');
        $('.performance-grid').html('<p style="text-align:center; color:#fff; font-size:2rem;">Error loading performances. Please try again later.</p>');
    });
}

// Function to create a performance card
function createPerformanceCard(perf) {
    const sportIcons = {
        'cycling': 'fa-bicycle',
        'running': 'fa-running',
        'climbing': 'fa-mountain',
        'skiing': 'fa-skiing',
        'triathlon': 'fa-swimmer'
    };
    
    const icon = sportIcons[perf.sport] || 'fa-medal';
    
    // Build details HTML based on sport
    let detailsHTML = '';
    
    if (perf.sport === 'triathlon') {
        detailsHTML = `
            <div class="detail-item">
                <i class="fas fa-swimmer"></i>
                <span>Swim: ${perf.swim}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-bicycle"></i>
                <span>Bike: ${perf.bike}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-running"></i>
                <span>Run: ${perf.run}</span>
            </div>
            ${perf.time ? `<div class="detail-item">
                <i class="fas fa-clock"></i>
                <span>Total: ${perf.time}</span>
            </div>` : ''}
        `;
    } else {
        if (perf.distance) {
            detailsHTML += `
                <div class="detail-item">
                    <i class="fas fa-map-marked-alt"></i>
                    <span>Distance: ${perf.distance}</span>
                </div>
            `;
        }
        if (perf.elevation) {
            detailsHTML += `
                <div class="detail-item">
                    <i class="fas fa-mountain"></i>
                    <span>Elevation: ${perf.elevation}</span>
                </div>
            `;
        }
        if (perf.level) {
            detailsHTML += `
                <div class="detail-item">
                    <i class="fas fa-flag-checkered"></i>
                    <span>Level: ${perf.level}</span>
                </div>
            `;
        }
        if (perf.time) {
            detailsHTML += `
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>Time: ${perf.time}</span>
                </div>
            `;
        }
        if (perf.position) {
            detailsHTML += `
                <div class="detail-item">
                    <i class="fas fa-trophy"></i>
                    <span>Position: ${perf.position}</span>
                </div>
            `;
        }
    }
    
    // Build image HTML with main image and optional bib image
    let imageHTML = '';
    if (perf.bib_image) {
        // Has both main image and bib image
        imageHTML = `
            <img class="main-image" src="${perf.main_image}" alt="${perf.name}" onerror="this.src='./images/hero.png'">
            <img class="bib-image" src="${perf.bib_image}" alt="${perf.name} Bib" onerror="this.style.display='none'">
            <div class="bib-badge">
                <i class="fas fa-id-card"></i>
                <span>Hover for bib</span>
            </div>
        `;
    } else {
        // Only main image
        imageHTML = `
            <img src="${perf.main_image}" alt="${perf.name}" onerror="this.src='./images/hero.png'">
        `;
    }
    
    const card = $(`
        <div class="performance-card" data-category="${perf.sport}" style="opacity: 0; transform: translateY(30px);">
            <div class="card-header">
                <div class="sport-icon ${perf.sport}">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="card-date">${perf.year}</div>
            </div>
            <div class="card-image">
                ${imageHTML}
            </div>
            <div class="card-content">
                <h3>${perf.name}</h3>
                <div class="performance-details">
                    ${detailsHTML}
                </div>
            </div>
        </div>
    `);
    
    return card;
}
