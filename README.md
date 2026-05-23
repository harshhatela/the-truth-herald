<div align="center">

```
████████╗██╗  ██╗███████╗    ████████╗██████╗ ██╗   ██╗████████╗██╗  ██╗    ██╗  ██╗███████╗██████╗  █████╗ ██╗     ██████╗
   ██╔══╝██║  ██║██╔════╝       ██╔══╝██╔══██╗██║   ██║╚══██╔══╝██║  ██║    ██║  ██║██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗
   ██║   ███████║█████╗         ██║   ██████╔╝██║   ██║   ██║   ███████║    ███████║█████╗  ██████╔╝███████║██║     ██║  ██║
   ██║   ██╔══██║██╔══╝         ██║   ██╔══██╗██║   ██║   ██║   ██╔══██║    ██╔══██║██╔══╝  ██╔══██╗██╔══██║██║     ██║  ██║
   ██║   ██║  ██║███████╗       ██║   ██║  ██║╚██████╔╝   ██║   ██║  ██║    ██║  ██║███████╗██║  ██║██║  ██║███████╗██████╔╝
   ╚═╝   ╚═╝  ╚═╝╚══════╝       ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═════╝
```

</div>

### *All The Truth That's Fit To Print*

---

**EST. 2025 · VOL. I · EDITION 1 · PRICE: FREE**

