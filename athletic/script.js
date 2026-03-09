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
        
        // Filter timeline items
        if (filterValue === 'all') {
            $('.timeline-item').fadeIn(400);
        } else {
            $('.timeline-item').each(function() {
                const category = $(this).data('category');
                if (category === filterValue) {
                    $(this).fadeIn(400);
                } else {
                    $(this).fadeOut(400);
                }
            });
        }
    });

    // Mobile touch/click support for overlay
    $(document).on('click', '.timeline-card', function(e) {
        e.stopPropagation();
        
        // Remove active class from all other cards
        $('.timeline-card').not(this).removeClass('active');
        
        // Toggle active class on this card
        $(this).toggleClass('active');
    });

    // Close overlay when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.timeline-card').length) {
            $('.timeline-card').removeClass('active');
        }
    });
});

// Function to load performances from JSON
function loadPerformances() {
    $.getJSON('./performances.json', function(data) {
        const container = $('.timeline-container');
        container.empty();
        
        // Combine all performances (races AND adventures)
        const allPerformances = data.performances;
        
        // Group by year
        const groupedByYear = {};
        allPerformances.forEach(perf => {
            const year = perf.year || 'Unknown';
            if (!groupedByYear[year]) {
                groupedByYear[year] = [];
            }
            groupedByYear[year].push(perf);
        });
        
        // Sort years in descending order (Unknown/null dates at the end)
        const years = Object.keys(groupedByYear).sort((a, b) => {
            if (a === 'Unknown') return 1;
            if (b === 'Unknown') return -1;
            return b - a;
        });
        
        // Build timeline with grid layout
        years.forEach((year, yearIndex) => {
            // Skip "Unknown" year section if we want to hide undated items
            // Comment the next line to show undated adventures
            // if (year === 'Unknown') return;
            
            // Add year marker
            const yearLabel = year === 'Unknown' ? 'Adventures (Date TBD)' : year;
            const yearMarker = $(`
                <div class="timeline-year-marker">
                    <div class="year-badge">${yearLabel}</div>
                    <div class="year-line"></div>
                </div>
            `);
            container.append(yearMarker);
            
            // Create grid container for this year's performances
            const gridContainer = $('<div class="timeline-year-content"></div>');
            
            // Sort performances within the year by month (descending)
            const performances = groupedByYear[year].sort((a, b) => {
                // Adventures without dates come last in their year section
                if (!a.month && !b.month) return 0;
                if (!a.month) return 1;
                if (!b.month) return -1;
                return b.month - a.month;
            });
            
            performances.forEach((perf, index) => {
                const item = createTimelineItem(perf, yearIndex * 100 + index * 30);
                gridContainer.append(item);
            });
            
            container.append(gridContainer);
        });
        
    }).fail(function() {
        console.error('Error loading performances.json');
        $('.timeline-container').html('<p style="text-align:center; color:#fff; font-size:2rem;">Error loading performances. Please try again later.</p>');
    });
}

// Get month name
function getMonthName(monthNum) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNum - 1] || '';
}

