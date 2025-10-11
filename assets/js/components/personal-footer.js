// Footer Component - Commun pour pages personnelles (personal-page et athletic)

class PersonalPageFooter {
    constructor() {
        this.footerData = {
            description: "Thank you for exploring my personal life beyond engineering. Let's connect and share our passions!",
            quickLinks: [
                { text: "home", href: "../personal-page/index.html#personal", icon: "fas fa-chevron-circle-right" },
                { text: "about", href: "../personal-page/index.html#about", icon: "fas fa-chevron-circle-right" },
                { text: "athletic", href: "../personal-page/index.html#athletic", icon: "fas fa-chevron-circle-right" },
                { text: "community", href: "../personal-page/index.html#community", icon: "fas fa-chevron-circle-right" },
                { text: "discovery", href: "../personal-page/index.html#discovery", icon: "fas fa-chevron-circle-right" }
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

    // Ajuste les liens selon la page courante
    adjustLinksForCurrentPage() {
        const currentPath = window.location.pathname;
        
        // Si on est sur la page personal-page, utiliser des liens internes (#)
        if (currentPath.includes('/personal-page/')) {
            this.footerData.quickLinks = [
                { text: "home", href: "#personal", icon: "fas fa-chevron-circle-right" },
                { text: "about", href: "#about", icon: "fas fa-chevron-circle-right" },
                { text: "athletic", href: "#athletic", icon: "fas fa-chevron-circle-right" },
                { text: "community", href: "#community", icon: "fas fa-chevron-circle-right" },
                { text: "discovery", href: "#discovery", icon: "fas fa-chevron-circle-right" }
            ];
        }
        // Si on est sur la page athletic, pointer vers personal-page
        else if (currentPath.includes('/athletic/')) {
            this.footerData.quickLinks = [
                { text: "home", href: "../personal-page/index.html#personal", icon: "fas fa-chevron-circle-right" },
                { text: "about", href: "../personal-page/index.html#about", icon: "fas fa-chevron-circle-right" },
                { text: "athletic", href: "../personal-page/index.html#athletic", icon: "fas fa-chevron-circle-right" },
                { text: "community", href: "../personal-page/index.html#community", icon: "fas fa-chevron-circle-right" },
                { text: "discovery", href: "../personal-page/index.html#discovery", icon: "fas fa-chevron-circle-right" }
            ];
        }
    }

    // Génère le HTML du footer
    generateFooterHTML() {
        this.adjustLinksForCurrentPage();
        
        const quickLinksHTML = this.footerData.quickLinks
            .map(link => `<a href="${link.href}"><i class="${link.icon}"></i> ${link.text}</a>`)
            .join('');

        const socialLinksHTML = this.footerData.social
            .map(social => `<a aria-label="${social.name}" href="${social.url}" target="_blank"><i class="${social.icon}"></i></a>`)
            .join('');

        return `
            <section class="footer">
                <div class="box-container">
                    <div class="box">
                        <h3>Alexandre's Personal Life</h3>
                        <p>${this.footerData.description}</p>
                    </div>

                    <div class="box">
                        <h3>quick links</h3>
                        ${quickLinksHTML}
                    </div>

                    <div class="box">
                        <h3>contact info</h3>
                        <p><i class="fas fa-phone"></i> <a href="${this.footerData.contact.phoneLink}">${this.footerData.contact.phone}</a></p>
                        <p><i class="fas fa-envelope"></i> <a href="${this.footerData.contact.emailLink}">${this.footerData.contact.email}</a></p>
                        <p><i class="fas fa-map-marked-alt"></i> ${this.footerData.contact.location}</p>
                        <div class="share">
                            ${socialLinksHTML}
                        </div>
                    </div>
                </div>

                <h1 class="credit">${this.footerData.credit.text} <i class="fa fa-heart pulse"></i> by 
                    <span style="color: #fc8c05;">${this.footerData.credit.designer}</span>
                </h1>
            </section>
        `;
    }

    // Injecte le footer dans le DOM
    inject() {
        // Vérifie si le footer existe déjà
        if (!document.querySelector('.footer')) {
            // Insère le footer avant le bouton scroll-top s'il existe, sinon à la fin du body
            const scrollTop = document.getElementById('scroll-top');
            const footerHTML = this.generateFooterHTML();
            
            if (scrollTop) {
                scrollTop.insertAdjacentHTML('beforebegin', footerHTML);
            } else {
                document.body.insertAdjacentHTML('beforeend', footerHTML);
            }
        }
    }
}

// Initialise et injecte le footer quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    const footer = new PersonalPageFooter();
    footer.inject();
});
