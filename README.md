# Assam Government Decision Support Platform
### Problem Code: NESFIC-D-36 (NESFIC 2026)
**Official Challenge Title:** Trusted Government Knowledge, Rules & Document Assistant  
**Organized by:** Department of Innovation, Incubation and Startups (DIIS), Government of Assam & Assam Innovation and Startup Foundation (AISF)  
**Official Portal URL:** [https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-36](https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-36)  
**Primary Beneficiaries & Pilot Partners:**
- **Assam Administrative Staff College (AASC)** (Civil service training & capacity building)
- **Administrative Reforms and Training Department (ARTD)** (Service rules, MOP, APAR guidelines)
- **Pension & Public Grievances Department (P&PGD)** (Assam Pension Rules 1969, retiral benefits)
- **Department of Science, Technology and Climate Change (STCCD)** (State innovation governance)
- **Assam State Space Application Centre (ASSAC)** (Drone survey SOPs & satellite GIS data policy)

---

## 🏛️ Problem Statement Overview

Authorised government officials handle high-stakes administrative decisions across thousands of pages of fragmented Service Rules, Fundamental & Subsidiary Rules (FR & SR), Pension Codes, Secretariat Manuals of Office Procedure (MOP), Gazettes, and departmental circulars. 

Generic public AI chatbots hallucinate, leak sensitive state data, and cannot be trusted for government decision-making. 

**NESFIC-D-36 Mandate:** Develop a secure, sovereign, government-controlled Generative AI, Retrieval-Augmented Generation (RAG) and Decision-Support Assistant tailored for Assam Government workflows that guarantees:
1. **100% Strict Clause-Level Source Traceability:** Every factual response quotes the exact Clause, Act/OM number, Gazette publication date, and issuing department.
2. **Zero-Hallucination Guardrails:** If a query cannot be grounded in verified Assam Government circulars, the system safely refuses rather than hallucinating answers.
3. **Bilingual Administrative Support:** Simultaneous English and Assamese (অসমীয়া) outputs.
4. **Secretariat Drafting Assistance:** Generation of structured Secretariat Note-Sheets (with 2.5-inch margins for officer remarks), formal Office Memorandums, and RTI replies.
5. **Comprehensive Admin Governance Panel:** Full document ingestion, role-based access control (RBAC), query audit logs, and automated RAG Triad benchmarking.

---

## 🚀 Key Features Built

### 1. 🏛️ Rules & Knowledge Assistant (Civil Service AI)
- Multi-departmental semantic search covering:
  - **Assam Services (Pension) Rules, 1969:** Qualifying service (Rule 31), Full pension calculation at 50% of emoluments (Rule 67), and Commutation ceiling up to 40% (Rule 99).
  - **Assam Services (Conduct) Rules, 1965:** Rule 3 (Integrity and devotion), Rule 11 (Private trade prohibition), and Rule 14 (Annual Immovable Property Return by Jan 31).
  - **Fundamental Rules & Subsidiary Rules (FR & SR):** FR 56(a) (Age of compulsory retirement at 60 years), SR 118 (Joining time calculation), and Maternity Leave (180 days) / Child Care Leave (730 days).
  - **Assam Public Procurement Rules (APPR) 2020:** Mandatory open e-tendering threshold (> ₹50 Lakhs) and GeM direct purchase limits.
- **Side-by-Side Verifiable Citation Docket:** Displays exact excerpts, issuing dates, and cryptographic SHA-256 document fingerprint.
- **Bilingual Switcher:** Instant toggle between English and Assamese (অসমীয়া).

### 2. 📚 Authoritative Rules & Circulars Explorer
- Interactive, searchable catalog of all digitized Assam service acts and manuals.
- In-app document viewer modal rendering exact clauses and statutory Gazette citations.

### 3. ✍️ Secretariat Note-Sheet & OM Drafter
- Automated bureaucratic drafting adhering to the **Manual of Office Procedure (MOP)**:
  - **Secretariat Note-Sheet:** Traditional government paper styling with quarter-page left margin for senior officer initials.
  - **Government Office Memorandum (OM):** Official Dispur Secretariat notification layout.
  - **RTI Statutory Reply:** Point-wise factual responses under Section 6(1) of the RTI Act 2005.
  - One-click **Print / Save as PDF** utility.

### 4. 🛰️ ASSAC Geospatial & Drone Protocols (Pilot Workflow)
- Interactive checklists for ASSAC and Science & Technology workflows:
  - Drone survey SOPs (< 5 cm Ground Sampling Distance, DigitalSky flight clearance, District Magistrate NOC).
  - Satellite data sharing classification (< 1m resolution restricted in border buffer zones).
  - Inter-departmental GIS spatial data standards (EPSG:4326 / EPSG:32646).

### 5. 🛡️ Full-Featured Admin Control Center
1. **Document Ingestion & Cryptographic Indexer:** Upload new circulars, extract searchable clauses, and assign cryptographic SHA-256 seals.
2. **Rule Precedence & Supersession Graph:** Visualizes which OMs amend or supersede legacy provisions.
3. **Real-Time Traceability & Audit Stream:** Chronological feed recording officer queries, departments, citation counts, groundedness percentage, and latency.
4. **Role-Based Access Control (RBAC):** Dynamic role switcher simulating 5 administrative tiers:
   - `VIEWER`: General Officer / Citizen (Public Acts & MOP)
   - `SECTION_OFFICER`: Section Officer / Superintendent (Notesheets & OMs)
   - `DEPT_SANCTIONING`: Under Secretary / Sanctioning Authority (Gratuity & Sanctions)
   - `AASC_TRAINER`: AASC Master Faculty (Curriculum & Evaluation)
   - `GOV_ADMIN`: State Administrator (Full Ingestion & Guardrails)
