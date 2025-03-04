# Mini Ski Game

Mini Ski Game est un jeu web interactif où l'objectif est d'arrêter le skieur le plus proche possible de **100 km/h** sans dépasser cette limite. Ce projet est construit en HTML, CSS (via [Tailwind CSS](https://tailwindcss.com)) et JavaScript, et est hébergé gratuitement sur GitHub Pages.

## Démo en ligne

Vous pouvez essayer le jeu ici :  
[https://pierrafrom.github.io/mini-ski-game/](https://pierrafrom.github.io/mini-ski-game/)

## Fonctionnalités

- **Accélération exponentielle :** La vitesse du skieur augmente de façon exponentielle.
- **Animation dynamique :** Un panneau "Folie Douce" se déplace le long d'une pente qui s'adapte dynamiquement à la taille de l'écran.
- **Affichage en temps réel :** La vitesse s'affiche en temps réel avec 4 décimales.
- **Résultats personnalisés :** Un pop-up coloré s'affiche à la fin de la partie avec un message adapté :
  - **< 70 km/h :** "Le skieur est trop lent et a loupé l'event 💀" (Fond rouge)
  - **Entre 70 et 95 km/h :** "Le skieur arrive juste à la fin de l'event, il aurait dû foncer plus pour mieux profiter 😕" (Fond orange)
  - **Entre 95 et 100 km/h :** "T'es vraiment le GOAT que tu penses être, le skieur a surkiffé l'événement et a profité à fond 🐐" (Fond vert)
  - **> 100 km/h :** "Le skieur est mort, SKIUT a maintenant un procès sur le dos... ☠️" (Fond noir)
- **Interface utilisateur réactive :** Le design s'adapte aux différents formats d'écran grâce à Tailwind CSS.

## Installation et utilisation

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/Pierrafrom/mini-ski-game.git
