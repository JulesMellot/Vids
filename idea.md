# 🎬 Vids - Specs Finales Complètes

**Nom :** Vids  
**URL :** vids.tllm.fr  
**Tagline :** "YouTube sans Google, avec tes règles"

---

## 🏗️ Architecture Technique

### Stack
```
Frontend : React + Vite + Tailwind CSS
Backend : Node.js + Express
Database : PostgreSQL (ou SQLite pour commencer)
Player : video.js ou Plyr
Extraction : youtubei.js (Local API)
Animations : Framer Motion
```

### Flux de données
```
Browser ↔ Backend (vids.tllm.fr) ↔ youtubei.js → YouTube
   ↓              ↓
IndexedDB     PostgreSQL
   ↓              ↓
(local)      (sync + search)
```

---

## 🎨 Design System Complet

### Typographie
```css
--font-ui: 'Sora', sans-serif;      /* Navbar, boutons, titres */
--font-text: 'Lora', serif;         /* Corps de texte, descriptions */
```

**Hiérarchie :**
- H1: Sora 32px/700
- H2: Sora 24px/600
- H3: Sora 20px/600
- Body: Lora 16px/400
- Small: Lora 14px/400
- Button: Sora 14px/500

### Iconographie
- **Phosphor Icons** (outline par défaut, fill pour actif)
- Poids: 1.5px-2px
- Tailles: 20px (petit), 24px (standard), 32px (grand)

### Palette de couleurs

```css
:root {
  /* Background */
  --bg-primary: #0a0a0f;      /* Fond principal */
  --bg-secondary: #14141f;    /* Cards, sections */
  --bg-tertiary: #1e1e2e;     /* Hover states */
  
  /* Text */
  --text-primary: #e8e8f0;    /* Texte principal */
  --text-secondary: #a0a0b8;  /* Texte secondaire */
  --text-tertiary: #6e6e88;   /* Métadonnées */
  
  /* Accent (doux) */
  --accent-primary: #7c7cf5;  /* Bleu-violet principal */
  --accent-hover: #9090f7;    /* Hover */
  --accent-muted: #5555c5;    /* Version atténuée */
  
  /* Feedback */
  --success: #4ecca3;         /* Vert menthe */
  --warning: #f5a962;         /* Orange doux */
  --error: #eb6f92;           /* Rose/rouge doux */
  
  /* Borders */
  --border: #2a2a3f;
  --border-hover: #3a3a5f;
}
```

### Spacing (Comfortable)
```css
--spacing-xs: 8px;
--spacing-sm: 12px;
--spacing-md: 20px;
--spacing-lg: 32px;
--spacing-xl: 48px;
--spacing-2xl: 64px;
```

### Border Radius (Squircle-inspired)
```css
--radius-sm: 12px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 32px;
--radius-squircle: 20px; /* Pour éléments principaux */
```

### Shadows (Subtiles, pas de glow)
```css
--shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.15);
--shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.2);
--shadow-elevated: 0 8px 24px rgba(0, 0, 0, 0.25);
```

### Animations (Standard, organiques type Awwwards)
```css
--transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);

/* Bounce organique */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Ease smooth */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
```

### UI States

**Loading :**
- Spinner simple (cercle tournant)
- Couleur: var(--accent-primary)
- Taille: 24px (petit), 32px (moyen), 48px (grand)

**Empty States :**
```
🎬 Rien à voir ici... encore !
(message rigolo adapté au contexte)

Exemples :
- Feed vide : "Abonne-toi à des chaînes pour voir du contenu ici !"
- Recherche vide : "Aucun résultat. YouTube a peut-être oublié cette vidéo ? 🤔"
- Playlist vide : "Cette playlist est aussi vide que mon frigo le dimanche soir"
```

**Error States :**
```
┌────────────────────────────┐
│    🎭 Oups !              │
│                            │
│  Quelque chose a planté    │
│  (probablement YouTube)    │
│                            │
│  [Réessayer]  [Retour]    │
└────────────────────────────┘

Messages rigolos selon l'erreur :
- 404: "Cette vidéo est partie en vacances sans prévenir"
- 500: "Le serveur a besoin d'un café. Reviens dans 2 min ?"
- Network: "Internet a disparu. Vérifie ta connexion (ou appelle un exorciste)"
```

**Notifications :**
- Icône cloche (🔔) dans la navbar
- Badge rouge avec nombre si nouvelles notifs
- Dropdown au clic (style squircle)
- Types: nouvelles vidéos des abos, mises à jour de playlists

