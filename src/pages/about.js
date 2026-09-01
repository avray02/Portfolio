/** Renders the technical-skills showcase from the shared JSON source. */
async function renderAboutSkills() {
    const container = document.querySelector('#about-skills');
    if (!container) return;

    try {
        const response = await fetch('../src/data/skills.json');
        if (!response.ok) throw new Error(`Unable to load skills: ${response.status}`);

        const skills = await response.json();
        container.innerHTML = skills
            .map(skill => `<img src="../${skill.icon}" alt="${skill.name}" title="${skill.name}">`)
            .join('');
    } catch (error) {
        console.error(error);
    }
}

renderAboutSkills();
