$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if(window.scrollY>60){
            document.querySelector('#scroll-top').classList.add('active');
        }else{
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });

    loadExperiences();
});

function loadExperiences() {
  $.getJSON('../src/data/experiences.json', function(experiences) {
    const timeline = document.querySelector('#experience .timeline');
    if (!timeline) return;

    timeline.innerHTML = experiences.map((experience, index) => `
      <div class="container ${experience.side || (index % 2 ? 'left' : 'right')}">
        <div class="content">
          <div class="tag"><h2>${experience.company}</h2></div>
          <div class="desc"><h3>${experience.role}</h3><p>${experience.period}</p></div>
          <div class="experience-details">
            ${experience.details.map(detail => `<p>${detail}</p>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    addExperienceMobileSupport();
  }).fail(function() {
    console.error('Unable to load experiences.json');
  });
}

// Start of Tawk.to Live Chat
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
// End of Tawk.to Live Chat


// disable developer mode
document.onkeydown = function(e) {
  if(e.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}

document.addEventListener('visibilitychange',
function(){
    if(document.visibilityState === "visible"){
        document.title = "Experience | Portfolio Jigar Sable";
        $("#favicon").attr("href","../src/assets/images/common/favicon.png");
    }
    else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href","../src/assets/images/common/favhand.png");
    }
});

// Support mobile/tactile pour les expériences
function addExperienceMobileSupport() {
document.querySelectorAll('.experience .container').forEach(container => {
    container.addEventListener('click', function(e) {
        // Sur mobile (écrans < 768px), basculer la classe active au clic
        if (window.innerWidth <= 768) {
            e.preventDefault();
            // Retirer la classe active des autres containers
            document.querySelectorAll('.experience .container').forEach(c => {
                if (c !== this) {
                    c.classList.remove('active');
                }
            });
            // Basculer la classe active sur le container cliqué
            this.classList.toggle('active');
        }
    });
});
}
