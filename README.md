# Portfolio d'Alexandre Vray

Portfolio statique en HTML, CSS et JavaScript, organisé pour séparer clairement les pages publiques, le code, les médias et les contenus.

## Ajouter du contenu

Les contenus affichés sont centralisés dans `src/data/` :

- `projects.json` : projets et liens associés ;
- `skills.json` : compétences et icônes ;
- `education.json` : formations ;
- `experiences.json` : expériences professionnelles ;
- `athletic-performances.json` : performances sportives ;
- `config.json` : contenus mis en avant et limites d'affichage de l'accueil.

Pour ajouter un élément, ajouter d'abord le média dans `src/assets/images/<domaine>/` ou le document dans `src/assets/documents/`, puis créer l'entrée JSON correspondante. Aucune modification HTML n'est nécessaire pour les cinq types de contenu ci-dessus.

## Organisation

Voir [l'architecture](docs/ARCHITECTURE.md) et le [guide des images](tools/image-processing/README.md).

## Lancer localement

Depuis ce dossier, lancer un serveur HTTP local, par exemple :

```powershell
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000/`. Ouvrir les fichiers HTML directement avec `file://` empêchera le chargement des JSON par le navigateur.
