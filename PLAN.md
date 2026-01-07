# 🗺️ Plan de Développement - Vids

**Durée estimée :** 14-16 semaines  
**Dernière mise à jour :** 2026-01-07

---

## Vue d'ensemble des Phases

| Phase | Nom | Durée | Dépendances |
|-------|-----|-------|-------------|
| 1 | Foundation | 2 semaines | - |
| 2 | Core Features | 3 semaines | Phase 1 |
| 3 | Features Principales | 4 semaines | Phase 2 |
| 4 | UX Polish | 2-3 semaines | Phase 3 |
| 5 | Advanced & Sync | 3 semaines | Phase 4 |

---

## Phase 1 : Foundation (2 semaines)

### 1.1 - Project Setup

- [x] **Initialiser le projet Vite + React + TypeScript**

**Fichiers à créer :**
```
vids/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── index.html
└── src/
    ├── main.tsx
    └── App.tsx
```

**Commandes :**
```bash
pnpm create vite . --template react-ts
pnpm install
```

**Test :** `pnpm dev` → Page React visible sur http://localhost:5173

---

### 1.2 - Design System CSS

- [x] **Créer les variables CSS et le design system**

**Fichiers à créer :**
```
src/assets/styles/
├── index.css         # Reset + imports
├── variables.css     # Tokens (couleurs, spacing, etc.)
├── typography.css    # Fonts Sora + Lora
└── animations.css    # Framer Motion presets CSS
```

**Détails `variables.css` :**
```css
:root {
  /* Background */
  --bg-primary: #0a0a0f;
  --bg-secondary: #14141f;
  --bg-tertiary: #1e1e2e;
  
  /* Text */
  --text-primary: #e8e8f0;
  --text-secondary: #a0a0b8;
  --text-tertiary: #6e6e88;
  
  /* Accent */
  --accent-primary: #7c7cf5;
  --accent-hover: #9090f7;
  --accent-muted: #5555c5;
  
  /* ... reste des tokens */
}
```

**Dépendances :**
```bash
# Aucune - Vanilla CSS uniquement
```

**Test :** Inspecter la page, vérifier que les variables CSS sont appliquées au body

---

### 1.3 - Fonts & Icons

- [x] **Intégrer Sora, Lora (Google Fonts) et Phosphor Icons**

**Fichiers à modifier :**
- `index.html` : Ajouter liens Google Fonts
- `src/assets/styles/typography.css` : Définir font-family

**Fichiers à créer :**
```
src/components/common/Icon/
├── Icon.tsx          # Wrapper Phosphor
└── Icon.css
```

**Dépendances :**
```bash
pnpm add @phosphor-icons/react
```

**Test :** Afficher un titre en Sora et un paragraphe en Lora + une icône Phosphor

---

### 1.4 - Layout de Base

- [x] **Créer Searchbar (top) + Navbar squircle (bottom)**

**Fichiers à créer :**
```
src/components/layout/
├── PageLayout/
│   ├── PageLayout.tsx
│   └── PageLayout.css
├── Searchbar/
│   ├── Searchbar.tsx
│   └── Searchbar.css
└── Navbar/
    ├── Navbar.tsx
    └── Navbar.css
```

**Comportement Navbar :**
- Position fixed bottom center
- Style squircle (border-radius: 32px)
- Glassmorphism (backdrop-filter: blur)
- Items : 🏠 📁 🔥 ⏰ ⭐ ➕

**Test :** Navbar visible en bas, searchbar en haut, contenu scrollable au milieu

---

### 1.5 - Routing

- [x] **Configurer React Router v6**

**Dépendances :**
```bash
pnpm add react-router-dom
```

**Fichiers à créer :**
```
src/pages/
├── Home.tsx
├── Watch.tsx
├── Search.tsx
├── Subscriptions.tsx
├── Playlists.tsx
├── Trending.tsx
├── WatchLater.tsx
├── History.tsx
├── Settings.tsx
└── errors/
    ├── NotFound.tsx
    └── Error.tsx
```

