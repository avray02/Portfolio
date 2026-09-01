# Architecture du portfolio

Les pages web restent à la racine (`index.html`, `projects/`, `athletic/`, `experience/`, `personal-page/` et `about/`) pour conserver toutes les URL actuellement déployées.

Tout le contenu applicatif est désormais regroupé dans `src/` :

```
src/
├── assets/
│   ├── documents/        # CV, rapports, posters et notebooks de projets
│   └── images/           # Images classées par domaine
├── components/           # Éléments partagés (footer)
├── data/                 # Source unique des contenus éditoriaux JSON
├── pages/                # Scripts spécifiques à chaque page
├── services/             # Bibliothèques et fonctionnalités transverses
└── styles/
    ├── pages/            # Styles propres à chaque page
    └── shared/           # Styles partagés et 404
```

Les fichiers de `src/data/` sont la source de vérité pour les projets, compétences, formations, expériences et performances sportives. Une entrée ajoutée dans le bon JSON est rendue automatiquement sur les pages concernées.

Les ressources d'images sont volontairement séparées des données : ajouter une entrée demande d'ajouter son image dans `src/assets/images/<domaine>/`, puis de renseigner son chemin ou son nom dans le JSON correspondant.
