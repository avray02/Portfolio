# 🔧 Guide de Configuration du Portfolio

## 📋 Modifications Apportées

### ✅ 1. Système de Configuration Centralisé

**Fichier créé : `config.json`**
```json
{
  "featured": {
    "projects": [
      "Defect Detection | Rolex SA",
      "Realistic rendering optimisation | Rolex SA", 
      "Traction Control | EPFL RT",
      "Navigation methods | EPFL",
      "Unitraj | Vehicle trajectory prediction",
      "Legged Robots | EPFL"
    ],
    "experiences": [
      "Rolex SA",
      "EPFL Racing Team", 
      "EPFL"
    ]
  },
  "display": {
    "maxProjectsOnHome": 6,
    "maxExperiencesOnHome": 3,
    "showOnlyFeatured": true
  }
}
```

### ✅ 2. Corrections des Problèmes Visuels

**Problèmes résolus :**
- ✅ Logo avec prénom aligné correctement sur tous les écrans
- ✅ Bitmoji ne superpose plus les icônes de réseaux sociaux
- ✅ Skills ne débordent plus de leur carré de fond
- ✅ Page expérience centrée correctement
- ✅ Navigation responsive améliorée

## 🎯 Comment Sélectionner les Projets et Expériences

### Option 1 : Via le fichier `config.json` (RECOMMANDÉ)

1. **Ouvrez `config.json`**
2. **Modifiez la liste `"projects"`** avec les noms exacts de vos projets :
   ```json
   "projects": [
     "Nom Exact Du Projet 1",
     "Nom Exact Du Projet 2",
     "..."
   ]
   ```
3. **Ajustez le nombre maximum** affiché sur la page principale :
   ```json
   "maxProjectsOnHome": 6
   ```

### Option 2 : Modifier directement le JavaScript

**Dans `assets/js/script.js`, lignes 108-117** :
```javascript
// Changez cette liste
const featuredProjects = [
  "Traction Control | EPFL RT", 
  "Defect Detection | Rolex SA",
  "Votre Nouveau Projet"
];
```

## 📱 Améliorations Responsive

### Breakpoints utilisés :
- **Desktop** : > 968px
- **Tablet** : 768px - 968px  
- **Mobile** : < 768px
- **Petit Mobile** : < 480px

### Corrections apportées :

**Header/Logo :**
- Alignement flex avec gap contrôlé
- Tailles adaptatives selon l'écran
- Transition fluide logo noir → couleur

**Section Home :**
- CSS Grid responsive
- Ordre des éléments optimisé mobile
- Espacement automatique des icônes sociales

**Skills :**
- Hauteur minimum fixée (120px)
- Text-wrap et hyphens pour les longs noms
- Padding interne optimisé

**Experience Page :**
- Timeline centrée sur desktop (max-width: 1000px)
- Mobile : alignement à gauche uniforme
- Breakpoint à 768px au lieu de 600px

## 🔧 Maintenance Future

### Pour ajouter un nouveau projet :

1. **Ajoutez-le dans `projects/projects.json`**
2. **Ajoutez son nom dans `config.json`** si vous voulez qu'il apparaisse sur la page d'accueil
3. **Ajoutez l'image** dans `projects/images/`
4. **Ajoutez les documents** dans `projects/reports/` ou `projects/posters/`

### Pour modifier l'affichage :

**Nombre de projets sur la page d'accueil :**
```json
"maxProjectsOnHome": 8  // Changez ce nombre
```

**Afficher tous les projets (pas seulement les featured) :**
```json
"showOnlyFeatured": false
```

## 🐛 Tests Effectués

### ✅ Responsive Design
- ✅ iPhone SE (375px)
- ✅ iPhone 12 Pro (390px)
- ✅ iPad (768px)
- ✅ Desktop (1920px)

### ✅ Fonctionnalités
- ✅ Navigation mobile (hamburger menu)
- ✅ Hover effects du logo
- ✅ Chargement dynamique des projets
- ✅ Affichage correct des skills
- ✅ Timeline experience centrée

## 📞 Support

Si vous rencontrez des problèmes :

1. **Vérifiez la console** (F12) pour les erreurs JavaScript
2. **Vérifiez que `config.json` est bien formaté** (utilisez jsonlint.com)
3. **Vérifiez les noms exacts** dans `projects.json` si les projets ne s'affichent pas
4. **Testez sur différentes tailles d'écran** avec les outils développeur

---

**Votre portfolio est maintenant entièrement fonctionnel et responsive ! 🎉**