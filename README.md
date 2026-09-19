# TalentPrep AI — Autonomous Technical Mock Interview & STAR Telemetry Platform

TalentPrep AI is an enterprise-grade full-stack MERN application engineered to simulate high-stakes software engineering interviews. It combines real-time conversational audio transcription, an anti-cheat heuristic inspection pipeline, Gemini-driven STAR evaluations, ATS keyword compatibility metrics, and an ACID-compliant atomic credit ledger.

---

## 🌐 Live Deployments & Endpoints

| Resource | Environment | URL | Status |
| :--- | :--- | :--- | :--- |
| **Frontend Web App** | Netlify (Edge) | [https://talentprep.netlify.app](https://talentprep.netlify.app) | `Active` |
| **REST API Engine** | Vercel Serverless | [https://talent-prep.vercel.app](https://talent-prep.vercel.app) | `Active` |
| **API Healthcheck** | Production Server | [https://talent-prep.vercel.app/](https://talent-prep.vercel.app/) | `200 OK` |

---

## ⚡ Key Highlights & Core Capabilities

- **Autonomous Scenario Generation:** Compiles 5 distinct algorithmic, architectural, and behavioral challenges tailored dynamically to seniority tiers (`Entry / Grad`, `Junior`, `Mid-Level`, `Senior / Staff`) and target employer rubrics (e.g., Google, Meta, Stripe, High-Growth Startup).
- **Gemini Model Orchestration:** Powered by Google's `gemini-3.6-flash` model via `@google/generative-ai` with strict `application/json` schema enforcement and fallback model cascades.
- **Heuristic Anti-Cheat & Parroting Defense:** Pre-audits candidate speech transcripts for empty payloads, trivial responses (<4 words), direct question copy-pastes, and keyword echo ratios, automatically awarding 0% before invoking external AI inference.
- **STAR Rubric Analysis:** Analyzes technical and behavioral answers against Situation, Task, Action, and Result parameters, outputting actionable critiques alongside exemplar Staff-level model responses.
- **Atomic Credit Ledger:** Utilizes MongoDB conditional operations (`{ _id: userId, credits: { $gt: 0 } }, { $inc: { credits: -1 } }`) to prevent race conditions, overdrafts, and client-side balance manipulation, with automatic rollback on downstream model generation failures.
- **Active Session Resumption Queue:** Detects orphaned or unfinished `IN_PROGRESS` interview sessions upon login, enabling seamless resumption or intentional archival.
- **Integrated Payment Checkout:** End-to-end payment orchestration via Razorpay SDK with cryptographic signature verification (`HmacSHA256`) and real-time frontend ledger reconciliation.

---

## 🏗️ Architecture & Data Flow

```text
  [ Candidate Browser ] (React 18 + Vite SPA on Netlify)
         │
         │ 1. HTTPS / Bearer JWT (Axios Request Interceptor)
         ▼
  [ Vercel Edge Router ] (vercel.json CORS Preflight & Rewrites)
         │
         │ 2. Express v5 Serverless Runtime (index.js)
         ├───► [ Auth & Session Middleware ] (JWT Verify + Mongo ObjectId Normalizer)
         │
         ├───► [ Credit Engine ] ──► (Atomic $inc: -1 from MongoDB Atlas)
         │           │
         │           ▼ (If Credits < 1: 403 Forbidden)
         │
         ├───► [ Scenario Generator ] ──► [ Gemini 3.6 Flash ] (Dynamic 5-Question Array)
         │
         ├───► [ Anti-Cheat Pre-Audit ] ──► (Echo / Copy-Paste / Sub-4 Word Filter)
         │           │
         │           ├── (Cheated: Assigned 0% + Flagged)
         │           └── (Valid: Sent to Gemini for STAR Scoring)
         │
         └───► [ Persistence Layer ] (MongoDB Atlas Document Store)
```

## 🛠️ Technology Stack

### Frontend Client
- **Framework:** React 18 with Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS, Obsidian #050507 Dark Canvas
- **Motion & UI:** Framer Motion, Lucide React, SweetAlert2
- **Networking:** Axios with dynamic Request/Response Interceptors
- **State Management:** React Context API (UserContext, CreditContext, AuthContext)

### Backend Server
- **Runtime:** Node.js (ES Modules format)
- **Framework:** Express v5 with modern path-to-regexp compatibility
- **Database Driver:** Mongoose v8+ with MongoDB Atlas
- **AI Integration:** Google Generative AI SDK (`@google/generative-ai`)
- **Authentication:** JWT (JSON Web Tokens), bcryptjs, Google OAuth 2.0
- **Payments:** Razorpay Node SDK with SHA-256 HMAC signature verification

## 📁 Repository Directory Layout

```
├── client/                              # Vite Frontend Application
│   ├── public/
│   │   ├── _redirects                  # Netlify Single-Page Application rewrite rule
│   │   └── favicon.svg                 # Application Brand Icon
│   ├── src/
│   │   ├── assets/                     # Graphic resources and animations
│   │   ├── components/                 # Reusable UI Components
│   │   │   ├── ActiveSessionModal.jsx  # Recovery modal for interrupted interviews
│   │   │   ├── ConfigureInterview.jsx  # Dual-cockpit setup & telemetry panel
│   │   │   ├── Navbar.jsx              # Responsive header with real-time credit pill
│   │   │   └── ScoreCard.jsx           # STAR metric visualization component
│   │   ├── context/                    # Central Application State
│   │   │   ├── auth/authContext.jsx    # Session persistence & logout handler
│   │   │   └── userContext/
│   │   │       └── UserContext.jsx     # Credit economy & profile synchronization
│   │   ├── data/
│   │   │   └── plans.js                # Razorpay credit tier matrix
│   │   ├── pages/
│   │   │   ├── AIInterview.jsx         # Mock interview entry point
│   │   │   ├── Dashboard.jsx           # Candidate metrics & performance graphs
│   │   │   ├── Login.jsx               # Authentication portal
│   │   │   ├── NotFound.jsx            # Minimalist 404 recovery node
│   │   │   ├── Pricing.jsx             # Credit top-up checkout portal
│   │   │   └── WaitingRoom.jsx         # Model handshake & preparation cockpit
│   │   ├── services/
│   │   │   └── payment.service.js      # Razorpay client checkout lifecycle
│   │   ├── utils/
│   │   │   └── api.js                  # Axios client with bearer token injection
│   │   ├── App.jsx                     # Route definitions
│   │   └── main.jsx                    # React virtual DOM bootstrap
│   ├── index.html                      # HTML5 root with FOUC prevention styles
│   ├── package.json
│   └── vite.config.js
│
└── server/                              # Express v5 Backend Server
    ├── config/
    │   └── db.js                       # MongoDB Atlas connection pooling
    ├── controllers/
    │   ├── auth.controller.js          # Registration, login, Google OAuth
    │   ├── interview.controller.js     # Interview lifecycle, queueing, evaluations
    │   ├── payment.controller.js       # Order creation & crypto verification
    │   └── profile.controller.js       # User telemetry and password management
    ├── middlewares/
    │   └── auth.middleware.js          # Bearer token verification & route protection
    ├── models/
    │   ├── interview.model.js          # Interview documents, rubrics & transcripts
    │   ├── payment.model.js            # Transaction history & ledger logs
    │   └── user.model.js               # Candidate schema & credit counter
    ├── routes/
    │   ├── auth.routes.js              # /api/v1/auth endpoints
    │   ├── interview.routes.js         # /api/v1/interview endpoints
    │   └── payment.routes.js           # /api/v1/payment endpoints
    ├── services/
    │   └── gemini.service.js           # Gemini 3.6 Flash prompts & anti-cheat engine
    ├── utils/
    │   └── token.js                    # JWT signing utilities
    ├── vercel.json                     # Vercel serverless rewrites and CORS headers
    ├── index.js                        # Server entry point & serverless export
    └── package.json
```

## ⚙️ Environment Variables Reference

### Backend Configuration (`server/.env` & Vercel Dashboard)

| Variable | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `PORT` | Number | Local server port | `5000` |
| `NODE_ENV` | String | Environment mode | `production` / `development` |
| `MONGO_URI` | URI | MongoDB Atlas Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/talentprep` |
| `JWT_SECRET` | String | Secret key for signing session tokens | `your_super_secret_jwt_key` |
| `JWT_EXPIRES_IN` | String | Token validity lifespan | `7d` |
| `GEMINI_API_KEY` | String | Google AI Studio Production API Key | `AIzaSyD...` |
| `RAZORPAY_KEY_ID` | String | Razorpay API Key ID | `rzp_live_xxxxxxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | String | Razorpay API Secret | `xxxxxxxxxxxxxxxxxxxxxxxx` |

### Frontend Configuration (`client/.env` & Netlify Dashboard)

| Variable | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | URL | Target backend API base URL | `https://talent-prep.vercel.app/api/v1` |
| `VITE_RAZORPAY_KEY_ID` | String | Public Razorpay Client Key | `rzp_live_xxxxxxxxxxxx` |

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js: >= 18.18.0
- npm: >= 9.0.0
- MongoDB Atlas Cluster: IP Access configured to `0.0.0.0/0` (or local IP)
- Google AI Studio API Key: Access to `gemini-3.6-flash`

### 2. Clone the Repository

```bash
git clone https://github.com/<your-username>/talentprep.git
cd talentprep
```

### 3. Setup and Run the Server

```bash
cd server
npm install
# Create environment file
cp .env.example .env
# Open .env and fill in MONGO_URI, JWT_SECRET, GEMINI_API_KEY, etc.
# Start development server
npm run dev
```

The server will boot on `http://localhost:5000` with the healthcheck active at `http://localhost:5000/`.

### 4. Setup and Run the Client

```bash
cd ../client
npm install
# Create environment file
cat <<EOF > .env
VITE_API_URL=http://localhost:5000/api/v1
VITE_RAZORPAY_KEY_ID=rzp_test_yourTestKeyHere
EOF
# Start development client
npm run dev
```

The frontend application will launch at `http://localhost:5173`.

## 📡 Comprehensive API Specification

### Authentication Subsystem (`/api/v1/auth`)

**1. Register Account**
- Endpoint: `POST /api/v1/auth/signup`
- Payload:
```json
{
  "username": "developer",
  "email": "dev@talentprep.ai",
  "password": "StrongPassword123!"
}
```
- Response (201 Created):
```json
{
  "success": true,
  "token": "eyJhbGciOi...",
  "user": { "_id": "60d...", "email": "dev@talentprep.ai", "credits": 3 }
}
```

**2. Authenticate Session**
- Endpoint: `POST /api/v1/auth/login`
- Payload: `{ "email": "dev@talentprep.ai", "password": "StrongPassword123!" }`
- Response (200 OK): `{ "success": true, "token": "...", "user": { ... } }`

**3. Verify Active Token**
- Endpoint: `GET /api/v1/auth/verify`
- Headers: `Authorization: Bearer <token>`
- Response (200 OK): `{ "success": true, "user": { "_id": "...", "credits": 2 } }`

### Mock Interview Engine (`/api/v1/interview`)

**1. Check Active Session in Queue**
- Endpoint: `GET /api/v1/interview/check-active`
- Headers: `Authorization: Bearer <token>`
- Response (200 OK):
```json
{
  "success": true,
  "hasActive": true,
  "activeInterview": {
    "_id": "66e...",
    "targetRole": "Full-Stack Engineer",
    "status": "IN_PROGRESS"
  }
}
```

**2. Archive Lingering Sessions**
- Endpoint: `POST /api/v1/interview/archive-active`
- Headers: `Authorization: Bearer <token>`
- Response (200 OK): `{ "success": true, "message": "Active sessions successfully archived" }`

**3. Initialize Interview & Compile Rubrics**
- Endpoint: `POST /api/v1/interview/create`
- Headers: `Authorization: Bearer <token>`
- Payload:
```json
{
  "targetRole": "Full-Stack Engineer",
  "targetCompany": "Google / Meta Rubric",
  "experienceLevel": "Junior Engineer (1 - 2 Yrs)",
  "currentRole": "Frontend Intern",
  "techStack": "React, TypeScript, Node.js, PostgreSQL"
}
```
- Response (201 Created):
```json
{
  "success": true,
  "interviewId": "66ea...",
  "credits": 1,
  "questions": [
    {
      "questionId": "q1",
      "questionText": "Explain the reconciliation algorithm and component lifecycle stages in React 18.",
      "category": "Technical"
    }
  ]
}
```
- Error Responses:
  - `401 Unauthorized`: Token missing or expired.
  - `403 Forbidden`: `credits <= 0` (User must top up).

**4. Submit Transcripts & Generate STAR Evaluation**
- Endpoint: `POST /api/v1/interview/:id/evaluate`
- Headers: `Authorization: Bearer <token>`
- Payload:
```json
{
  "transcripts": [
    {
      "questionId": "q1",
      "questionText": "Explain the reconciliation algorithm in React.",
      "userAnswerText": "In React 18, the Fiber architecture splits rendering into reconciler and commit phases..."
    }
  ]
}
```
- Response (200 OK):
```json
{
  "success": true,
  "evaluation": {
    "overallScorePercentage": 84,
    "overallScore": 84,
    "summary": "Candidate demonstrated crisp foundational depth with solid architectural awareness.",
    "evaluations": [
      {
        "questionId": "q1",
        "scorePercentage": 85,
        "feedback": "Strong explanation of Fiber phases. Consider addressing concurrent rendering mechanics.",
        "idealAnswer": "A Staff Engineer would structure this by delineating the Virtual DOM diffing pass..."
      }
    ],
    "strengths": ["Clear breakdown of reconciliation phases", "Fluent terminology"],
    "improvements": ["Elaborate on edge-case memory trade-offs"]
  }
}
```

**5. Candidate Analytics Aggregate**
- Endpoint: `GET /api/v1/interview/analytics`
- Headers: `Authorization: Bearer <token>`
- Response (200 OK):
```json
{
  "totalInterviews": 5,
  "overallScore": 79,
  "highScoresCount": 3,
  "trendData": [
    { "session": "Session 1", "score": 65, "role": "Full-Stack Engineer" },
    { "session": "Session 2", "score": 82, "role": "Full-Stack Engineer" }
  ],
  "recentInterviews": [ "..." ]
}
```

### Payments & Credits (`/api/v1/payment`)

**1. Create Gateway Order**
- Endpoint: `POST /api/v1/payment/create-order`
- Headers: `Authorization: Bearer <token>`
- Payload: `{ "planId": "pro_tier" }`
- Response (200 OK): `{ "id": "order_NX8...", "amount": 49900, "currency": "INR" }`

**2. Verify Payment Cryptographic Signature**
- Endpoint: `POST /api/v1/payment/verify-payment`
- Headers: `Authorization: Bearer <token>`
- Payload:
```json
{
  "razorpay_order_id": "order_NX8...",
  "razorpay_payment_id": "pay_NX8...",
  "razorpay_signature": "a1b2c3d4e5f6...",
  "creditsToAdd": 10
}
```
- Response (200 OK): `{ "success": true, "credits": 11 }`

## 🛡️ Heuristic Anti-Cheat & Evaluation Pipeline

The evaluation engine employs a two-tier verification mechanism to prevent abuse and false positives:

```text
Incoming Response ──► [ Word Count Audit ] ──► Less than 4 words? ───────► Score: 0% (Insufficient)
                            │
                            ▼
                      [ Echo Inspection ] ──► String matches Question? ──► Score: 0% (Copied Prompt)
                            │
                            ▼
                      [ Jaccard Overlap ] ──► Keyword ratio > 0.85? ─────► Score: 0% (Parroting)
                            │
                            ▼
                      [ Valid Response ] ───► Dispatched to Gemini 3.6 Flash (STAR Scoring)
```

- **Sub-4 Word Filter:** Single-word submissions ("yes", "ok", "idk") are instantly flagged and denied scoring.
- **Normalized Echo Match:** Strips punctuation, casing, and whitespace. If the candidate echoed the question back to the engine, it receives a 0% mark and an explicit penalty audit notice.
- **Keyword Parroting Ratio:** Compares key technical terms in the answer against the question. If the vocabulary overlap exceeds 85% with zero novel architectural terms, it is classified as a reordered copy and rejected.

## 🚢 Production Deployment Playbook

### Vercel Serverless (Backend)
1. Import repository and set Root Directory to `server`.
2. Ensure `server/vercel.json` contains rewrites pointing `/(.*)` to `/index.js`.
3. Configure all Production Environment Variables under Project Settings > Environment Variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
4. In MongoDB Atlas > Network Access, confirm IP `0.0.0.0/0` is allowed to accommodate dynamic serverless IPs.

### Netlify Edge (Frontend)
1. Import repository and set Base Directory to `client`.
2. Configure Build Command to `npm run build` and Publish Directory to `dist`.
3. Set environment variable: `VITE_API_URL=https://talent-prep.vercel.app/api/v1`.
4. Ensure `client/public/_redirects` exists with the rule:

```text
/*    /index.html   200
```

## 🧪 Testing & Verification Commands

```bash
# Verify Backend Health directly
curl -X GET https://talent-prep.vercel.app/

# Test Live CORS Preflight Response
curl -X OPTIONS https://talent-prep.vercel.app/api/v1/interview/create \
  -H "Origin: https://talentprep.netlify.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization" \
  -I

# Validate Gemini Model Connectivity (From inside server directory)
node -e "
import('@google/generative-ai').then(async ({ GoogleGenerativeAI }) => {
  const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const m = ai.getGenerativeModel({ model: 'gemini-3.6-flash' });
  const res = await m.generateContent('Say OK');
  console.log('Model Response:', res.response.text());
});
"
```

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