**Modals :**
```css
.modal {
  background: var(--bg-secondary);
  border-radius: var(--radius-squircle);
  border: 1px solid var(--border);
  padding: var(--spacing-lg);
  backdrop-filter: blur(8px);
}

.modal-backdrop {
  background: rgba(10, 10, 15, 0.8);
}
```

**Scrollbar :**
- Native (pas de custom)

**Focus States :**
- Pas de focus visible (design clean)
- Navigation keyboard toujours fonctionnelle

**Hover Effects :**
- **UNIQUEMENT sur preview vidéos** (animation + scale léger)
- Reste de l'UI: transitions subtiles sans effects marqués

### Responsive Breakpoints
```css
--mobile: 640px;    /* < 640px */
--tablet: 1024px;   /* 640px - 1024px */
--desktop: 1024px;  /* > 1024px */
```

---

## 🎯 Layout & Navigation

### Structure générale

```
┌─────────────────────────────────────────────────────┐
│                                                       │
│  🔍 [Rechercher sur Vids...]         🔔₃  👤  ⚙️    │ ← Searchbar fixe
│                                                       │
├─────────────────────────────────────────────────────┤
│                                                       │
│                                                       │
│              CONTENU PRINCIPAL                       │
│         (Feed infini, Vidéo, etc.)                   │
│                                                       │
│                                                       │
│                                                       │
│                                                       │
├─────────────────────────────────────────────────────┤
│                                                       │
│      ╭───────────────────────────────────╮           │
│      │  🏠  📁  🔥  ⏰  ⭐  ➕  │           │ ← Navbar flottante
│      ╰───────────────────────────────────╯           │ (style squircle)
│                                                       │
└─────────────────────────────────────────────────────┘
```

### Navbar Centrée Sticky (Bottom)

**Style Squircle flottant :**
```css
.navbar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  
  background: rgba(20, 20, 31, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 32px; /* Squircle */
  padding: 12px 24px;
  
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  
  display: flex;
  gap: 24px;
  align-items: center;
}

.navbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  
  color: var(--text-secondary);
  transition: color var(--transition-base);
  cursor: pointer;
}

.navbar-item.active {
  color: var(--accent-primary);
}

.navbar-item:hover {
  color: var(--text-primary);
}
```

**Items de la navbar :**
```
🏠 Home       - Feed principal (tout mélangé)
📁 Catégories - Accès dossiers/homes par catégorie
🔥 Trending   - Vidéos populaires
⏰ Later      - Watch later / À voir plus tard
⭐ Favoris    - Playlists favorites
➕ Créer      - Nouvelle playlist / dossier
```

**Note :** La navbar contient TOUTE la navigation. Pas de sidebar.

---

## ✨ Features Détaillées

### 🏠 Home Feed (Mixed)

**Concept :** Tout mélangé par défaut
- Nouvelles vidéos de TOUS tes abonnements
- Mix chronologique intelligent
- Infinite scroll
- Filtres rapides en haut

**Puis création de "Homes" par catégorie :**
```
Home Principal (tout)
├─ Home Tech (filtré)
├─ Home Gaming (filtré)
└─ Home Éducation (filtré)
```

**Changement de home :**
- Via navbar > 📁 Catégories
- Ou dropdown dans le feed

### 🎥 Player Vidéo

**Modes :**
- Normal (dans la page)
- Theater mode (plein écran page)
- Fullscreen (vrai fullscreen)
- **Mini Player Flottant** (quand tu navigues)

**Mini Player Flottant :**
```
┌─────────────────┐
│  [Vidéo mini]   │ ← Coin bas-droit
│  Titre court    │    Draggable
│  ▶ ⏸ ✕        │    Resizable
└─────────────────┘
```

- Apparaît quand tu quittes la page vidéo
- Draggable (déplaçable)
- Click pour revenir à la vidéo
- Bouton ✕ pour fermer

**Player Controls :**
```
▶/⏸  ⏮ ⏭  🔇 ━━━●━━━  ⚙️ 1.75x  📺 📥 📸  ⛶
```

**Intégrations :**
- ✅ SponsorBlock (segments colorés sur timeline)
- ✅ DeArrow (titre/miniature propres)
- ✅ Return YouTube Dislike
- ✅ Timestamps/chapitres intelligents
- ✅ Screenshot frame
- ✅ Download vidéo

### 📺 Cards Vidéo (avec Preview Hover)

**Preview au hover UNIQUEMENT :**
```css
.video-card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition-base);
}

.video-card:hover {
  transform: translateY(-4px);
}

.video-card:hover .thumbnail {
  /* Lance preview animé (GIF-like) */
  animation: previewFade 0.3s ease;
}

.video-preview {
  position: absolute;
  top: 0;
  /* Preview vidéo courtes ~3s loop */
}
```