**Fichier à modifier :** `src/App.tsx`
```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/watch/:videoId" element={<Watch />} />
  <Route path="/search" element={<Search />} />
  <Route path="/subscriptions" element={<Subscriptions />} />
  <Route path="/playlists" element={<Playlists />} />
  <Route path="/trending" element={<Trending />} />
  <Route path="/later" element={<WatchLater />} />
  <Route path="/history" element={<History />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

**Test :** Naviguer entre les pages via la navbar, vérifier que l'URL change

---

### 1.6 - Backend Setup

- [x] **Initialiser le serveur Express + TypeScript**

**Fichiers à créer :**
```
server/
├── package.json
├── tsconfig.json
├── index.ts
├── config/
│   └── index.ts
└── routes/
    └── index.ts
```

**Dépendances :**
```bash
cd server
pnpm init
pnpm add express cors helmet
pnpm add -D typescript ts-node-dev @types/express @types/cors
```

**Test :** `pnpm dev` → GET http://localhost:3001/health retourne `{ status: "ok" }`

---

### 1.7 - Database Setup

- [x] **Configurer PostgreSQL + schéma initial**

**Fichiers à créer :**
```
server/
├── config/
│   └── database.ts
└── migrations/
    └── 001_initial.sql
```

**Fichiers Docker :**
```
docker/
├── docker-compose.yml
└── Dockerfile
```

**docker-compose.yml :**
```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: vids
      POSTGRES_USER: vids
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

**Dépendances :**
```bash
pnpm add pg
pnpm add -D @types/pg
```

**Test :** `docker-compose up -d` → Connexion PostgreSQL réussie

---

### 1.8 - IndexedDB Setup (Dexie)

- [x] **Configurer Dexie.js pour le stockage local**

**Dépendances :**
```bash
pnpm add dexie dexie-react-hooks
```

**Fichiers à créer :**
```
src/services/db/
├── index.ts          # Instance Dexie
├── schema.ts         # Définition des tables
└── migrations.ts     # Versioning
```

**Test :** Ouvrir DevTools > Application > IndexedDB → Base "VidsDB" créée avec tables

---

## Phase 2 : Core Features (3 semaines)

### 2.1 - YouTube Service (youtubei.js)

- [x] **Intégrer youtubei.js côté serveur**

**Dépendances :**
```bash
cd server
pnpm add youtubei.js
```

**Fichiers à créer :**
```
server/services/
├── youtubeService.ts    # Wrapper youtubei.js
└── cacheService.ts      # Cache in-memory
```

**API endpoints :**
```
GET /api/youtube/video/:id      → Détails vidéo
GET /api/youtube/channel/:id    → Infos chaîne
GET /api/youtube/search?q=...   → Recherche
GET /api/youtube/trending       → Tendances
```

**Test :** `curl localhost:3001/api/youtube/video/dQw4w9WgXcQ` → Retourne les détails de la vidéo

---

### 2.2 - Video Player

- [x] **Implémenter le player video.js**

**Dépendances :**
```bash
pnpm add video.js @types/video.js
```

**Fichiers à créer :**
```
src/components/video/
├── VideoPlayer/
│   ├── VideoPlayer.tsx
│   ├── VideoPlayer.css
│   └── useVideoPlayer.ts
├── VideoControls/
│   ├── VideoControls.tsx
│   └── VideoControls.css
└── QualitySelector/
    └── QualitySelector.tsx
```

**Fonctionnalités :**
- Modes : Normal, Theater, Fullscreen
- Contrôles custom stylisés
- Raccourcis clavier (espace, flèches, M, F)
- Sauvegarde position de lecture

**Test :** Lire une vidéo, changer de qualité, tester les raccourcis clavier

---

### 2.3 - Video Cards avec Preview

- [x] **Créer les cards vidéo avec preview au hover**

**Fichiers à créer :**
```
src/components/video/
├── VideoCard/
│   ├── VideoCard.tsx
│   ├── VideoCard.css
│   └── useVideoPreview.ts    # Gestion preview GIF
└── VideoGrid/
    ├── VideoGrid.tsx
    └── VideoGrid.css
```

