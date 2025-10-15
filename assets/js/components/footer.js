// Footer Component - Génère le footer pour toutes les pages du portfolio

class PortfolioFooter {
    constructor() {
        this.footerData = {
            description: "Thank you for visiting my personal portfolio website. Connect with me over social networks.",
            quickLinks: [
                { text: "home", href: "#home", icon: "fas fa-chevron-circle-right" },
                { text: "about", href: "#about", icon: "fas fa-chevron-circle-right" },
                { text: "skills", href: "#skills", icon: "fas fa-chevron-circle-right" },
                { text: "education", href: "#education", icon: "fas fa-chevron-circle-right" },
                { text: "work", href: "#work", icon: "fas fa-chevron-circle-right" },
                { text: "experience", href: "#experience", icon: "fas fa-chevron-circle-right" }
            ],
            contact: {
                phone: "+41 78 305 42 17",
                phoneLink: "tel:+41783054217",
                email: "vray.av@outlook.com",
                emailLink: "mailto:vray.av@outlook.com",
                location: "Renens, Switzerland - 1024"
            },
            social: [
                { name: "LinkedIn", url: "https://www.linkedin.com/in/avray", icon: "fab fa-linkedin" },
                { name: "GitHub", url: "https://github.com/avray02", icon: "fab fa-github" },
                { name: "Mail", url: "mailto:vray.av@outlook.com", icon: "fas fa-envelope" },
                { name: "Telegram", url: "https://t.me/alexandrevray", icon: "fab fa-telegram-plane" }
            ],
            credit: {
                text: "Designed with",
                designer: "Alexandre VRAY",
                designerUrl: "https://www.linkedin.com/in/avray"
            }
        };
    }

    // Détermine le chemin relatif vers index.html selon la page actuelle
    getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/projects/') || path.includes('/experience/') || path.includes('/personal-page/') || path.includes('/about/')) {
            return '../index.html';
        }
        return 'index.html';
    }

    render() {
        const basePath = this.getBasePath();
        
        return `
        <!-- footer section starts -->
        <section class="footer">

          <div class="box-container">

              <div class="box">
                  <h3>Alexandre's Portfolio</h3>
                  <p>${this.footerData.description}</p>
              </div>

              <div class="box">
                  <h3>quick links</h3>
                  ${this.footerData.quickLinks.map(link => `
                      <a href="${basePath}${link.href}"><i class="${link.icon}"></i> ${link.text}</a>
                  `).join('')}
              </div>

              <div class="box">
                  <h3>contact info</h3>
                  <p><i class="fas fa-phone"></i><a href="${this.footerData.contact.phoneLink}">${this.footerData.contact.phone}</a></p>
                  <p><i class="fas fa-envelope"></i><a href="${this.footerData.contact.emailLink}">${this.footerData.contact.email}</a></p>
                  <p><i class="fas fa-map-marked-alt"></i>${this.footerData.contact.location}</p>
                  <div class="share">
                      ${this.footerData.social.map(social => `
                          <a href="${social.url}" class="${social.icon}" aria-label="${social.name}" target="_blank"></a>
                      `).join('')}
                  </div>
              </div>
          </div>

          <h1 class="credit">${this.footerData.credit.text} <i class="fa fa-heart pulse"></i> by <span style="color: #fc8c05;">${this.footerData.credit.designer}</span></h1>

        </section>
        <!-- footer section ends -->
        `;
    }

    inject() {
        // Trouver où injecter le footer (avant le scroll-top button)
        const scrollTopBtn = document.querySelector('#scroll-top');
        if (scrollTopBtn) {
            scrollTopBtn.insertAdjacentHTML('beforebegin', this.render());
        } else {
            // Si pas de scroll-top, injecter à la fin du body
            document.body.insertAdjacentHTML('beforeend', this.render());
        }
    }
}

// Initialiser et injecter le footer au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const footer = new PortfolioFooter();
    footer.inject();
});
