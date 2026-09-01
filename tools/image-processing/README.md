# Préparation des images

`prepare-images.ipynb` est l'outil de maintenance des médias du portfolio. Il ne fait pas partie du site livré aux visiteurs.

Depuis la racine de `Portfolio`, ouvrir le notebook puis exécuter uniquement la cellule adaptée :

- conversion des dossards PDF en JPG dans `src/assets/images/athletic/bibs/` ;
- optimisation JPEG des images avec une largeur maximale de 1920 px et une qualité de 85 ;
- conversion ponctuelle d'une image de projet si nécessaire.

Les éventuelles sauvegardes locales sont placées dans `tools/image-processing/backups/` et ignorées par Git. Vérifier visuellement les images générées avant de les référencer dans un JSON.