---

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-Functions-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-Vertex_AI-4285F4?style=flat-square&logo=googlecloud&logoColor=white)](https://cloud.google.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Demo](https://img.shields.io/badge/Demo-Live-red?style=flat-square)](https://your-project-id.web.app)

</div>

---

```
┌─────────────────────────────────────────────────────────────────┐
│                    ◆ WHAT IS THIS? ◆                           │
└─────────────────────────────────────────────────────────────────┘
```

**The Truth Herald** is a full-stack AI-powered fake news detector dressed
in the aesthetic of a 1920s American broadsheet newspaper. Paste any news
article — receive an instant **REAL** or **FAKE** verdict with a confidence
score, key linguistic indicators, and a pull-quote preview.

> *"In an age of misinformation, who guards the truth?"*

The system employs **Term Frequency–Inverse Document Frequency (TF-IDF)**
vectorisation across 50,000 features, paired with a **Logistic Regression**
classifier trained on 114MB of verified and fabricated news articles.

---

```
┌─────────────────────────────────────────────────────────────────┐
│                   ◆ LIVE DEMO ◆                                │
└─────────────────────────────────────────────────────────────────┘
```

🔗 **[View The Truth Herald →](https://your-project-id.web.app)**

> Demo mode is enabled by default — no API key required.
> Paste any article and the full UI works end-to-end with realistic mock predictions.

---

```
┌─────────────────────────────────────────────────────────────────┐
│                  ◆ ARCHITECTURE ◆                              │
└─────────────────────────────────────────────────────────────────┘
```

```
                    ┌─────────────────────┐
                    │   USER (Browser)    │
                    │  Pastes article /   │
                    │  enters URL         │
                    └──────────┬──────────┘
                               │
                               ▼
          ┌────────────────────────────────────────┐
          │         REACT FRONTEND (Vite)          │
          │  • 3-column newspaper grid layout      │
          │  • Playfair Display / EB Garamond      │
          │  • 3D paper sheet · rubber stamp       │
          │  • Scroll-reveal animations            │
          │  Hosted on: Firebase Hosting           │
          └──────────────────┬─────────────────────┘
                             │ HTTP POST /predict
                             ▼
          ┌────────────────────────────────────────┐
          │      FIREBASE FUNCTIONS (Python)       │
          │  • CORS + auth middleware              │
          │  • Text preprocessing pipeline         │
          │  • Loads model from Cloud Storage      │
          │  • Returns verdict + confidence        │
          └──────────┬─────────────────────────────┘
                     │                    │
          ┌──────────▼──────┐   ┌─────────▼──────────┐
          │  CLOUD STORAGE  │   │     FIRESTORE       │
          │  tfidf.pkl      │   │  Analysis history   │
          │  model.pkl      │   │  per user session   │
          └─────────────────┘   └────────────────────┘
                     │
          ┌──────────▼──────────────────────────────┐
          │        ML TRAINING (Vertex AI)          │
          │  • Fake.csv + True.csv (114MB)          │
          │  • TF-IDF (50K features, 1-2 ngrams)   │
          │  • LogisticRegression (balanced)        │
          │  • 94% accuracy on held-out test set   │
          └─────────────────────────────────────────┘
```

---

```
┌─────────────────────────────────────────────────────────────────┐
│               ◆ TECHNICAL SPECIFICATIONS ◆                     │
└─────────────────────────────────────────────────────────────────┘
```

| COMPONENT       | SPECIFICATION                              |
|:----------------|:-------------------------------------------|
| **Frontend**    | React 19 · TypeScript · TailwindCSS v4     |
| **Build Tool**  | Vite with `@tailwindcss/vite` plugin       |
| **Fonts**       | Playfair Display · EB Garamond · Special Elite · Courier Prime |
| **Backend**     | Firebase Functions (Python 3.11)           |
| **ML Model**    | TF-IDF Vectorizer + Logistic Regression    |
| **Training Data**| `Fake.csv` + `True.csv` — 114MB combined |
| **Cloud Storage**| GCS bucket for model artifacts (`.pkl`)  |
| **Database**    | Cloud Firestore — analysis history         |
| **Auth**        | Firebase Authentication (Google Sign-In)   |
| **Hosting**     | Firebase Hosting (frontend)                |
| **Accuracy**    | ~94% on held-out test set                  |
| **Demo Mode**   | `VITE_USE_MOCK=true` — no cloud required   |

---

```
┌─────────────────────────────────────────────────────────────────┐
│                ◆ PROJECT STRUCTURE ◆                           │
└─────────────────────────────────────────────────────────────────┘
```

```
fake-news-detector/
│
├── client/                          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Newspaper masthead + sticky nav
│   │   │   ├── HeroSection.tsx      # Full-viewport front page (3D unfold)
│   │   │   ├── AnalyzerForm.tsx     # Article input + 3D paper sheet
│   │   │   ├── ResultCard.tsx       # Verdict + rubber stamp + dropcap
│   │   │   ├── ConfidenceMeter.tsx  # Horizontal ink confidence bar
│   │   │   ├── HistoryPanel.tsx     # Recent verdicts sidebar
│   │   │   ├── About.tsx            # Project info + GitHub button
│   │   │   └── Footer.tsx           # Colophon footer
│   │   ├── services/
│   │   │   ├── api.ts               # Mock mode + real Firebase calls
│   │   │   └── history.ts           # localStorage history service
│   │   ├── types/index.ts           # TypeScript interfaces
│   │   ├── App.tsx                  # 3-column layout + scroll reveal
│   │   ├── index.css                # @theme tokens + newspaper CSS
│   │   └── main.tsx                 # Entry point
│   ├── index.html                   # Google Fonts + meta tags
│   ├── vite.config.ts
│   └── .env                         # VITE_USE_MOCK=true + Firebase config
│
├── functions/                       # Firebase Functions (Python)
│   ├── main.py                      # predict() HTTP endpoint
│   └── requirements.txt
│
├── ml/                              # Model training scripts
│   ├── train.py                     # TF-IDF + LogReg on Fake/True CSVs
│   └── requirements.txt
│
├── firebase.json                    # Hosting + functions config
├── .firebaserc                      # Project alias
├── .gitignore                       # Excludes CSVs, .pkl, node_modules
└── README.md                        # This file
```

---

```
┌─────────────────────────────────────────────────────────────────┐
│                  ◆ QUICK START ◆                               │
└─────────────────────────────────────────────────────────────────┘
```

### Prerequisites

```bash
node --version    # v20 or higher
python --version  # 3.11 or higher
```

### 1 · Clone the repository

```bash
git clone https://github.com/harshhatela/fake-news-detector.git
cd fake-news-detector
```

### 2 · Install frontend dependencies

```bash
cd client
npm install
```

### 3 · Start in demo mode (no cloud required)

```bash
# VITE_USE_MOCK=true is already set in client/.env
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** — paste any news article
and hit **VERIFY NOW →** to see the full UI with mock predictions.

---

```
┌─────────────────────────────────────────────────────────────────┐
│              ◆ FULL DEPLOYMENT GUIDE ◆                         │
└─────────────────────────────────────────────────────────────────┘
```

### Step 1 — Create Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `fake-news-detector`
3. Enable **Google Analytics** (optional)
4. In the project: enable **Firestore Database**, **Authentication** (Google provider), **Hosting**, and **Functions**

### Step 2 — Configure environment variables

```bash
# client/.env
VITE_USE_MOCK=false
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 3 — Train the model

```bash
cd ml
pip install -r requirements.txt

# LOCAL training (uses Fake.csv + True.csv in root)
LOCAL_TRAINING=true python train.py

# CLOUD training (uploads to GCS — requires gcloud auth)
BUCKET=gs://your-bucket-name python train.py
```

### Step 4 — Deploy to Firebase

```bash
# Install Firebase CLI
npm install -g firebase-tools
firebase login

# Update .firebaserc with your project ID
firebase use your_project_id

# Deploy everything
cd client && npm run build
firebase deploy
```

Your app is now live at `https://your_project_id.web.app` 🎉

---

```
┌─────────────────────────────────────────────────────────────────┐
│                ◆ HOW THE MODEL WORKS ◆                         │
└─────────────────────────────────────────────────────────────────┘
```

```
ARTICLE TEXT
     │
     ▼
┌────────────────────────────────┐
│       PREPROCESSING            │
│  • Lowercase all text          │
│  • Strip URLs & HTML tags      │
│  • Remove special characters   │
│  • Remove NLTK stopwords       │
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│       TF-IDF VECTORIZER        │
│  • max_features = 50,000       │
│  • ngram_range = (1, 2)        │
│  • Unigrams + bigrams          │
│  • Transforms text → numbers   │
└───────────────┬────────────────┘
                │
                ▼
┌────────────────────────────────┐
│    LOGISTIC REGRESSION         │
│  • class_weight = 'balanced'   │
│  • Trained on 114MB of data    │
│  • ~94% test accuracy          │
│  • Outputs probability [0,1]   │
└───────────────┬────────────────┘
                │
                ▼
         VERDICT + CONFIDENCE
         FAKE (87%) or REAL (94%)
```

**Training data sources:**
- `Fake.csv` — 60MB of fabricated news articles
- `True.csv` — 54MB of verified news articles
- Labels: `0 = FAKE`, `1 = REAL`

---

```
┌─────────────────────────────────────────────────────────────────┐
│                  ◆ CONTRIBUTING ◆                              │
└─────────────────────────────────────────────────────────────────┘
```

Contributions are welcome. The bureau accepts dispatches in the form of pull requests.

```bash
# Fork the repository
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes
# Commit with a descriptive message
git commit -m "feat: add URL scraping support"

# Push and open a pull request
git push origin feature/your-feature-name
```

**Good first issues:**
- Add URL scraping via `newspaper3k` in the Firebase Function
- Add a model performance chart to the About section
- Improve mobile responsiveness of the 3-column grid
- Add support for multiple languages

---

```
┌─────────────────────────────────────────────────────────────────┐
│                    ◆ ROADMAP ◆                                 │
└─────────────────────────────────────────────────────────────────┘
```

- [x] Newspaper-themed React frontend
- [x] TF-IDF + Logistic Regression ML model
- [x] Firebase Functions backend
- [x] Demo mode (no cloud required)
- [x] Scroll-reveal animations + 3D paper effects
- [x] History panel (localStorage)
- [ ] URL scraping — paste a link, scrape the article automatically
- [ ] Firebase Auth — save history to Firestore per user
- [ ] DistilBERT upgrade — replace TF-IDF with transformer embeddings
- [ ] Browser extension — verify articles while browsing
- [ ] API rate limiting + abuse protection
- [ ] Multi-language support

---

```
┌─────────────────────────────────────────────────────────────────┐
│                    ◆ LICENSE ◆                                 │
└─────────────────────────────────────────────────────────────────┘
```

MIT License — see [LICENSE](LICENSE) for details.

---

```
┌─────────────────────────────────────────────────────────────────┐
│                CORRECTIONS & CLARIFICATIONS                     │
└─────────────────────────────────────────────────────────────────┘
```

*This bureau acknowledges that artificial intelligence, while formidable,
is not infallible. We regret any verdicts rendered in error and remind
our readership that critical thinking remains the finest instrument of truth.*

*The Truth Herald's verdicts are offered as guidance, not gospel.*

---

<div align="center">

**— ◆ —**

*Built with ink, paper, and Python*

*by [Harsh Hatela](https://github.com/harshhatela)*

**[⭐ Star this repo](https://github.com/harshhatela/fake-news-detector) · [🐛 Report an issue](https://github.com/harshhatela/fake-news-detector/issues) · [🔀 Fork it](https://github.com/harshhatela/fake-news-detector/fork)**

</div>