**Comportement hover :**
- Délai 500ms avant preview
- Animation scale + translateY(-4px)
- Preview vidéo 3-5 secondes en boucle

**Test :** Survol d'une card → Preview animé visible après 500ms

---

### 2.4 - Infinite Scroll Feed

- [x] **Implémenter l'infinite scroll pour le feed**

**Dépendances :**
```bash
pnpm add react-intersection-observer
```

**Fichiers à créer :**
```
src/components/feed/
├── HomeFeed/
│   ├── HomeFeed.tsx
│   └── HomeFeed.css
├── InfiniteScroll/
│   └── InfiniteScroll.tsx
└── FeedSkeleton/
    └── FeedSkeleton.tsx
```

**Fichiers hooks :**
```
src/hooks/
└── useInfiniteScroll.ts
```

**Test :** Scroller en bas → Nouvelles vidéos chargées automatiquement

---

### 2.5 - Search (YouTube)

- [x] **Implémenter la recherche YouTube**

**Fichiers à créer :**
```
src/components/search/
├── SearchResults/
│   ├── SearchResults.tsx
│   └── SearchResults.css
└── SearchInput/
    ├── SearchInput.tsx
    └── SearchInput.css
```

**Fichiers à modifier :**
- `src/components/layout/Searchbar/Searchbar.tsx`
- `src/pages/Search.tsx`

**Endpoints backend :**
```
GET /api/youtube/search?q=...&type=video|channel|playlist
```

**Test :** Taper "javascript tutorial" → Résultats YouTube affichés

---

### 2.6 - Import Abonnements CSV

- [x] **Permettre l'import de subscriptions via CSV Google Takeout**

**Fichiers à créer :**
```
src/components/subscriptions/
├── ImportModal/
│   ├── ImportModal.tsx
│   └── ImportModal.css
└── CSVParser/
    └── csvParser.ts
```

**Format CSV attendu :**
```csv
Channel Id,Channel Url,Channel Title
UC...,https://youtube.com/channel/UC...,Channel Name
```

**Test :** Importer un CSV → Chaînes ajoutées à IndexedDB → Visibles dans Subscriptions

---

### 2.7 - Système de Dossiers

- [x] **Créer la gestion des dossiers/catégories**

**Fichiers à créer :**
```
src/components/subscriptions/
├── FolderTree/
│   ├── FolderTree.tsx
│   └── FolderTree.css
├── FolderCard/
│   ├── FolderCard.tsx
│   └── FolderCard.css
└── CreateFolderModal/
    └── CreateFolderModal.tsx
```

**Hooks :**
```
src/hooks/
└── useFolders.ts
```

**Test :** Créer un dossier "Tech" → Y assigner une chaîne → Vérifier dans IndexedDB

---

## Phase 3 : Features Principales (4 semaines)

### 3.1 - Mini Player Flottant

- [ ] **Implémenter le mini player draggable**

**Dépendances :**
```bash
pnpm add framer-motion
```

**Fichiers à créer :**
```
src/components/layout/
└── MiniPlayer/
    ├── MiniPlayer.tsx
    ├── MiniPlayer.css
    └── useMiniPlayer.ts
```

**Stores :**
```
src/stores/
└── playerStore.ts    # Zustand store
```

**Dépendances :**
```bash
pnpm add zustand
```

**Comportement :**
- Apparaît quand on quitte /watch avec vidéo en cours
- Draggable (Framer Motion drag)
- Click → Retour page vidéo
- Bouton ✕ → Fermer

**Test :** Lancer une vidéo → Naviguer vers Home → Mini player visible et draggable

---

### 3.2 - SponsorBlock Integration

- [ ] **Intégrer SponsorBlock API**

**Fichiers à créer :**
```
server/services/
└── sponsorBlockService.ts

src/components/video/
└── SponsorBar/
    ├── SponsorBar.tsx
    └── SponsorBar.css
```