// Function to create stats overlay content
function createStatsOverlay(perf) {
    const activityType = perf.activity_type || 'performance';
    
    if (activityType === 'performance') {
        let statsHTML = '';
        
        // Position
        if (perf.position) {
            statsHTML += `
                <div class="stat-item">
                    <i class="fas fa-trophy"></i>
                    <span class="stat-label">Position:</span>
                    <span class="stat-value">${perf.position}</span>
                </div>
            `;
        }
        
        // Distance - check if triathlon with split data
        if (perf.distance) {
            if (perf.sport === 'triathlon' && typeof perf.distance === 'object') {
                // Triathlon distances in one block
                let distanceDetails = '';
                if (perf.distance.swim) {
                    distanceDetails += `
                        <div class="tri-detail">
                            <i class="fas fa-swimmer"></i>
                            <span>${perf.distance.swim}</span>
                        </div>
                    `;
                }
                if (perf.distance.bike) {
                    const bikeElevation = (perf.elevation && perf.elevation.bike) ? ` <span class="elevation">(D+ ${perf.elevation.bike})</span>` : '';
                    distanceDetails += `
                        <div class="tri-detail">
                            <i class="fas fa-bicycle"></i>
                            <span>${perf.distance.bike}${bikeElevation}</span>
                        </div>
                    `;
                }
                if (perf.distance.run) {
                    const runElevation = (perf.elevation && perf.elevation.run) ? ` <span class="elevation">(D+ ${perf.elevation.run})</span>` : '';
                    distanceDetails += `
                        <div class="tri-detail">
                            <i class="fas fa-running"></i>
                            <span>${perf.distance.run}${runElevation}</span>
                        </div>
                    `;
                }
                statsHTML += `
                    <div class="stat-item stat-group">
                        <div class="stat-header">
                            <i class="fas fa-road"></i>
                            <span class="stat-label">Distance:</span>
                        </div>
                        <div class="stat-details">
                            ${distanceDetails}
                        </div>
                    </div>
                `;
            } else {
                // Single distance with optional elevation
                const elevationText = perf.elevation ? ` <span class="elevation">(D+ ${perf.elevation})</span>` : '';
                statsHTML += `
                    <div class="stat-item">
                        <i class="fas fa-road"></i>
                        <span class="stat-label">Distance:</span>
                        <span class="stat-value">${perf.distance}${elevationText}</span>
                    </div>
                `;
            }
        } else if (perf.elevation) {
            // Elevation only (no distance)
            statsHTML += `
                <div class="stat-item">
                    <i class="fas fa-mountain"></i>
                    <span class="stat-label">D+:</span>
                    <span class="stat-value">${perf.elevation}</span>
                </div>
            `;
        }
        
        // Time - check if triathlon with split data
        if (perf.time) {
            if (perf.sport === 'triathlon' && typeof perf.time === 'object') {
                // Triathlon times in one block
                let timeDetails = '';
                if (perf.time.swim) {
                    timeDetails += `
                        <div class="tri-detail">
                            <i class="fas fa-swimmer"></i>
                            <span>${perf.time.swim}</span>
                        </div>
                    `;
                }
                if (perf.time.bike) {
                    timeDetails += `
                        <div class="tri-detail">
                            <i class="fas fa-bicycle"></i>
                            <span>${perf.time.bike}</span>
                        </div>
                    `;
                }
                if (perf.time.run) {
                    timeDetails += `
                        <div class="tri-detail">
                            <i class="fas fa-running"></i>
                            <span>${perf.time.run}</span>
                        </div>
                    `;
                }
                if (perf.time.total) {
                    timeDetails += `
                        <div class="tri-detail tri-total">
                            <i class="fas fa-stopwatch"></i>
                            <span>${perf.time.total}</span>
                        </div>
                    `;
                }
                statsHTML += `
                    <div class="stat-item stat-group">
                        <div class="stat-header">
                            <i class="fas fa-clock"></i>
                            <span class="stat-label">Temps:</span>
                        </div>
                        <div class="stat-details">
                            ${timeDetails}
                        </div>
                    </div>
                `;
            } else {
                statsHTML += `
                    <div class="stat-item">
                        <i class="fas fa-stopwatch"></i>
                        <span class="stat-label">Time:</span>
                        <span class="stat-value">${perf.time}</span>
                    </div>
                `;
            }
        }
        
        return statsHTML ? `<div class="stats-overlay">${statsHTML}</div>` : '';
        
    } else if (activityType === 'solidarity' || activityType === 'adventure') {
        // Display distance/stats and description for solidarity and adventure
        let contentHTML = '';
        
        // Distance with optional elevation
        if (perf.distance) {
            const elevationText = perf.elevation ? ` <span class="elevation">(D+ ${perf.elevation})</span>` : '';
            contentHTML += `
                <div class="stat-item">
                    <i class="fas fa-road"></i>
                    <span class="stat-label">Distance:</span>
                    <span class="stat-value">${perf.distance}${elevationText}</span>
                </div>
            `;
        }
        
        // Time if available
        if (perf.time) {
            contentHTML += `
                <div class="stat-item">
                    <i class="fas fa-stopwatch"></i>
                    <span class="stat-label">Time:</span>
                    <span class="stat-value">${perf.time}</span>
                </div>
            `;
        }
        
        // Description
        const description = perf.details || (activityType === 'solidarity' ? 'Solidarity race - supporting a good cause' : 'An unforgettable adventure');
        if (description) {
            contentHTML += `<div class="stat-description">${description}</div>`;
        }
        
        return `
            <div class="stats-overlay">
                ${contentHTML}
            </div>
        `;
    }
    
    return '';
}