**Card structure :**
```
┌──────────────┐
│              │
│   [IMAGE]    │ ← Preview au hover
│              │
│   15:42      │ ← Durée en bas
└──────────────┘
Titre de la vidéo (DeArrow)
Nom Chaîne • 1.2M vues • il y a 2h
👍 98% • 🎯 Tech
```

### 📁 Dossiers & Organisation

**Structure :**
```
📁 Mes Dossiers
├─ 📁 Tech (12 chaînes)
│  ├─ Veritasium
│  ├─ 3Blue1Brown
│  └─ Computerphile
│
├─ 📁 Gaming (5 chaînes)
│  ├─ Noclip
│  └─ GMTK
│
└─ 📁 Éducation (8 chaînes)
   ├─ Kurzgesagt
   └─ CrashCourse

📋 Mes Playlists
├─ À voir ce soir (12 vidéos)
├─ Longues vidéos (45 vidéos)
└─ Best of 2024 (89 vidéos)
```

**Settings par dossier :**
- Vitesse de lecture par défaut
- Filtres auto (durée, type, mots-clés)
- Ordre (chrono, popularité, durée)

### 🎯 Filtres Avancés

**Globaux (dans feed) :**
```
┌────────────────────────────────────┐
│ Filtres rapides :                  │
│ ☐ < 5 min  ☐ 5-20 min  ☐ > 20 min│
│ ☐ Shorts   ☐ Lives     ☐ Premiered│
│                                    │
│ Masquer mots-clés :                │
│ [BREAKING, URGENT, CLICKBAIT]      │
│                                    │
│ Afficher uniquement :              │
│ ☑ 7 derniers jours                │
│ ☐ Non vues uniquement             │
│ ☐ Ratio >95%                      │
└────────────────────────────────────┘
```

**Par dossier (custom) :**
- Dossier Tech : masquer < 10 min
- Dossier Podcasts : afficher > 30 min seulement
- Dossier Gaming : reviews uniquement

### 🔍 Recherche Multi-niveau

**1. Searchbar principale (top)**
- Recherche YouTube globale
- Recherche dans tes abos
- Recherche dans ton historique

**2. Recherche avancée :**
```
┌────────────────────────────────────┐
│ 🔍 Rechercher...                   │
│                                    │
│ Où chercher ?                      │
│ ○ YouTube (tout)                   │
│ ● Mes abonnements                  │
│ ○ Mon historique                   │
│                                    │
│ Filtres :                          │
│ Durée : [10-30 min]                │
│ Date : [Ce mois]                   │
│ Chaîne : [3Blue1Brown]             │
│                                    │
│ Options avancées :                 │
│ ☑ Chercher dans transcripts        │
│ ☐ Uniquement vidéos terminées      │
│ ☑ Ratio likes >90%                │
└────────────────────────────────────┘
```

**3. Recherche dans historique :**
```
"vidéo réseaux neuronaux 3 mois"

Résultats :
📹 Neural Networks Explained
   3Blue1Brown • Regardée le 4 oct 2024
   ⭐ Tu as aimé • ✓ Terminée (18:43/18:43)
   
📹 Deep Learning Course
   Stanford • Regardée le 12 oct 2024
   À 45:12/1:23:10 (non terminée)
```

**4. Recherche par transcript :**
```
"gradient descent"

Trouvé dans 3 vidéos de ton historique :
├─ Video A à 12:34 : "...applying gradient descent..."
├─ Video B à 8:12 : "...the gradient descent algorithm..."
└─ Video C à 23:45 : "...optimizing with gradient descent..."
```

### 💬 Analyse Sentiment Commentaires

```
┌────────────────────────────────────┐
│ 💬 Commentaires : 😊 Positifs     │
│                                    │
│ ████████████████░░░░ 82%          │ Positif
│ ███░░░░░░░░░░░░░░░░ 12%          │ Neutre
│ █░░░░░░░░░░░░░░░░░░  6%          │ Négatif
│                                    │
│ [Afficher les commentaires →]     │
└────────────────────────────────────┘
```

### 🔔 Système de Notifications

**Icône dans navbar top-right :**
```
🔔₃ ← Badge avec nombre
```