**API externe :**
```
GET https://sponsor.ajay.app/api/skipSegments?videoID=...
```

**Fonctionnalités :**
- Segments colorés sur la timeline
- Auto-skip configurable
- Catégories : sponsor, selfpromo, intro, outro, etc.

**Test :** Ouvrir une vidéo avec sponsors → Segments colorés visibles → Auto-skip fonctionne

---

### 3.3 - DeArrow Integration

- [ ] **Intégrer DeArrow pour titres/thumbnails alternatifs**

**Fichiers à créer :**
```
server/services/
└── deArrowService.ts
```

**API externe :**
```
GET https://sponsor.ajay.app/api/branding?videoID=...
```

**Fichiers à modifier :**
- `src/components/video/VideoCard/VideoCard.tsx`
- `src/components/video/VideoInfo/VideoInfo.tsx`

**Test :** Vidéo avec titre clickbait → Titre alternatif DeArrow affiché

---

### 3.4 - Return YouTube Dislike

- [ ] **Intégrer RYD API pour afficher les dislikes**

**Fichiers à créer :**
```
server/services/
└── rydService.ts
```

**API externe :**
```
GET https://returnyoutubedislikeapi.com/votes?videoId=...
```

**Fichiers à modifier :**
- `src/components/video/VideoInfo/VideoInfo.tsx`

**Test :** Affichage "👍 15.4K 👎 342 (97.8%)" sous la vidéo

---

### 3.5 - Sentiment Commentaires

- [ ] **Analyser le sentiment des commentaires**

**Fichiers à créer :**
```
server/services/
└── sentimentService.ts

src/components/video/
└── Comments/
    ├── Comments.tsx
    ├── Comments.css
    ├── SentimentBar.tsx
    └── CommentCard.tsx
```

**Approche :** Analyse lexicale simple (mots positifs/négatifs) ou API externe

**Test :** Section commentaires avec barre de sentiment colorée

---

### 3.6 - Filtres Avancés

- [ ] **Implémenter les filtres globaux et par dossier**

**Fichiers à créer :**
```
src/components/feed/
├── FilterBar/
│   ├── FilterBar.tsx
│   └── FilterBar.css
└── FilterModal/
    ├── FilterModal.tsx
    └── FilterModal.css
```

**Filtres disponibles :**
- Durée : < 5 min, 5-20 min, > 20 min
- Type : Shorts, Lives, Premiered
- Date : 7 derniers jours, ce mois
- Keywords à masquer
- Ratio likes minimum

**Test :** Activer filtre "> 20 min" → Seules les longues vidéos affichées

---

### 3.7 - Recherche Multi-niveau

- [ ] **Étendre la recherche (abos, historique, transcript)**

**Fichiers à créer :**
```
src/components/search/
├── AdvancedFilters/
│   └── AdvancedFilters.tsx
├── ScopeSelector/
│   └── ScopeSelector.tsx
└── TranscriptSearch/
    └── TranscriptSearch.tsx
```

**Scopes :**
- YouTube (tout)
- Mes abonnements
- Mon historique

**Test :** Rechercher dans "Historique" → Résultats filtrés sur vidéos vues

---

### 3.8 - Vitesse par Chaîne

- [ ] **Permettre de configurer la vitesse de lecture par chaîne**

**Fichiers à modifier :**
- `Subscription` model (champ `playbackSpeed`)
- `VideoPlayer` → Appliquer la vitesse configurée

**Fichiers à créer :**
```
src/components/subscriptions/
└── ChannelSettingsModal/
    └── ChannelSettingsModal.tsx
```

**Test :** Configurer une chaîne à 1.5x → Vidéos de cette chaîne démarrent à 1.5x

---

### 3.9 - Playlists

- [ ] **Gestion complète des playlists**

**Fichiers à créer :**
```
src/components/playlists/
├── PlaylistCard/
│   ├── PlaylistCard.tsx
│   └── PlaylistCard.css
├── PlaylistEditor/
│   ├── PlaylistEditor.tsx
│   └── PlaylistEditor.css
└── DraggableList/
    └── DraggableList.tsx
```