5. **RAG Triad Automated Benchmarking:** 5-question automated evaluation test measuring Context Relevance, Groundedness Score, and Citation Coverage (98%+ score).

### 6. 🌐 SEO, GEO & Metadata Infrastructure
- **Geotargeting Tags:** Guwahati/Dispur coordinates (`26.1445; 91.7362`), `geo.region: IN-AS`, `geo.placename: Guwahati, Dispur, Assam, India`.
- **OpenGraph & Twitter Cards:** Full rich-card preview tags with bilingual locale support.
- **Schema.org Structured Data (JSON-LD):** `GovernmentService` and `SoftwareApplication` referencing DIIS, AASC, ARTD, and ASSAC.
- **Custom Vector SVG Favicon:** Government shield crest with the star of wisdom and verification seal (`favicon.svg`).

---

## 💡 Suggested GitHub Repository Names

| Priority | Repository Name | Rationale |
| :--- | :--- | :--- |
| **Recommended** | `Decision-Support-Platform-NESFIC-D-36` | Direct 1:1 match with active workspace, grant proposals, and NESFIC challenge filing |
| **Alternative 1** | `nesfic-d36-assam-gov-assistant` | Short, standardized, challenge-code first |
| **Alternative 2** | `assam-gov-decision-support-platform` | Enterprise civic-tech standard for state governance |
| **Alternative 3** | `aasc-trusted-document-assistant` | Centers on primary pilot partner: Assam Administrative Staff College |
| **Alternative 4** | `xopun-proshasan-ai` | Vernacular Assamese brand (*Xopun* = Vision, *Proshasan* = Administration) |

---

## 🚀 Quickstart & Running the Application

### 1. Run Backend Unit Tests (In-Process)
```bash
npm test -w apps/api
```
All 9 unit tests verify:
- Authoritative document seeding across all 5 departments
- RAG query retrieval with accurate clause citation matching
- Superannuation retirement age resolution to FR 56
- Zero-hallucination guardrail interception (safe refusal of ungrounded questions)
- Bilingual Assamese response generation
- Secretariat Note-sheet and OM drafting format
- Document ingestion with SHA-256 fingerprinting
- Audit logging and RAG Triad benchmarking
- NESFIC-D-36 challenge data model alignment

### 2. Start the Backend API (Port 4000)
```bash
npm run dev:api
# API runs on http://localhost:4000
```

### 3. Start the Web Portal (Port 3000)
```bash
npm run dev:web
# Open http://localhost:3000 in your browser
```

### 4. Cloudflare Pages Functions (Serverless Edge)
The platform is fully deployable to Cloudflare Pages edge network via `apps/web/functions/api/[[route]].js` and `wrangler.toml`.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck and NESFIC-D-36 service status |
| `GET` | `/api/meta` | Department list, rule categories, and RBAC roles |
| `GET` | `/api/documents` | List indexed Assam Government OMs, Acts, and Rules |
| `GET` | `/api/documents/:id` | Full text, clauses, and cryptographic hash of a document |
| `POST` | `/api/query` | RAG semantic query with strict citations and zero-hallucination checks |
| `POST` | `/api/draft` | Generate structured Secretariat Note-Sheet, OM, or RTI letter |
| `POST` | `/api/admin/documents` | Ingest new circular with automated SHA-256 seal |
| `GET` | `/api/admin/audit-logs` | Chronological audit stream of queries and groundedness scores |
| `GET` | `/api/admin/benchmarks` | Run or retrieve RAG Triad automated evaluation benchmark results |
| `GET` | `/api/admin/stats` | Aggregated system telemetry and coverage metrics |

---

## 🏛️ Project Directory Structure

```
Decision-Support-Platform-NESFIC-D-36/
├── packages/
│   ├── shared/             # Shared constants, Merkle tree, SHA-256 verifier, and taxonomies
│   │   ├── src/constants.js
│   │   ├── src/merkle.js
│   │   └── src/index.js
│   └── contracts/          # Smart contract anchoring components
├── apps/
│   ├── api/                # Node.js REST API & RAG Engine
│   │   ├── src/db.js       # Seeded Assam Government document store & citation matcher
│   │   ├── src/server.js   # HTTP server endpoints
│   │   └── test/api.test.js # Comprehensive test suite
│   └── web/                # Government Web Portal
│       ├── public/         # Static assets (HTML, CSS, JS, Favicon)
│       │   ├── index.html  # SEO/GEO meta tags, tabs, and tutorial modal
│       │   ├── styles.css  # Dispur / AASC Government design system
│       │   ├── app.js      # Edge controller, bilingual logic, and drafting engine
│       │   └── favicon.svg # Assam Government shield crest vector
│       └── functions/api/  # Cloudflare Pages Serverless Edge API
│           └── [[route]].js
└── README.md
```