// Function to create a timeline item
function createTimelineItem(perf, delay) {
    const sportIcons = {
        'cycling': 'fa-bicycle',
        'running': 'fa-running',
        'trail': 'fa-mountain',
        'climbing': 'fa-mountain',
        'skiing': 'fa-skiing',
        'triathlon': 'fa-swimmer',
        'backcountry skiing': 'fa-skiing-nordic'
    };
    
    const activityTypeIcons = {
        'adventure': 'fa-mountain',
        'performance': 'fa-trophy',
        'solidarity': 'fa-heart'
    };
    
    const activityTypeLabels = {
        'adventure': 'Adventure',
        'performance': 'Performance',
        'solidarity': 'Solidarity'
    };
    
    const icon = sportIcons[perf.sport] || 'fa-medal';
    const isAdventure = perf.type === 'adventure';
    const activityType = perf.activity_type || 'performance';
    const activityIcon = activityTypeIcons[activityType] || 'fa-medal';
    const activityLabel = activityTypeLabels[activityType] || 'Performance';
    
    // Special handling for triathlon badge with 3 icons
    let sportBadgeHTML = '';
    if (perf.sport === 'triathlon') {
        sportBadgeHTML = `
            <div class="sport-badge ${perf.sport}">
                <div class="tri-top">
                    <i class="fas fa-swimmer"></i>
                </div>
                <div class="tri-bottom">
                    <i class="fas fa-bicycle"></i>
                    <i class="fas fa-running"></i>
                </div>
            </div>
        `;
    } else {
        sportBadgeHTML = `
            <div class="sport-badge ${perf.sport}">
                <i class="fas ${icon}"></i>
            </div>
        `;
    }
    
    // Date display
    let dateHTML = '';
    if (perf.month && perf.year) {
        const monthName = getMonthName(perf.month);
        dateHTML = `
            <div class="timeline-date">
                <i class="fas fa-calendar-alt"></i>
                <span>${monthName} ${perf.year}</span>
            </div>
        `;
    } else if (isAdventure) {
        dateHTML = `
            <div class="timeline-date">
                <i class="fas fa-mountain"></i>
                <span>Adventure</span>
            </div>
        `;
    }
    
    // Build image HTML
    let imageHTML = '';
    const statsOverlay = createStatsOverlay(perf);
    
    if (perf.bib_image) {
        imageHTML = `
            <div class="timeline-images">
                <img class="main-image" src="${perf.main_image}" alt="${perf.name}" onerror="this.src='./images/hero.png'">
                <img class="bib-image" src="${perf.bib_image}" alt="${perf.name} Bib" onerror="this.style.display='none'">
                ${statsOverlay}
            </div>
        `;
    } else {
        imageHTML = `
            <div class="timeline-images">
                <img class="main-image" src="${perf.main_image}" alt="${perf.name}" onerror="this.src='./images/hero.png'">
                ${statsOverlay}
            </div>
        `;
    }
    
    const item = $(`
        <div class="timeline-item" data-category="${perf.sport}" style="opacity: 0; transform: translateY(-20px);">
            <div class="timeline-content">
                ${dateHTML}
                <div class="timeline-card ${isAdventure ? 'adventure' : ''}">
                    ${sportBadgeHTML}
                    ${imageHTML}
                    <div class="card-info">
                        <h3>${perf.name}</h3>
                        ${(perf.details && activityType !== 'adventure' && activityType !== 'solidarity') ? `<p>${perf.details}</p>` : ''}
                        <div class="activity-type-badge ${activityType}">
                            <i class="fas ${activityIcon}"></i>
                            <span>${activityLabel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    // Animate in
    setTimeout(() => {
        item.css({
            'opacity': '1',
            'transform': 'translateY(0)',
            'transition': 'all 0.4s ease'
        });
    }, delay);
    
    return item;
}

// Function to create an adventure item - DEPRECATED, now using createTimelineItem
function createAdventureItem(adv, delay) {
    return createTimelineItem(adv, delay);
}