**Dépendances :**
```bash
pnpm add @dnd-kit/core @dnd-kit/sortable
```

**Fonctionnalités :**
- Créer/supprimer playlist
- Ajouter/retirer vidéos
- Réordonner par drag & drop
- Playlists spéciales : Watch Later, Favoris

**Test :** Créer playlist → Ajouter 3 vidéos → Réordonner par drag

---

## Phase 4 : UX Polish (2-3 semaines)

### 4.1 - Animations Organiques

- [ ] **Ajouter les animations Framer Motion**

**Fichiers à créer :**
```
src/assets/styles/
└── animations.css

src/utils/
└── animations.ts     # Presets Framer Motion
```

**Animations à implémenter :**
- Page transitions (fade + slide)
- Modal appear/disappear
- Card hover effects
- Loading states
- Micro-interactions (buttons, toggles)

**Test :** Navigation fluide avec animations perceptibles

---

### 4.2 - Loading States

- [ ] **Créer les spinners et skeletons**

**Fichiers à créer :**
```
src/components/common/
├── Spinner/
│   ├── Spinner.tsx
│   └── Spinner.css
└── Skeleton/
    ├── Skeleton.tsx
    ├── VideoCardSkeleton.tsx
    └── Skeleton.css
```

**Test :** Pendant chargement → Skeleton visible au lieu d'écran vide

---

### 4.3 - Empty States Rigolos

- [ ] **Messages humour pour états vides**

**Fichiers à créer :**
```
src/components/common/
└── EmptyState/
    ├── EmptyState.tsx
    └── EmptyState.css
```

**Messages par contexte :**
- Feed vide : "Abonne-toi à des chaînes pour voir du contenu ici !"
- Recherche vide : "Aucun résultat. YouTube a peut-être oublié cette vidéo ? 🤔"
- Playlist vide : "Cette playlist est aussi vide que mon frigo le dimanche soir"

**Test :** Nouvelle installation → Messages humour affichés

---

### 4.4 - Error Pages Rigolos

- [ ] **Pages d'erreur avec personnalité**

**Fichiers à modifier :**
```
src/pages/errors/
├── NotFound.tsx      # 404
└── Error.tsx         # 500, network errors
```

**Messages :**
- 404 : "Cette vidéo est partie en vacances sans prévenir 🏖️"
- 500 : "Le serveur a besoin d'un café. Reviens dans 2 min ? ☕"
- Network : "Internet a disparu. Vérifie ta connexion (ou appelle un exorciste) 👻"

**Test :** Accéder à /inexistant → Page 404 rigolote

---

### 4.5 - Notifications Système

- [ ] **Implémenter la cloche de notifications**

**Fichiers à créer :**
```
src/components/notifications/
├── NotificationBell/
│   ├── NotificationBell.tsx
│   └── NotificationBell.css
└── NotificationList/
    ├── NotificationList.tsx
    └── NotificationList.css
```

**Types de notifications :**
- Nouvelle vidéo d'un abonnement
- Mise à jour de playlist
- Système (sync, erreurs)

**Test :** Nouvelle vidéo d'un abo → Badge rouge sur la cloche

---

### 4.6 - Modals de Confirmation

- [ ] **Ajouter confirmations pour actions destructives**

**Fichiers à créer :**
```
src/components/common/
└── ConfirmModal/
    ├── ConfirmModal.tsx
    └── ConfirmModal.css
```

**Actions nécessitant confirmation :**
- Supprimer playlist/dossier
- Supprimer historique
- Se désabonner de plusieurs chaînes
- Réinitialiser paramètres

**Test :** Supprimer playlist → Modal de confirmation → Annuler/Confirmer

---

### 4.7 - Timestamps & Chapitres

- [ ] **Afficher les chapitres sur la timeline**

**Fichiers à créer :**
```
src/components/video/
└── ChaptersBar/
    ├── ChaptersBar.tsx
    └── ChaptersBar.css
```