**Au clic (dropdown) :**
```
┌────────────────────────────────────┐
│ Notifications                   ✓  │
├────────────────────────────────────┤
│ 🎬 3Blue1Brown a publié            │
│    "New video on calculus"         │
│    il y a 2h                       │
├────────────────────────────────────┤
│ 🎬 Veritasium a publié             │
│    "Physics explained"             │
│    il y a 5h                       │
├────────────────────────────────────┤
│ ⭐ Nouvelle vidéo dans "Tech"     │
│    12 vidéos non vues              │
│    il y a 1j                       │
└────────────────────────────────────┘
```

### ⚠️ Confirmations Actions Importantes

**Modals de confirmation (style squircle) :**

```
┌────────────────────────────────────┐
│  ⚠️ Supprimer la playlist ?       │
│                                    │
│  Tu es sur le point de supprimer  │
│  "Best of 2024" (89 vidéos)       │
│                                    │
│  Cette action est irréversible.   │
│                                    │
│  [Annuler]  [Supprimer]           │
└────────────────────────────────────┘
```

**Actions nécessitant confirmation :**
- Supprimer playlist/dossier
- Supprimer tout l'historique
- Réinitialiser paramètres
- Se désabonner de plusieurs chaînes
- Exporter/supprimer données

---

## 🗄️ Base de Données

```sql
-- Tables principales
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  channel_id VARCHAR(50) UNIQUE,
  channel_name VARCHAR(255),
  folder VARCHAR(100),
  playback_speed FLOAT DEFAULT 1.0,
  filters JSONB,
  subscribed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE folders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  filters JSONB,
  home_enabled BOOLEAN DEFAULT false
);

CREATE TABLE videos_cache (
  id SERIAL PRIMARY KEY,
  video_id VARCHAR(20) UNIQUE,
  title TEXT,
  channel_id VARCHAR(50),
  duration INT,
  published_at TIMESTAMP,
  views BIGINT,
  likes INT,
  dislikes INT,
  transcript TEXT, -- Pour recherche
  cached_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE watch_history (
  id SERIAL PRIMARY KEY,
  video_id VARCHAR(20),
  watched_at TIMESTAMP DEFAULT NOW(),
  duration_watched INT,
  total_duration INT,
  completed BOOLEAN,
  user_rating VARCHAR(10), -- 'like' | 'dislike' | null
  playback_speed FLOAT
);

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  videos JSONB, -- Array of video_ids
  folder VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50), -- 'new_video' | 'playlist_update'
  message TEXT,
  video_id VARCHAR(20),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB
);
```

---

## 🚀 Roadmap Développement

### Phase 1 - Foundation (2 semaines)
```
✓ Setup Vite + React + Tailwind
✓ Design system (variables CSS)
✓ Fonts (Sora + Lora) + Phosphor icons
✓ Layout de base (searchbar + navbar squircle)
✓ Routing (React Router)
✓ Backend basique (Express + PostgreSQL)
```

### Phase 2 - Core (3 semaines)
```
✓ Intégration youtubei.js
✓ Player vidéo (video.js)
✓ Cards vidéo avec preview hover
✓ Feed infini (infinite scroll)
✓ Recherche YouTube
✓ Import abonnements CSV
✓ Système de dossiers
```

### Phase 3 - Features Principales (4 semaines)
```
✓ Mini player flottant
✓ SponsorBlock integration
✓ DeArrow integration
✓ Return YouTube Dislike
✓ Sentiment commentaires
✓ Filtres avancés
✓ Recherche multi-niveau
✓ Vitesse par chaîne
✓ Playlists
```

### Phase 4 - UX Polish (2-3 semaines)
```
✓ Animations organiques (Framer Motion)
✓ Loading states (spinners)
✓ Empty states rigolos
✓ Error pages rigolos
✓ Notifications système (icône cloche)
✓ Modals de confirmation
✓ Timestamps intelligents
✓ Screenshot + download
```

### Phase 5 - Advanced (3 semaines)
```
✓ Recherche transcript
✓ Recherche historique avancée
✓ Homes par catégorie
✓ Export/import données
✓ Stats personnelles
✓ Mobile responsive
✓ Performance optimization
```

---

## 📱 Responsive Design

### Mobile (< 640px)
```
┌─────────────────┐
│ 🔍 Search  🔔₃ │
├─────────────────┤
│                 │
│    [VIDEO]      │
│    Card         │
│                 │
│    [VIDEO]      │
│    Card         │
│                 │
├─────────────────┤
│  🏠 📁 🔥 ⏰ ⭐ │
└─────────────────┘
```

- Navbar : icônes uniquement (pas de labels)
- Cards : 1 colonne
- Player : adapté écran
- Mini player : coin écran (plus petit)

### Tablet (640px - 1024px)
- Cards : 2 colonnes
- Navbar : icônes + labels
- Searchbar : réduite

