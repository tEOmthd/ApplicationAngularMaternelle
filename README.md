# Application École le Petit Prince

Application mobile et web destinée aux parents et à l'équipe de l'école maternelle fictive **"École le Petit Prince"**. Elle permet d'accéder aux actualités de la classe, à la galerie photos et à l'agenda des événements à venir.

## Fonctionnalités

- Consultation des **actualités** et articles par classe
- **Galerie photos** des activités et sorties
- **Agenda** des événements et dates importantes
- Page de **contact** de l'école
- Barre de recherche dans les articles

## Stack technique

| Technologie | Version |
|---|---|
| Angular (standalone components) | 19 |
| Ionic | 8 |
| Capacitor | 7 |
| TypeScript | ~5.x |

## Installation et lancement

```bash
npm install
ionic serve
```

Pour lancer sur un appareil mobile via Capacitor :

```bash
ionic build
npx cap sync
npx cap open android   # ou ios
```

## Comptes de démonstration

| Identifiant | Mot de passe |
|---|---|
| classe1 | mdp1 |
| classe2 | mdp2 |
| classe3 | mdp3 |

## Contexte

Projet universitaire réalisé dans le cadre d'un IUT (BUT Informatique). Application de démonstration — les données sont fournies par une API externe fictive.