**Fonctionnalités :**
- Chapitres sur la timeline (segments)
- Liste déroulante des chapitres
- Click → Sauter au chapitre

**Test :** Vidéo avec chapitres → Segments visibles → Click fonctionne

---

### 4.8 - Screenshot & Download

- [ ] **Permettre screenshot et téléchargement**

**Fichiers à créer :**
```
src/components/video/
└── VideoTools/
    ├── ScreenshotButton.tsx
    └── DownloadButton.tsx
```

**Fonctionnalités :**
- Screenshot : Capture frame actuelle → Téléchargement PNG
- Download : Téléchargement vidéo via ytdl (backend)

**Endpoint backend :**
```
GET /api/youtube/download/:id?quality=...
```

**Test :** Screenshot → Image téléchargée avec timestamp

---

## Phase 5 : Advanced & Sync (3 semaines)

### 5.1 - Authentification Lucia

- [ ] **Implémenter l'auth avec Lucia v3**

**Dépendances :**
```bash
cd server
pnpm add lucia @lucia-auth/adapter-postgresql
pnpm add argon2    # ou bcrypt
```

**Fichiers à créer :**
```
server/config/
└── lucia.ts

server/routes/
└── auth.ts

server/controllers/
└── authController.ts
```

**Fichiers frontend :**
```
src/pages/Auth/
├── Login.tsx
└── Register.tsx

src/stores/
└── authStore.ts

src/hooks/
└── useAuth.ts
```

**Endpoints :**
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

**Test :** Inscription → Login → Session persistante

---

### 5.2 - Sync Bidirectionnel

- [ ] **Implémenter la synchronisation LWW**

**Fichiers à créer :**
```
server/routes/
└── sync.ts

server/controllers/
└── syncController.ts

src/services/
└── syncService.ts

src/stores/
└── syncStore.ts

src/hooks/
└── useSync.ts
```

**Endpoints :**
```
POST /api/sync/push      # Client → Server
GET  /api/sync/pull      # Server → Client
```

**Stratégie Last-Write-Wins :**
- Chaque record a un `updatedAt`
- Le plus récent gagne en cas de conflit

**Test :** Modifier sur Device A → Sync → Visible sur Device B

---

### 5.3 - Recherche par Transcript

- [ ] **Recherche full-text dans les transcripts**

**Fichiers à créer :**
```
server/services/
└── transcriptService.ts

src/components/search/
└── TranscriptResults/
    └── TranscriptResults.tsx
```

**Approche :**
- Stocker transcripts dans PostgreSQL (colonne `text`)
- Utiliser `pg_trgm` pour recherche full-text
- Résultats avec timestamps de chaque occurrence

**Test :** Rechercher "gradient descent" → Résultats avec positions dans les vidéos

---

### 5.4 - Recherche Historique Avancée

- [ ] **Filtrer l'historique avec critères multiples**

**Fichiers à créer :**
```
src/pages/
└── History.tsx (refonte)

src/components/history/
├── HistoryFilters.tsx
└── HistoryCard.tsx
```

**Critères :**
- Période (ce mois, cette année)
- Complétées / Non complétées
- Avec like / Avec dislike
- Par chaîne

**Test :** Filtrer historique "Cette semaine" + "Complétées" → Résultats corrects

---

### 5.5 - Homes par Catégorie

- [ ] **Créer des homes filtrés par dossier**

**Fichiers à créer :**
```
src/components/feed/
└── HomeSelector/
    ├── HomeSelector.tsx
    └── HomeSelector.css
```

**Fonctionnalités :**
- Dropdown pour choisir le Home actif
- "Tout" = toutes les chaînes
- "Tech" = uniquement dossier Tech
- Sauvegarde du choix

**Test :** Sélectionner "Home Tech" → Seules les vidéos des chaînes Tech affichées

---

### 5.6 - Export/Import Données

- [ ] **Permettre export et import complet des données**

**Fichiers à créer :**
```
src/components/settings/
├── ExportButton.tsx
└── ImportButton.tsx

src/services/
└── backupService.ts
```