### Desktop (> 1024px)
- Cards : 3-4 colonnes (selon largeur)
- Layout complet
- Preview hover activé

---

## 🎯 Checklist Finale

### Design ✅
- ✅ Fonts : Sora + Lora
- ✅ Icons : Phosphor
- ✅ Couleurs : Palette sombre non-agressive
- ✅ Spacing : Comfortable
- ✅ Animations : Standards organiques (Awwwards-style)
- ✅ Shadows : Subtiles uniquement
- ✅ Scrollbar : Native
- ✅ Radius : Squircle (20px+)
- ✅ Hover : Uniquement preview vidéos
- ✅ Focus : Pas de focus visible

### Layout ✅
- ✅ Searchbar : Top fixe
- ✅ Navbar : Bottom sticky centrée (squircle flottant)
- ✅ Navbar = toute navigation
- ✅ Pas de sidebar
- ✅ Infinite scroll
- ✅ Responsive breakpoints

### Features ✅
- ✅ Mini player flottant
- ✅ Preview hover (vidéos)
- ✅ Home mixed + homes catégories
- ✅ Confirmations actions importantes
- ✅ SponsorBlock + DeArrow
- ✅ Sentiment commentaires
- ✅ Filtres avancés
- ✅ Recherche multi-niveau + transcript
- ✅ Vitesse par chaîne
- ✅ Screenshot + download
- ✅ Timestamps intelligents
- ✅ Dossiers + playlists
- ✅ Notifications (cloche)

### UI States ✅
- ✅ Loading : Spinners
- ✅ Empty : Messages rigolos
- ✅ Error : Page rigolote
- ✅ Modals : Style squircle
- ✅ Notifications : Badge cloche

### Données ✅
- ✅ Base PostgreSQL
- ✅ Stockage local (IndexedDB)
- ✅ Import/export
- ✅ Sync devices

---

## 🎬 Mockup Final Vids

### Home Feed
```
┌─────────────────────────────────────────────────────┐
│  🔍 Rechercher sur Vids...      🔔₃  👤  ⚙️         │
├─────────────────────────────────────────────────────┤
│                                                       │
│  🏠 Home (Tout) ▾                [Filtres ▾]         │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ [PREV]   │  │ [PREV]   │  │ [PREV]   │          │
│  │  15:42   │  │  32:18   │  │ 1:12:34  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│  Titre vidéo    Titre 2       Titre 3               │
│  Chaîne         Chaîne        Chaîne                │
│  2h • 456K     1j • 1.2M      5h • 89K              │
│  👍 98% 🎯Tech  👍 95% 🎮      👍 92% 📚            │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ [PREV]   │  │ [PREV]   │  │ [PREV]   │          │
│                                                       │
│  ... (infinite scroll)                               │
│                                                       │
├─────────────────────────────────────────────────────┤
│                                                       │
│      ╭─────────────────────────────────────╮         │
│      │ 🏠  📁  🔥  ⏰  ⭐  🔔  ➕ │         │
│      ╰─────────────────────────────────────╯         │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### Page Vidéo avec Mini Player

```
┌─────────────────────────────────────────────────────┐
│  🔍 Rechercher...                  🔔₃  👤  ⚙️      │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────────────────────────────────┐    │
│  │                                             │    │
│  │         🎬 PLAYER VIDÉO                    │    │
│  │                                             │    │
│  │  ▶━━━━●━━🟡━🔴━━━━━  12:34 / 24:56       │    │
│  │  [Controls: ▶⏸ 🔇 ⚙️1.75x 📥 📸 ⛶]       │    │
│  └─────────────────────────────────────────────┘    │
│                                                       │
│  Vrai Titre (DeArrow)                                │
│  Chaîne • 1.2M vues • il y a 2j                     │
│  👍 15.4K  👎 342 (97.8%)                           │
│                                                       │
│  💬 Positifs (82%) ████████░░                       │
│                                                       │
│  📝 Chapitres: 0:00 Intro | 2:15 Part 1...          │
│                                                       │
├─────────────────────────────────────────────────────┤
│                              ┌─────────────────┐     │
│                              │  [Mini Player]  │     │
│                              │  Autre vidéo    │     │
│      ╭─────────────────╮    │  ▶ ⏸ ✕        │     │
│      │ 🏠 📁 🔥 ⏰ ⭐ │    └─────────────────┘     │
│      ╰─────────────────╯                            │
└─────────────────────────────────────────────────────┘
```

---

## ✨ Nom & Branding

**Nom :** Vids  
**URL :** vids.tllm.fr  
**Tagline :** "YouTube sans Google, avec tes règles"
