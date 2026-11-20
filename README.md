# Assam Tea Digital Traceability Platform
### Problem Code: NESFIC-I-08 (NESFIC 2026)
**Organized by:** Department of Innovation, Incubation and Startups (DIIS), Government of Assam  
**Problem Owner:** Tea Research Association (TRA) – Tocklai (New Technology Committee)  
**Objective:** End-to-End Digital Traceability of Tea Across the Assam Tea Value Chain

---

## 🍵 Key Features Built

1. **Assam Geographical Indication (GI) & Provenance Shield:**
   - Cryptographic verification of authentic Assam GI Tag (`#GI-IN-ASM-TEA-XXXX`).
   - Anti-counterfeit serialized QR codes with Merkle tree proof verification.
2. **Small Tea Grower (STG) / Field App ("চাহ-সেৱা Chah-Sewa"):**
   - Multilingual interface (Assamese / English).
   - Geo-fenced harvest logging with verified plantation boundary polygons (Jorhat, Dibrugarh, Tinsukia, Golaghat).
   - Real-time GPS capture with instantaneous cross-referencing against Cadastral Land Parcel records (Dag & Patta numbers).
   - Bluetooth / IoT digital weighbridge integration eliminating manual leaf manipulation and moisture deductions.
3. **High-Precision Cadastral GIS Land Parcel Engine (Dharitree / ILRMS Standards):**
   - Dual-mode GIS viewer: Toggle between macro Assam valley tea district distribution and micro-cadastral land survey polygons.
   - Interactive Dag parcel inspection (`Dag #142/518`, `Dag #143/519`, `Dag #144/520`, `Dag #145/521`, `Dag #146/522`, `Dag #147/523`).
   - Land tenure mapping: Periodic Patta (ম্যাদী পট্টা), Khiraj Myadi, Research Grants, and Nursery blocks.
   - EU Deforestation Regulation (EUDR) anti-deforestation audit trail and eco-sensitive non-plucking riparian buffer enforcement.
   - Live sensor radar ping overlay displaying plucker positions inside registered Dag boundaries.
4. **Estate & Bought Leaf Factory (BLF) Management:**
   - Real-time IoT sensor telemetry (Withering loss %, Fermentation humidity %, VFBD drying temperatures).
   - Batch consolidation & processing into CTC (BOP, BP, OF) and Orthodox (TGFOP1) grades.
4. **TRA Tocklai Quality & Chemical Residue Lab Verification:**
   - NABL accredited lab certificate generation & IPFS cryptographic hash pinning.
   - Plant Protection Code (PPC) pesticide Maximum Residue Limit (MRL) validation (Emamectin Benzoate, Quinalphos, Hexaconazole, Thiamethoxam).
5. **Guwahati Tea Auction Centre (GTAC) Handover:**
   - Custody transfer tracking for lots sold through electronic auction.
6. **Smart Contracts (`packages/contracts`):**
   - `TeaRegistry.sol`: Decentralized registry of STGs, BLFs, certified laboratories, and TRA administrators.
   - `TeaBatchProvenance.sol`: Immutable batch lifecycle tracking and periodic state-root Merkle anchoring on Layer 2 blockchain.

---

## 🚀 Quickstart & Running the Application

### 1. Run Unit Tests (In-Process)
```bash
npm test -w apps/api
```
All unit tests verify batch creation, weighbridge receipts, factory transitions, lab MRL validation, and Merkle tree root hashing.

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

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck and service status |
| `GET` | `/api/batches` | List all tracked tea batches across the valley |
| `GET` | `/api/batches/:id` | Detailed batch lifecycle information |
| `POST` | `/api/batches/harvest` | Record STG plucking with GPS coordinates |
| `POST` | `/api/batches/:id/weighbridge` | Sync digital weighbridge scale reading |
| `POST` | `/api/batches/:id/process` | Record factory manufacturing parameters & grading |
| `POST` | `/api/batches/:id/lab-test` | Record NABL pesticide MRL compliance report |
| `POST` | `/api/batches/:id/auction` | GTAC auction lot allocation & custody transfer |
| `GET` | `/api/verify/:qrToken` | Public consumer Leaf-to-Cup verification |
| `POST` | `/api/blockchain/anchor` | Compute Merkle tree root and anchor to blockchain |
| `GET` | `/api/analytics` | TRA Tocklai valley-wide analytics and compliance rate |
| `GET` | `/api/iot/telemetry` | Live simulated chamber telemetry |

---

## 🏛️ Project Directory Structure

```
Blockchain-nesfic-i-08/
├── packages/
│   ├── contracts/          # Solidity Smart Contracts (TeaRegistry & TeaBatchProvenance)
│   └── shared/             # Shared data models, constants, and Merkle Tree engine
├── apps/
│   ├── api/                # HTTP REST API & Traceability engine
│   └── web/                # Interactive Web App & Consumer QR Explorer
└── README.md
```