**Format export :** JSON contenant :
- Subscriptions
- Folders
- Playlists
- Watch History
- Settings

**Test :** Export → Supprimer données → Import → Tout restauré

---

### 5.7 - Stats Personnelles

- [ ] **Dashboard de statistiques utilisateur**

**Fichiers à créer :**
```
src/pages/
└── Stats.tsx

src/components/stats/
├── WatchTimeChart.tsx
├── TopChannels.tsx
└── StatsCard.tsx
```

**Métriques :**
- Temps total de visionnage
- Vidéos vues cette semaine/mois
- Top 5 chaînes les plus regardées
- Progression vs dernier mois

**Test :** Page Stats → Graphiques cohérents avec l'historique

---

### 5.8 - Responsive Final

- [ ] **Optimisation mobile et tablet**

**Fichiers à modifier :**
- Tous les `.css` avec media queries
- `Navbar.css` : Mode compact mobile
- `VideoGrid.css` : 1/2/3+ colonnes
- `MiniPlayer.css` : Taille réduite mobile

**Breakpoints :**
```css
@media (max-width: 640px)  { /* Mobile */ }
@media (max-width: 1024px) { /* Tablet */ }
```

**Test :** Tester sur iPhone/iPad simulés → UI adaptée

---

### 5.9 - Performance Optimization

- [ ] **Optimiser bundle et runtime**

**Actions :**
- Code splitting par route
- Lazy loading des composants lourds
- Optimisation images (webp, lazy load)
- Service Worker pour cache assets

**Fichiers à créer :**
```
src/
└── sw.ts            # Service Worker

vite.config.ts       # Modifier pour PWA
```

**Dépendances :**
```bash
pnpm add vite-plugin-pwa
```

**Métriques cibles :**
- Lighthouse Performance > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s

**Test :** Audit Lighthouse → Score > 90

---

## Récapitulatif Checklist

### Phase 1 : Foundation
- [ ] 1.1 Project Setup
- [ ] 1.2 Design System CSS
- [ ] 1.3 Fonts & Icons
- [ ] 1.4 Layout de Base
- [ ] 1.5 Routing
- [ ] 1.6 Backend Setup
- [ ] 1.7 Database Setup
- [ ] 1.8 IndexedDB Setup

### Phase 2 : Core Features
- [ ] 2.1 YouTube Service
- [ ] 2.2 Video Player
- [ ] 2.3 Video Cards avec Preview
- [ ] 2.4 Infinite Scroll Feed
- [ ] 2.5 Search YouTube
- [ ] 2.6 Import Abonnements CSV
- [ ] 2.7 Système de Dossiers

### Phase 3 : Features Principales
- [ ] 3.1 Mini Player Flottant
- [ ] 3.2 SponsorBlock Integration
- [ ] 3.3 DeArrow Integration
- [ ] 3.4 Return YouTube Dislike
- [ ] 3.5 Sentiment Commentaires
- [ ] 3.6 Filtres Avancés
- [ ] 3.7 Recherche Multi-niveau
- [ ] 3.8 Vitesse par Chaîne
- [ ] 3.9 Playlists

### Phase 4 : UX Polish
- [ ] 4.1 Animations Organiques
- [ ] 4.2 Loading States
- [ ] 4.3 Empty States Rigolos
- [ ] 4.4 Error Pages Rigolos
- [ ] 4.5 Notifications Système
- [ ] 4.6 Modals de Confirmation
- [ ] 4.7 Timestamps & Chapitres
- [ ] 4.8 Screenshot & Download

### Phase 5 : Advanced & Sync
- [ ] 5.1 Authentification Lucia
- [ ] 5.2 Sync Bidirectionnel
- [ ] 5.3 Recherche par Transcript
- [ ] 5.4 Recherche Historique Avancée
- [ ] 5.5 Homes par Catégorie
- [ ] 5.6 Export/Import Données
- [ ] 5.7 Stats Personnelles
- [ ] 5.8 Responsive Final
- [ ] 5.9 Performance Optimization
