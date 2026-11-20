/**
 * Frontend Application Logic for Assam Tea Digital Traceability (NESFIC-I-08)
 * Features: Multi-district batches, Admin GI Authority, PPC Agrochemical Inspector,
 * Certificate Exporter, Packaging Stamp Generator, and Toast Notifications.
 */

// Dynamically detect local dev vs Cloudflare production deployment
const API_BASE = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && window.location.port !== "3000"
  ? "http://localhost:4000/api"
  : (window.location.port === "3000" ? "http://localhost:4000/api" : "/api");

// 6 Authentic Assam Batches (Synced with backend seed data)
let fallbackBatches = [
  {
    id: "ASM-2026-CTC-001",
    stage: "RETAIL_PACKAGED",
    plucking: {
      growerId: "STG-JHT-001",
      growerName: "Mukund Saikia (মুকুন্দ শইকীয়া)",
      gardenName: "Borbhetta Smallholding Cluster #4",
      district: "Jorhat",
      sectionId: "Sec-7B-TV23-Clone",
      gps: { lat: 26.7512, lng: 94.2155, elevationMeters: 96 },
      estimatedWeightKg: 420.0,
      verifiedWeightKg: 418.5,
      pluckingTime: "2026-11-18T07:45:00+05:30",
      weighbridgeId: "WB-JHT-BLF-02",
    },
    processing: {
      factoryId: "FAC-JHT-01",
      factoryName: "Tocklai Valley Bought Leaf Factory",
      procType: "CTC",
      grade: "BOP (Broken Orange Pekoe)",
      intakeWeightKg: 418.5,
      madeTeaWeightKg: 94.2,
      witheringLossPct: 32.4,
      fermentationDurationHrs: 2.5,
      dryingTempC: 115,
      completedTime: "2026-11-19T14:30:00+05:30",
    },
    labTest: {
      certifierId: "LAB-NABL-088",
      labName: "TRA Tocklai Quality & Chemical Residue Lab",
      accreditationNo: "NABL TC-5421",
      ipfsHash: "QmTRA9942TocklaiChemicalMRLPassCert",
      testDate: "2026-11-19T18:00:00+05:30",
      pesticideMRLStatus: "COMPLIANT",
      parameters: [
        { chemical: "Emamectin Benzoate", foundPpm: 0.012, maxPermissibleLimitPpm: 0.05, pass: true },
        { chemical: "Quinalphos", foundPpm: 0.002, maxPermissibleLimitPpm: 0.01, pass: true },
        { chemical: "Hexaconazole", foundPpm: 0.035, maxPermissibleLimitPpm: 0.10, pass: true },
        { chemical: "Thiamethoxam", foundPpm: 0.015, maxPermissibleLimitPpm: 0.05, pass: true },
      ],
      moisturePercentage: 3.2,
      fssaiStandardMet: true,
    },
    auctionLotNo: "GTAC-2026-W47-LOT402",
    custodian: "Assam Heritage Tea Exporters Ltd.",
    serializedQrCode: "QR-ASM26-8894-X82F",
    giTagAuthorized: true,
    giCertNumber: "GI-IN-ASM-TEA-00441",
    blockchainTxHash: "0x8f3c7e99214b2a65d38a719c84e1bfa74319a92289410d55e925bca34821a812",
  },
  {
    id: "ASM-2026-ORT-002",
    stage: "FACTORY_PROCESSED",
    plucking: {
      growerId: "STG-DIB-002",
      growerName: "Pronab Gogoi (প্ৰণৱ গগৈ)",
      gardenName: "Moran Small Tea Growers Co-Op",
      district: "Dibrugarh",
      sectionId: "Heritage-Old-China-Bush-Sec3",
      gps: { lat: 27.2845, lng: 94.9211, elevationMeters: 108 },
      estimatedWeightKg: 280.0,
      verifiedWeightKg: 279.0,
      pluckingTime: "2026-11-20T08:15:00+05:30",
      weighbridgeId: "WB-DIB-MORAN-01",
    },
    processing: {
      factoryId: "FAC-DIB-04",
      factoryName: "Moran Specialty Orthodox Tea Factory",
      procType: "ORTHODOX",
      grade: "TGFOP1 (Tippy Golden Flowery Orange Pekoe)",
      intakeWeightKg: 279.0,
      madeTeaWeightKg: 61.5,
      witheringLossPct: 35.0,
      fermentationDurationHrs: 3.8,
      dryingTempC: 98,
      completedTime: "2026-11-20T18:00:00+05:30",
    },
    custodian: "Moran Specialty Orthodox Tea Factory",
    serializedQrCode: "QR-ASM26-ORT-PENDING-02",
    giTagAuthorized: true,
    giCertNumber: "GI-IN-ASM-TEA-00442",
    blockchainTxHash: "0x3a4b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
  },
  {
    id: "EST-TIN-003",
    stage: "LAB_CERTIFIED",
    plucking: {
      growerId: "EST-TIN-003",
      growerName: "Doom Dooma Heritage Estate",
      gardenName: "Doom Dooma Division North",
      district: "Tinsukia",
      sectionId: "Sec-DoomDooma-A1",
      gps: { lat: 27.5688, lng: 95.5712, elevationMeters: 122 },
      estimatedWeightKg: 850.0,
      verifiedWeightKg: 846.0,
      pluckingTime: "2026-11-19T06:30:00+05:30",
      weighbridgeId: "WB-TIN-DD-01",
    },
    processing: {
      factoryId: "FAC-TIN-02",
      factoryName: "Doom Dooma Central Processing Plant",
      procType: "CTC",
      grade: "BP (Broken Pekoe - Bold Liquor)",
      intakeWeightKg: 846.0,
      madeTeaWeightKg: 194.5,
      witheringLossPct: 31.8,
      fermentationDurationHrs: 2.3,
      dryingTempC: 118,
      completedTime: "2026-11-19T20:00:00+05:30",
    },
    labTest: {
      certifierId: "LAB-TIN-NABL-02",
      labName: "Upper Assam Chemical Residue Center",
      accreditationNo: "NABL TC-6104",
      ipfsHash: "QmTinsukiaPesticideScreenPass5422",
      testDate: "2026-11-20T10:00:00+05:30",
      pesticideMRLStatus: "COMPLIANT",
      parameters: [
        { chemical: "Emamectin Benzoate", foundPpm: 0.008, maxPermissibleLimitPpm: 0.05, pass: true },
        { chemical: "Hexaconazole", foundPpm: 0.041, maxPermissibleLimitPpm: 0.10, pass: true },
      ],
      moisturePercentage: 3.1,
      fssaiStandardMet: true,
    },
    custodian: "Doom Dooma Heritage Estate",
    serializedQrCode: "QR-ASM26-TIN-8821-BP",
    giTagAuthorized: true,
    giCertNumber: "GI-IN-ASM-TEA-00443",
    blockchainTxHash: "0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
  },
  {
    id: "STG-GLG-004",
    stage: "COLLECTION_WEIGHED",
    plucking: {
      growerId: "STG-GLG-004",
      growerName: "Bhaben Bora (ভবেন বৰা)",
      gardenName: "Bokakhat Small Tea Producer Co.",
      district: "Golaghat",
      sectionId: "Kaziranga-Foothills-Organic-Sec1",
      gps: { lat: 26.6189, lng: 93.5912, elevationMeters: 84 },
      estimatedWeightKg: 190.0,
      verifiedWeightKg: 189.2,
      pluckingTime: "2026-11-20T09:00:00+05:30",
      weighbridgeId: "WB-GLG-BOK-01",
    },
    custodian: "Bokakhat Small Tea Producer Co.",
    serializedQrCode: "QR-ASM26-GLG-BIO-04",
    giTagAuthorized: true,
    giCertNumber: "GI-IN-ASM-TEA-00444",
    blockchainTxHash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
  },
  {
    id: "ASM-2026-SVT-005",
    stage: "RETAIL_PACKAGED",
    plucking: {
      growerId: "EST-SON-005",
      growerName: "Monabarie Heritage Highlands",
      gardenName: "Monabarie Division 2 (Biswanath)",
      district: "Sonitpur",
      sectionId: "Artisan-Silver-Tips-Plot-9",
      gps: { lat: 26.7321, lng: 93.1845, elevationMeters: 104 },
      estimatedWeightKg: 65.0,
      verifiedWeightKg: 65.0,
      pluckingTime: "2026-11-17T06:15:00+05:30",
      weighbridgeId: "WB-SON-MONA-01",
    },
    processing: {
      factoryId: "FAC-SON-01",
      factoryName: "Monabarie Artisan Specialty House",
      procType: "SPECIALTY_WHITE",
      grade: "Silver Needle (Sun-Withered)",
      intakeWeightKg: 65.0,
      madeTeaWeightKg: 14.8,
      witheringLossPct: 62.0,
      fermentationDurationHrs: 0.0,
      dryingTempC: 75,
      completedTime: "2026-11-18T16:00:00+05:30",
    },
    labTest: {
      certifierId: "LAB-NABL-088",
      labName: "TRA Tocklai Quality & Chemical Residue Lab",
      accreditationNo: "NABL TC-5421",
      ipfsHash: "QmTRAWhiteTeaSilverNeedlePurityCert99",
      testDate: "2026-11-19T11:00:00+05:30",
      pesticideMRLStatus: "COMPLIANT",
      parameters: [
        { chemical: "Emamectin Benzoate", foundPpm: 0.000, maxPermissibleLimitPpm: 0.05, pass: true },
        { chemical: "Azoxystrobin", foundPpm: 0.000, maxPermissibleLimitPpm: 0.10, pass: true },
      ],
      moisturePercentage: 2.8,
      fssaiStandardMet: true,
    },
    auctionLotNo: "DIRECT-EXPORTER-D2C-LOT-01",
    custodian: "Assam Rare Teas Global Vault",
    serializedQrCode: "QR-ASM26-SON-SILVER-05",
    giTagAuthorized: true,
    giCertNumber: "GI-IN-ASM-TEA-00445",
    blockchainTxHash: "0x11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff",
  },
  {
    id: "ASM-2026-FLG-006",
    stage: "LAB_CERTIFIED",
    plucking: {
      growerId: "STG-CAC-006",
      growerName: "Cachar Valley Smallholders",
      gardenName: "Barak Foothills Cooperative",
      district: "Cachar",
      sectionId: "Sec-Cachar-Lowland-B3",
      gps: { lat: 24.8333, lng: 92.7789, elevationMeters: 42 },
      estimatedWeightKg: 520.0,
      verifiedWeightKg: 518.0,
      pluckingTime: "2026-11-19T08:00:00+05:30",
      weighbridgeId: "WB-CAC-BLF-01",
    },
    processing: {
      factoryId: "FAC-CAC-01",
      factoryName: "Barak Valley Bought Leaf Factory",
      procType: "CTC",
      grade: "PD (Pekoe Dust)",
      intakeWeightKg: 518.0,
      madeTeaWeightKg: 116.5,
      witheringLossPct: 30.5,
      fermentationDurationHrs: 2.1,
      dryingTempC: 112,
      completedTime: "2026-11-19T18:30:00+05:30",
    },
    labTest: {
      certifierId: "LAB-SIL-01",
      labName: "Silchar Regional Testing Station",
      accreditationNo: "NABL TC-4991",
      ipfsHash: "QmVIOLATIONQuinalphosExceededMRLBarak889",
      testDate: "2026-11-20T14:30:00+05:30",
      pesticideMRLStatus: "NON_COMPLIANT",
      parameters: [
        { chemical: "Quinalphos", foundPpm: 0.082, maxPermissibleLimitPpm: 0.01, pass: false },
        { chemical: "Emamectin Benzoate", foundPpm: 0.022, maxPermissibleLimitPpm: 0.05, pass: true },
      ],
      moisturePercentage: 4.8,
      fssaiStandardMet: false,
    },
    custodian: "Barak Valley BLF (Quarantine Bay 3)",
    serializedQrCode: "QR-ASM26-FLAGGED-VIOLATION-06",
    giTagAuthorized: false,
    giCertNumber: "GI-REVOKED-PPC-VIOLATION",
    revocationReason: "Quinalphos pesticide detected at 0.082 ppm (exceeds statutory 0.01 ppm limit under Tea Board PPC v16 and EU MRL). Retail packaging strictly blocked.",
    blockchainTxHash: "0xdeadbeef11223344556677889900aabbccddeeffdeadbeef1122334455667788",
  }
];

let activeBatch = fallbackBatches[0];
let isAssamese = false;

// Toast Notification Helper
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === "success" ? "✓" : (type === "error" ? "⚠️" : "ℹ️")}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupTutorialModal();
  setupConsumerVerification();
  setupSTGPortal();
  setupFactoryPortal();
  setupTocklaiCommand();
  setupInteractiveMap();
  setupCadastralMap();
  setupActionModals();
  setupPPCInspector();
  setupAdminSubtabs();

  // Load initial demo batch
  lookupBatch("QR-ASM26-8894-X82F");
  fetchIoTTelemetry();
  fetchAnalytics();
  renderAdminGITable();
  renderAdminAlerts();
});

// Tab Navigation
function setupTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const targetPane = tab.getAttribute("data-tab");
      document.querySelectorAll(".tab-pane").forEach(pane => {
        pane.classList.remove("active");
      });
      document.getElementById(`pane-${targetPane}`).classList.add("active");
    });
  });
}

// Quick jump to tab from tutorial or map
window.jumpToTab = function(tabName) {
  const modal = document.getElementById("tutorial-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }

  const targetTabBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
  if (targetTabBtn) {
    targetTabBtn.click();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// 1. Consumer Verification
function setupConsumerVerification() {
  const btn = document.getElementById("btn-verify");
  const input = document.getElementById("qr-search-input");
  btn.addEventListener("click", () => {
    const val = input.value.trim();
    if (val) lookupBatch(val);
  });
}

window.lookupBatch = async function(token) {
  document.getElementById("qr-search-input").value = token;

  // Highlight active chip if matches
  document.querySelectorAll(".batch-chip").forEach(chip => {
    if (chip.getAttribute("onclick") && chip.getAttribute("onclick").includes(token)) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });

  const resultDiv = document.getElementById("verification-result");
  resultDiv.innerHTML = `<div style="text-align: center; padding: 2rem;">Verifying cryptographic proof on Assam tea blockchain...</div>`;

  try {
    const res = await fetch(`${API_BASE}/verify/${encodeURIComponent(token)}`);
    if (res.ok) {
      const json = await res.json();
      activeBatch = json.provenance;
      renderVerificationSuccess(json.provenance);
      return;
    }
  } catch (err) {
    console.warn("API offline or unreachable, using local state:", err);
  }

  // Fallback lookup
  const match = fallbackBatches.find(b => b.serializedQrCode === token || b.id === token);
  if (match) {
    activeBatch = match;
    renderVerificationSuccess(match);
  } else {
    renderVerificationFailure(token);
  }
};

function renderVerificationSuccess(batch) {
  const container = document.getElementById("verification-result");
  const isRevoked = batch.giTagAuthorized === false;

  container.innerHTML = `
    <!-- Top GI & Authenticity Banner -->
    <div class="card" style="border: 2px solid ${isRevoked ? '#dc2626' : '#15803d'}; background: ${isRevoked ? 'linear-gradient(to right, #fef2f2, #ffffff)' : 'linear-gradient(to right, #f0fdf4, #ffffff)'};">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: ${isRevoked ? '#fee2e2' : '#dcfce7'}; color: ${isRevoked ? '#991b1b' : '#166534'}; font-weight: 700; font-size: 0.9rem; padding: 0.4rem 0.8rem; border-radius: 9999px; border: 1px solid ${isRevoked ? '#fca5a5' : '#86efac'}; margin-bottom: 0.5rem;">
            <span>${isRevoked ? '⚠️' : '🛡️'}</span> ${isRevoked ? 'ASSAM GI TAG SUSPENDED / QUARANTINED' : 'AUTHENTIC ASSAM GI TAG CERTIFIED'}
          </div>
          <h2 style="color: ${isRevoked ? '#991b1b' : '#14532d'}; font-size: 1.4rem; margin-bottom: 0.25rem;">
            ${batch.processing?.grade || "Assam Orthodox"} • ${batch.id}
          </h2>
          <div style="color: var(--text-muted); font-size: 0.9rem;">
            Estate / Garden: <strong>${batch.plucking.gardenName}</strong> (${batch.plucking.district}, Assam)
          </div>
        </div>

        <div style="text-align: right;">
          <div style="font-size: 0.8rem; color: var(--text-muted);">GI Registration No:</div>
          <div style="font-size: 1.1rem; font-weight: 700; color: ${isRevoked ? '#dc2626' : '#92400e'};">${batch.giCertNumber || "GI-IN-ASM-TEA-00441"}</div>
          <div style="font-size: 0.75rem; color: ${isRevoked ? '#dc2626' : '#059669'}; font-weight: 600;">
            ${isRevoked ? '❌ Retail Packaging strictly prohibited' : '✓ Tea Board of India & TRA Tocklai Authorized'}
          </div>
        </div>
      </div>

      ${isRevoked ? `
        <div style="margin-top: 1rem; padding: 0.75rem; background: #fff1f2; border: 1px solid #fda4af; border-radius: 6px; color: #9f1239; font-size: 0.85rem;">
          <strong>🚨 Regulatory Interception Notice:</strong> ${batch.revocationReason || "Pesticide MRL limits exceeded under Tea Board PPC v16."}
        </div>
      ` : ""}
    </div>

    <!-- Timeline & Details Grid -->
    <div class="grid-2">
      <!-- Left: Leaf-to-Cup Provenance Timeline -->
      <div class="card">
        <h2>🍃 Verified Leaf-to-Cup Journey</h2>
        <div class="timeline">

          <!-- Step 1: Plucking -->
          <div class="timeline-step">
            <div class="step-node" style="background: ${isRevoked ? '#dc2626' : 'var(--primary-tea)'};">1</div>
            <div class="step-content">
              <div class="step-header">
                <span class="step-title">Fresh Leaf Harvest</span>
                <span class="step-time">${new Date(batch.plucking.pluckingTime).toLocaleDateString()}</span>
              </div>
              <div class="step-body">
                <div><span class="step-tag">STG</span><strong>${batch.plucking.growerName}</strong></div>
                <div style="margin-top: 0.25rem;">GPS: <code>${batch.plucking.gps.lat}, ${batch.plucking.gps.lng}</code> (Elevation: ${batch.plucking.gps.elevationMeters || 96}m)</div>
                <div>Fresh Leaf Weight: <strong>${batch.plucking.verifiedWeightKg || batch.plucking.estimatedWeightKg} Kg</strong></div>
              </div>
            </div>
          </div>

          <!-- Step 2: Digital Weighbridge -->
          <div class="timeline-step">
            <div class="step-node" style="background: ${isRevoked ? '#dc2626' : 'var(--primary-tea)'};">2</div>
            <div class="step-content">
              <div class="step-header">
                <span class="step-title">Collection & Weighbridge</span>
                <span class="step-time">Intake Verified</span>
              </div>
              <div class="step-body">
                <div>Weighbridge Station: <code>${batch.plucking.weighbridgeId || "WB-JHT-BLF-02"}</code></div>
                <div>Digital receipt logged, zero moisture deduction alteration.</div>
              </div>
            </div>
          </div>

          <!-- Step 3: Factory Processing -->
          <div class="timeline-step">
            <div class="step-node" style="background: ${isRevoked ? '#dc2626' : 'var(--primary-tea)'};">3</div>
            <div class="step-content">
              <div class="step-header">
                <span class="step-title">Manufacturing (${batch.processing?.procType || "CTC"})</span>
                <span class="step-time">${batch.processing ? "Completed" : "In Progress"}</span>
              </div>
              <div class="step-body">
                ${batch.processing ? `
                  <div>Factory: <strong>${batch.processing.factoryName}</strong></div>
                  <div>Grade: <strong>${batch.processing.grade}</strong></div>
                  <div>Drying Temp: <strong>${batch.processing.dryingTempC}°C</strong> • Withering Loss: <strong>${batch.processing.witheringLossPct}%</strong></div>
                  <div>Made Tea Output: <strong>${batch.processing.madeTeaWeightKg} Kg</strong></div>
                ` : `<div style="color: #b45309;">Currently undergoing withering and CTC cutting in factory.</div>`}
              </div>
            </div>
          </div>

          <!-- Step 4: Chemical Residue MRL Lab -->
          <div class="timeline-step">
            <div class="step-node" style="background: ${isRevoked ? '#dc2626' : 'var(--primary-tea)'};">4</div>
            <div class="step-content">
              <div class="step-header">
                <span class="step-title">TRA Tocklai Safety Test</span>
                <span class="step-time">${batch.labTest ? (batch.labTest.pesticideMRLStatus === "COMPLIANT" ? "NABL Passed ✓" : "FAILED ⚠️") : "Pending"}</span>
              </div>
              <div class="step-body">
                ${batch.labTest ? `
                  <div style="color: ${batch.labTest.pesticideMRLStatus === "COMPLIANT" ? "#166534" : "#dc2626"}; font-weight: 700;">
                    Pesticide MRL Status: ${batch.labTest.pesticideMRLStatus}
                  </div>
                  <div>Accredited Lab: ${batch.labTest.labName} (${batch.labTest.accreditationNo})</div>
                  <div>Moisture Content: <strong>${batch.labTest.moisturePercentage}%</strong> (FSSAI standard &lt; 6.5%)</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">
                    IPFS Certificate Hash: <code>${batch.labTest.ipfsHash}</code>
                  </div>
                ` : `<div>Sample sent to TRA Tocklai Quality & Chemical Residue Lab.</div>`}
              </div>
            </div>
          </div>

          <!-- Step 5: Packaging & QR Serialization -->
          <div class="timeline-step">
            <div class="step-node" style="background: ${isRevoked ? '#dc2626' : 'var(--primary-tea)'};">5</div>
            <div class="step-content">
              <div class="step-header">
                <span class="step-title">Retail Packaging & Cryptographic Seal</span>
                <span class="step-time">${batch.stage === "RETAIL_PACKAGED" ? "Sealed" : (isRevoked ? "BLOCKED" : "Active")}</span>
              </div>
              <div class="step-body">
                <div>Custodian: <strong>${batch.custodian}</strong></div>
                ${batch.auctionLotNo ? `<div>GTAC Auction Lot: <code>${batch.auctionLotNo}</code></div>` : ""}
                <div style="margin-top: 0.25rem; font-size: 0.75rem; color: var(--text-muted);">
                  Blockchain Tx: <code style="color: #1b4d3e;">${batch.blockchainTxHash || "0x8f3c7e99..."}</code>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Right: Chemical Residue Card & Garden Details -->
      <div>
        <div class="card">
          <h2>🧪 Lab Safety & MRL Compliance</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            Tested against Tea Board of India Plant Protection Code (PPC) and EU import thresholds.
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-color); text-align: left;">
                <th style="padding: 0.5rem 0;">Compound</th>
                <th style="padding: 0.5rem 0;">Detected</th>
                <th style="padding: 0.5rem 0;">Max Limit</th>
                <th style="padding: 0.5rem 0;">Result</th>
              </tr>
            </thead>
            <tbody>
              ${(batch.labTest?.parameters || [
                { chemical: "Emamectin Benzoate", foundPpm: 0.012, maxPermissibleLimitPpm: 0.05, pass: true },
                { chemical: "Quinalphos", foundPpm: 0.002, maxPermissibleLimitPpm: 0.01, pass: true },
              ]).map(p => `
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.45rem 0; font-weight: 600;">${p.chemical}</td>
                  <td style="padding: 0.45rem 0;">${p.foundPpm} ppm</td>
                  <td style="padding: 0.45rem 0; color: var(--text-muted);">${p.maxPermissibleLimitPpm} ppm</td>
                  <td style="padding: 0.45rem 0;">
                    <span style="color: ${p.pass ? '#15803d' : '#dc2626'}; font-weight: bold;">
                      ${p.pass ? 'PASS ✓' : 'VIOLATION ⚠️'}
                    </span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div class="card" style="background: #fafaf9;">
          <h2>🌿 Meet the Smallholder Grower</h2>
          <div style="font-size: 0.9rem; line-height: 1.6;">
            <strong>${batch.plucking.growerName}</strong> is a registered smallholder associated with <em>${batch.plucking.gardenName}</em> in ${batch.plucking.district}, Assam.<br>
            By scanning this code, you are supporting direct-to-grower transparency and certified Good Agricultural Practices (GAP) guided by TRA Tocklai.
          </div>
          <div style="margin-top: 0.75rem;">
            <button onclick="document.getElementById('btn-open-appreciation').click()" class="btn-secondary" style="font-size: 0.8rem; background: #ecfdf5; color: #065f46; border-color: #a7f3d0;">
              💚 Send Appreciation to ${batch.plucking.growerName.split(" ")[0]}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderVerificationFailure(token) {
  const container = document.getElementById("verification-result");
  container.innerHTML = `
    <div class="card" style="border: 2px solid #dc2626; background: #fef2f2;">
      <h2 style="color: #991b1b;">⚠️ Unverified / Counterfeit Alert</h2>
      <p style="color: #b91c1c; margin-top: 0.5rem;">
        No cryptographic provenance record was found for QR Code: <code>${token}</code>.
      </p>
      <p style="font-size: 0.85rem; color: #7f1d1d; margin-top: 0.5rem;">
        This product may not be genuine Assam GI certified tea. Authentic teas packaged under the NESFIC-I-08 framework contain immutable state proofs anchored to the Tea Board & TRA Tocklai blockchain ledger.
      </p>
    </div>
  `;
}

// Action Modals: Certificate & Packaging Stamp & Grower Appreciation
function setupActionModals() {
  // 1. Certificate Modal
  const certModal = document.getElementById("cert-modal");
  const btnOpenCert = document.getElementById("btn-open-cert");
  const btnCloseCert = document.getElementById("btn-close-cert");
  const btnCloseCertBottom = document.getElementById("btn-close-cert-bottom");

  if (btnOpenCert) {
    btnOpenCert.addEventListener("click", () => {
      renderOfficialCertificate(activeBatch);
      certModal.classList.add("active");
    });
  }
  if (btnCloseCert) btnCloseCert.addEventListener("click", () => certModal.classList.remove("active"));
  if (btnCloseCertBottom) btnCloseCertBottom.addEventListener("click", () => certModal.classList.remove("active"));

  // 2. Retail Stamp Modal
  const stampModal = document.getElementById("stamp-modal");
  const btnOpenStamp = document.getElementById("btn-open-stamp");
  const btnCloseStamp = document.getElementById("btn-close-stamp");
  const btnCloseStampBottom = document.getElementById("btn-close-stamp-bottom");

  if (btnOpenStamp) {
    btnOpenStamp.addEventListener("click", () => {
      renderPackagingStamp(activeBatch);
      stampModal.classList.add("active");
    });
  }
  if (btnCloseStamp) btnCloseStamp.addEventListener("click", () => stampModal.classList.remove("active"));
  if (btnCloseStampBottom) btnCloseStampBottom.addEventListener("click", () => stampModal.classList.remove("active"));

  // 3. Grower Appreciation Modal
  const apprecModal = document.getElementById("grower-appreciation-modal");
  const btnOpenApprec = document.getElementById("btn-open-appreciation");
  const btnCloseApprec = document.getElementById("btn-close-appreciation");
  const btnCloseApprecBottom = document.getElementById("btn-close-appreciation-bottom");
  const btnSubmitApprec = document.getElementById("btn-submit-appreciation");

  if (btnOpenApprec) btnOpenApprec.addEventListener("click", () => apprecModal.classList.add("active"));
  if (btnCloseApprec) btnCloseApprec.addEventListener("click", () => apprecModal.classList.remove("active"));
  if (btnCloseApprecBottom) btnCloseApprecBottom.addEventListener("click", () => apprecModal.classList.remove("active"));

  if (btnSubmitApprec) {
    btnSubmitApprec.addEventListener("click", () => {
      const name = document.getElementById("input-supporter-name").value;
      const badge = document.getElementById("select-badge-award").value;
      apprecModal.classList.remove("active");
      showToast(`💚 Appreciation and ${badge} awarded directly to ${activeBatch.plucking.growerName}!`, "success");
    });
  }
}

function renderOfficialCertificate(batch) {
  const container = document.getElementById("cert-print-area");
  container.innerHTML = `
    <div class="cert-container">
      <div class="cert-header">
        <div style="font-size: 2.2rem; margin-bottom: 0.35rem;">🍵</div>
        <div class="cert-title">Official Certificate of Provenance & Authenticity</div>
        <div class="cert-subtitle">Tea Research Association (TRA) Tocklai & Tea Board of India</div>
        <div style="font-size: 0.85rem; color: #166534; font-weight: bold; margin-top: 0.35rem;">
          Assam Geographical Indication Registry #${batch.giCertNumber || "GI-IN-ASM-TEA-00441"}
        </div>
      </div>

      <div class="cert-badge-row">
        <div><strong>Batch ID:</strong> ${batch.id}</div>
        <div><strong>Origin:</strong> ${batch.plucking.gardenName} (${batch.plucking.district})</div>
        <div><strong>Grade:</strong> ${batch.processing?.grade || "Pure Assam Orthodox"}</div>
        <div><strong>Date:</strong> ${new Date(batch.createdAt).toLocaleDateString()}</div>
      </div>

      <div class="cert-timeline-box">
        <h4 style="color: #1b4d3e; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">
          Certified Value Chain Milestones
        </h4>
        <ul style="list-style: none; padding-left: 0; line-height: 1.8;">
          <li>🍃 <strong>Smallholder Harvest:</strong> Plucked by ${batch.plucking.growerName} at GPS (${batch.plucking.gps.lat}, ${batch.plucking.gps.lng})</li>
          <li>⚖️ <strong>Intake Weighbridge:</strong> Verified net green leaf ${batch.plucking.verifiedWeightKg || batch.plucking.estimatedWeightKg} Kg</li>
          <li>🏭 <strong>Processing:</strong> Manufactured at ${batch.processing?.factoryName || "Tocklai BLF"} • Temp: ${batch.processing?.dryingTempC || 115}°C</li>
          <li>🧪 <strong>Lab Safety Attestation:</strong> ${batch.labTest?.labName || "TRA Tocklai Chemical Residue Lab"} • MRL Status: <strong>${batch.labTest?.pesticideMRLStatus || "COMPLIANT"}</strong></li>
          <li>🔗 <strong>Blockchain Anchor:</strong> Tx <code>${batch.blockchainTxHash || "0x8f3c7e99..."}</code></li>
        </ul>
      </div>

      <div class="cert-signatures">
        <div>
          <div>_________________________________</div>
          <strong>Director / Head Quality Lab</strong><br>
          Tea Research Association (TRA) Tocklai
        </div>
        <div style="text-align: center;">
          <div style="display: inline-block; padding: 0.5rem; border: 2px solid #166534; border-radius: 50%; color: #166534; font-weight: bold; font-size: 0.75rem;">
            ASSAM GI<br>VERIFIED
          </div>
        </div>
        <div style="text-align: right;">
          <div>_________________________________</div>
          <strong>Controller of Licensing</strong><br>
          Tea Board of India (Guwahati)
        </div>
      </div>
    </div>
  `;
}

function renderPackagingStamp(batch) {
  const container = document.getElementById("stamp-preview-area");
  const digitalLink = `https://trace.assamtea.gov.in/verify/${batch.serializedQrCode}`;

  container.innerHTML = `
    <div class="stamp-card">
      <div style="font-size: 0.8rem; font-weight: 700; color: #92400e; letter-spacing: 0.05em; text-transform: uppercase;">
        Official Assam GI Smart Provenance Seal
      </div>
      <h3 style="color: #14532d; font-size: 1.25rem; margin: 0.35rem 0;">
        ${batch.processing?.grade || "Assam Orthodox"}
      </h3>
      <div style="font-size: 0.85rem; color: #4b5563;">
        ${batch.plucking.gardenName} • ${batch.plucking.district}, Assam
      </div>

      <div class="stamp-qr-placeholder">
        <span>🍵</span>
      </div>

      <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary-tea);">
        ${batch.serializedQrCode}
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted); word-break: break-all; margin-top: 0.35rem;">
        GS1 Digital Link: <code>${digitalLink}</code>
      </div>
      <div style="margin-top: 0.75rem; font-size: 0.75rem; color: #166534; font-weight: 600;">
        ✓ Scan with standard smartphone camera to verify bush-to-cup journey
      </div>
    </div>
  `;
}

// 2. STG & Field Portal
function setupSTGPortal() {
  const selectGrower = document.getElementById("select-grower");
  selectGrower.innerHTML = `
    <option value="STG-JHT-001">Mukund Saikia (Borbhetta Cluster #4, Jorhat)</option>
    <option value="STG-DIB-002">Pronab Gogoi (Moran Co-Op, Dibrugarh)</option>
    <option value="EST-TIN-003">Doom Dooma Heritage Estate (Tinsukia)</option>
    <option value="STG-GLG-004">Bhaben Bora (Bokakhat Organic Co., Golaghat)</option>
    <option value="EST-SON-005">Monabarie Heritage Highlands (Sonitpur)</option>
  `;

  // Language switcher
  const btnLang = document.getElementById("btn-lang-toggle");
  btnLang.addEventListener("click", () => {
    isAssamese = !isAssamese;
    btnLang.textContent = isAssamese ? "English" : "অসমীয়া";
    document.getElementById("stg-title-text").textContent = isAssamese
      ? "ক্ষুদ্ৰ চাহ খেতিয়ক (STG) পাত তোলক পঞ্জীয়ন"
      : "Small Tea Grower (STG) Harvest Log";
    document.getElementById("lbl-grower").textContent = isAssamese ? "পঞ্জীভুক্ত খেতিয়ক / বাগান" : "Registered Grower / Estate";
    document.getElementById("lbl-weight").textContent = isAssamese ? "কেঁচা পাতৰ ওজন (কিলোগ্ৰাম)" : "Estimated Fresh Leaf Weight (Kg)";
    showToast(isAssamese ? "ভাষা সলনি কৰা হ'ল: অসমীয়া" : "Switched language to English", "info");
  });

  // Plucking submission
  const form = document.getElementById("form-harvest");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const weight = parseFloat(document.getElementById("input-weight").value);
    const procType = document.getElementById("select-target-type").value;
    const clone = document.getElementById("select-clone").value;

    const payload = {
      growerId: selectGrower.value,
      growerName: selectGrower.options[selectGrower.selectedIndex].text.split("(")[0].trim(),
      gardenName: "Borbhetta Smallholding Cluster #4",
      district: "Jorhat",
      sectionId: `Sec-${clone}`,
      gps: { lat: 26.7512, lng: 94.2155 },
      estimatedWeightKg: weight,
      procType: procType,
    };

    try {
      const res = await fetch(`${API_BASE}/batches/harvest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        showToast(`🌱 Harvest recorded on blockchain ledger! Batch ID: ${json.data.id}`, "success");
        updateProcessBatchDropdown();
        return;
      }
    } catch (err) {
      console.warn("Using offline mode fallback:", err);
    }

    const fallbackId = `ASM-2026-${procType}-${String(fallbackBatches.length + 1).padStart(3, "0")}`;
    showToast(`🌱 Harvest recorded locally! Batch ID: ${fallbackId}`, "success");
  });

  // Live GPS Capture with Cadastral Land Parcel verification
  const btnGps = document.getElementById("btn-gps-refresh");
  if (btnGps) {
    btnGps.addEventListener("click", () => {
      showToast("📍 Real-time GPS fixed (26.7512° N, 94.2155° E) • Geo-fenced inside Cadastral Dag #142/518 (Patta #42 Mukund Saikia)", "success");
    });
  }

  // Bluetooth Weighbridge simulator
  const btnSync = document.getElementById("btn-weighbridge-sync");
  btnSync.addEventListener("click", () => {
    const statusDiv = document.getElementById("weighbridge-status");
    const reading = (240 + Math.random() * 20).toFixed(1);
    document.getElementById("wb-live-reading").textContent = `${reading} Kg`;

    statusDiv.innerHTML = `
      <div style="background: #ecfdf5; color: #065f46; padding: 0.75rem; border-radius: 6px; border: 1px solid #a7f3d0;">
        ✓ Bluetooth scale connected (WB-JHT-BLF-02).<br>
        Gross: ${(parseFloat(reading) + 12.2).toFixed(1)} Kg | Tare: 12.2 Kg | Net Leaf: <strong>${reading} Kg</strong>.<br>
        Digitally signed and locked into intake queue.
      </div>
    `;
    showToast(`⚖️ Weighbridge sync complete: ${reading} Kg recorded`, "success");
  });
}

// Tea Board PPC v16 Agrochemical Inspector Tool
const PPC_CHEMICAL_DATA = [
  { chemical: "Emamectin Benzoate 5% SG", category: "Insecticide", maxPpm: "0.05 ppm", phiDays: "7 Days", pest: "Tea Looper (Hyposidra talaca)", status: "APPROVED_PPC" },
  { chemical: "Hexaconazole 5% EC", category: "Fungicide", maxPpm: "0.10 ppm", phiDays: "7 Days", pest: "Blister Blight (Exobasidium vexans)", status: "APPROVED_PPC" },
  { chemical: "Quinalphos 25% EC", category: "Insecticide", maxPpm: "0.01 ppm", phiDays: "14 Days", pest: "Caterpillars & Helopeltis", status: "RESTRICTED_LOW_MRL" },
  { chemical: "Thiamethoxam 25% WG", category: "Insecticide", maxPpm: "0.05 ppm", phiDays: "7 Days", pest: "Tea Mosquito Bug (Helopeltis)", status: "APPROVED_PPC" },
  { chemical: "Propargite 57% EC", category: "Acaricide", maxPpm: "5.00 ppm", phiDays: "7 Days", pest: "Red Spider Mite (Oligonychus)", status: "APPROVED_PPC" },
  { chemical: "Azoxystrobin 23% SC", category: "Fungicide", maxPpm: "0.10 ppm", phiDays: "7 Days", pest: "Black Rot & Blister Blight", status: "APPROVED_PPC" },
  { chemical: "Copper Oxychloride 50% WP", category: "Fungicide", maxPpm: "20.00 ppm", phiDays: "5 Days", pest: "Fungal Dieback & Black Rot", status: "ORGANIC_COMPATIBLE" },
  { chemical: "Bacillus thuringiensis (Bt)", category: "Bio-Control", maxPpm: "Exempt", phiDays: "0 Days", pest: "Looper Caterpillars", status: "ORGANIC_COMPATIBLE" },
  { chemical: "Neem Seed Extract (Azadirachtin)", category: "Bio-Control", maxPpm: "Exempt", phiDays: "0 Days", pest: "Mites & Sucking Pests", status: "ORGANIC_COMPATIBLE" },
  { chemical: "DDT / Endosulfan / Monocrotophos", category: "Hazard", maxPpm: "0.00 ppm", phiDays: "BANNED", pest: "STRICTLY BANNED IN INDIA", status: "STRICTLY_PROHIBITED" },
];

function setupPPCInspector() {
  const tbody = document.getElementById("ppc-table-body");
  const input = document.getElementById("ppc-search-input");
  if (!tbody) return;

  function renderTable(filterText = "") {
    const filtered = PPC_CHEMICAL_DATA.filter(c => 
      c.chemical.toLowerCase().includes(filterText.toLowerCase()) ||
      c.pest.toLowerCase().includes(filterText.toLowerCase()) ||
      c.category.toLowerCase().includes(filterText.toLowerCase())
    );

    tbody.innerHTML = filtered.map(c => `
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem; font-weight: 700; color: ${c.status === 'STRICTLY_PROHIBITED' ? '#dc2626' : '#1f2937'};">${c.chemical}</td>
        <td style="padding: 0.6rem; color: var(--text-muted);">${c.category}</td>
        <td style="padding: 0.6rem; font-weight: 600;">${c.maxPpm}</td>
        <td style="padding: 0.6rem;">${c.phiDays}</td>
        <td style="padding: 0.6rem;">${c.pest}</td>
        <td style="padding: 0.6rem;">
          <span style="font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 9999px; background: ${c.status === 'APPROVED_PPC' ? '#dcfce7' : (c.status === 'ORGANIC_COMPATIBLE' ? '#ecfdf5' : '#fee2e2')}; color: ${c.status === 'APPROVED_PPC' ? '#166534' : (c.status === 'ORGANIC_COMPATIBLE' ? '#065f46' : '#991b1b')};">
            ${c.status === 'APPROVED_PPC' ? 'APPROVED ✓' : (c.status === 'ORGANIC_COMPATIBLE' ? 'BIO-ORGANIC 🌱' : 'BANNED ⚠️')}
          </span>
        </td>
      </tr>
    `).join("");
  }

  renderTable();
  if (input) {
    input.addEventListener("input", (e) => renderTable(e.target.value.trim()));
  }
}

// 3. Factory Portal
function setupFactoryPortal() {
  updateProcessBatchDropdown();

  const form = document.getElementById("form-process-batch");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const select = document.getElementById("select-process-batch");
    const grade = document.getElementById("select-grade").value;
    const madeWeight = parseFloat(document.getElementById("input-made-weight").value);

    showToast(`🏭 Factory processing confirmed for batch ${select.value}! Grade: ${grade} (${madeWeight} Kg)`, "success");
  });

  const btnLab = document.getElementById("btn-issue-lab-cert");
  btnLab.addEventListener("click", () => {
    showToast("🧪 TRA Tocklai NABL Lab certificate issued & pinned to IPFS CID: QmTRA9942TocklaiChemicalMRLPassCert", "success");
  });
}

function updateProcessBatchDropdown() {
  const select = document.getElementById("select-process-batch");
  if (!select) return;
  select.innerHTML = fallbackBatches.map(b => `
    <option value="${b.id}">${b.id} (${b.plucking.gardenName} - ${b.plucking.verifiedWeightKg || b.plucking.estimatedWeightKg} Kg)</option>
  `).join("");
}

async function fetchIoTTelemetry() {
  const container = document.getElementById("iot-telemetry-container");
  if (!container) return;

  const mockTelemetry = [
    { chamber: "Withering Trough #03", temp: "24.5°C", humidity: "68%", metric: "Moisture Loss: 32.4%", badge: "OPTIMAL" },
    { chamber: "Fermentation Floor", temp: "28.2°C", humidity: "92%", metric: "Oxidation: 2.4 Hrs", badge: "OPTIMAL" },
    { chamber: "Vibro-Fluid Dryer (VFBD)", temp: "115.0°C", humidity: "18%", metric: "Exhaust Temp: 58°C", badge: "ACTIVE FIRING" },
  ];

  container.innerHTML = mockTelemetry.map(t => `
    <div class="stat-box">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span class="stat-label">${t.chamber}</span>
        <span class="telemetry-badge ${t.badge === 'OPTIMAL' ? 'optimal' : 'active'}">${t.badge}</span>
      </div>
      <div class="stat-value" style="font-size: 1.5rem; margin-top: 0.5rem;">${t.temp}</div>
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
        Humidity: ${t.humidity} • ${t.metric}
      </div>
    </div>
  `).join("");
}

// 4. TRA Tocklai Command Center & Regulatory Admin Panel
function setupTocklaiCommand() {
  const btnAnchor = document.getElementById("btn-trigger-anchor");
  btnAnchor.addEventListener("click", async () => {
    const resDiv = document.getElementById("anchor-dispatch-result");
    resDiv.innerHTML = "Computing Merkle tree hash across all unanchored batches...";

    try {
      const res = await fetch(`${API_BASE}/blockchain/anchor`, { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        document.getElementById("active-merkle-root").textContent = json.data.rootHash;
        resDiv.innerHTML = `
          <div style="background: #ecfdf5; color: #065f46; padding: 0.75rem; border-radius: 6px;">
            ✓ Successfully committed Merkle Root <code>${json.data.rootHash.substring(0, 18)}...</code><br>
            Simulated Block #${json.data.blockNumber} • Batches: ${json.data.batchCount}
          </div>
        `;
        showToast("⚡ Merkle state root dispatched to Layer 2 blockchain ledger!", "success");
        return;
      }
    } catch (e) {
      console.warn("API anchor fallback:", e);
    }

    const mockRoot = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join("");
    document.getElementById("active-merkle-root").textContent = mockRoot;
    resDiv.innerHTML = `
      <div style="background: #ecfdf5; color: #065f46; padding: 0.75rem; border-radius: 6px;">
        ✓ State root anchored to blockchain ledger!<br>
        Root: <code>${mockRoot.substring(0, 20)}...</code>
      </div>
    `;
    showToast("⚡ Merkle state root dispatched to Layer 2 blockchain ledger!", "success");
  });

  const btnRefresh = document.getElementById("btn-admin-refresh");
  if (btnRefresh) {
    btnRefresh.addEventListener("click", () => {
      fetchAnalytics();
      renderAdminGITable();
      renderAdminAlerts();
      showToast("🔄 Regional feeds and GI registry refreshed", "info");
    });
  }
}

// Admin Subtabs: Heatmap / GI Authority / Alerts / Merkle
function setupAdminSubtabs() {
  const buttons = document.querySelectorAll(".admin-tab-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.getAttribute("data-subtab");
      document.querySelectorAll(".admin-subpane").forEach(pane => pane.classList.remove("active"));
      const targetPane = document.getElementById(`subtab-${target}`);
      if (targetPane) targetPane.classList.add("active");
    });
  });
}

function renderAdminGITable() {
  const tbody = document.getElementById("gi-admin-table-body");
  if (!tbody) return;

  tbody.innerHTML = fallbackBatches.map(b => {
    const isAuthorized = b.giTagAuthorized !== false;
    return `
      <tr>
        <td><strong>${b.id}</strong></td>
        <td>${b.plucking.gardenName} (${b.plucking.district})</td>
        <td>${b.processing?.grade || "Fresh Harvest"}</td>
        <td><code>${b.giCertNumber || "GI-IN-ASM-TEA"}</code></td>
        <td>
          <span style="font-weight: 700; color: ${b.labTest?.pesticideMRLStatus === 'NON_COMPLIANT' ? '#dc2626' : '#166534'};">
            ${b.labTest?.pesticideMRLStatus || "INSPECTION_PENDING"}
          </span>
        </td>
        <td>
          <span style="font-size: 0.78rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 9999px; background: ${isAuthorized ? '#dcfce7' : '#fee2e2'}; color: ${isAuthorized ? '#166534' : '#991b1b'};">
            ${isAuthorized ? 'AUTHORIZED ✓' : 'SUSPENDED ⚠️'}
          </span>
        </td>
        <td>
          <button onclick="toggleGICert('${b.id}', ${!isAuthorized})" class="btn-sm-action ${isAuthorized ? 'btn-sm-revoke' : 'btn-sm-authorize'}">
            ${isAuthorized ? 'Revoke GI' : 'Authorize GI'}
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

window.toggleGICert = async function(batchId, newStatus) {
  const reason = newStatus ? "" : "Suspended following regulatory audit review by TRA Tocklai controller";

  // Try API
  try {
    const res = await fetch(`${API_BASE}/admin/gi/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batchId, isAuthorized: newStatus, reason }),
    });
    if (res.ok) {
      const json = await res.json();
      // Update local copy
      const local = fallbackBatches.find(b => b.id === batchId);
      if (local) {
        local.giTagAuthorized = newStatus;
        if (!newStatus) local.revocationReason = reason;
      }
      renderAdminGITable();
      renderAdminAlerts();
      showToast(`🛡️ Batch ${batchId} GI Authorization updated to: ${newStatus ? 'AUTHORIZED' : 'SUSPENDED'}`, "info");
      return;
    }
  } catch (e) {
    console.warn("API toggle fallback:", e);
  }

  // Local fallback
  const batch = fallbackBatches.find(b => b.id === batchId);
  if (batch) {
    batch.giTagAuthorized = newStatus;
    if (!newStatus) batch.revocationReason = reason;
    else delete batch.revocationReason;
    renderAdminGITable();
    renderAdminAlerts();
    showToast(`🛡️ Batch ${batchId} GI status set to: ${newStatus ? 'AUTHORIZED' : 'SUSPENDED'}`, "info");
  }
};

function renderAdminAlerts() {
  const container = document.getElementById("admin-alerts-container");
  if (!container) return;

  const alerts = [
    {
      id: "ALT-2026-0881",
      severity: "CRITICAL",
      type: "MRL_PESTICIDE_VIOLATION",
      batchId: "ASM-2026-FLG-006",
      message: "Batch ASM-2026-FLG-006 failed GC-MS/MS screen: Quinalphos 0.082 ppm vs permissible 0.01 ppm. Automatic quarantine activated.",
      timestamp: "2026-11-20T14:35:00+05:30",
    },
    {
      id: "ALT-2026-0879",
      severity: "WARNING",
      type: "MOISTURE_INSPECTION",
      batchId: "STG-GLG-004",
      message: "Bokakhat collection center reported ambient rain humidity 94%. Withering trough airflow adjusted.",
      timestamp: "2026-11-20T10:20:00+05:30",
    }
  ];

  container.innerHTML = alerts.map(a => `
    <div style="background: ${a.severity === 'CRITICAL' ? '#fef2f2' : '#fffbeb'}; border-left: 4px solid ${a.severity === 'CRITICAL' ? '#ef4444' : '#f59e0b'}; padding: 0.85rem 1rem; border-radius: 6px; margin-bottom: 0.75rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
        <span style="font-weight: 700; font-size: 0.82rem; color: ${a.severity === 'CRITICAL' ? '#991b1b' : '#92400e'};">
          🚨 ${a.severity} • ${a.type}
        </span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(a.timestamp).toLocaleTimeString()}</span>
      </div>
      <div style="font-size: 0.85rem; color: #1e293b;">${a.message}</div>
      <div style="margin-top: 0.4rem; font-size: 0.78rem;">
        Target: <strong>${a.batchId}</strong> • Action: <strong>QUARANTINE ENFORCED</strong>
      </div>
    </div>
  `).join("");
}

async function fetchAnalytics() {
  const container = document.getElementById("analytics-stats-grid");
  if (!container) return;

  let data = {
    totalBatches: fallbackBatches.length,
    totalGreenLeafKg: 2306.7,
    totalMadeTeaKg: 481.5,
    mrlComplianceRatePct: 75,
  };

  try {
    const res = await fetch(`${API_BASE}/analytics`);
    if (res.ok) {
      const json = await res.json();
      data = json.data;
    }
  } catch (e) {
    // fallback
  }

  container.innerHTML = `
    <div class="stat-box">
      <div class="stat-label">Total Batches</div>
      <div class="stat-value">${data.totalBatches}</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Green Leaf Tracked</div>
      <div class="stat-value">${data.totalGreenLeafKg} <span style="font-size: 1rem;">Kg</span></div>
    </div>
    <div class="stat-box">
      <div class="stat-label">Made Tea Output</div>
      <div class="stat-value">${data.totalMadeTeaKg} <span style="font-size: 1rem;">Kg</span></div>
    </div>
    <div class="stat-box" style="border-left-color: ${data.mrlComplianceRatePct >= 90 ? '#10b981' : '#f59e0b'};">
      <div class="stat-label">MRL Compliance Rate</div>
      <div class="stat-value" style="color: ${data.mrlComplianceRatePct >= 90 ? '#059669' : '#d97706'};">${data.mrlComplianceRatePct}%</div>
    </div>
  `;
}

// Interactive Map Pins
function setupInteractiveMap() {
  document.querySelectorAll(".garden-pin-group").forEach((el) => {
    el.addEventListener("click", (e) => {
      const dist = el.getAttribute("data-district");
      if (dist) window.selectDistrict(dist);
    });
  });
  window.selectDistrict("Jorhat");
}

const ASSAM_REGIONAL_DATA = {
  Jorhat: {
    name: "Jorhat Tea District (Upper Assam)",
    subtitle: "Headquarters of Tea Research Association (TRA) Tocklai & Borbhetta Experimental Estate",
    tag: "TRA Headquarters & Premier CTC Zone",
    stgCount: "12,450 Registered Smallholders",
    acreage: "18,200 Hectares",
    mrlCompliance: "99.6% (Strict PPC Adherence)",
    primaryGrades: "CTC BOP, BP, OF & Orthodox Broken",
    notableEstates: "Tocklai Experimental Station, Borbhetta Cluster #4, Cinnamara (India's 1st Commercial Estate est. 1850 by Maniram Dewan)",
    sampleBatchId: "ASM-2026-CTC-001",
    sampleBatchName: "Borbhetta Smallholding Cluster #4 (CTC BOP)",
    giCert: "GI-IN-ASM-TEA-00441",
  },
  Dibrugarh: {
    name: "Dibrugarh Tea District (Moran & Halmari Belt)",
    subtitle: "World-Renowned Specialty Orthodox & Golden Flowery Orange Pekoe Belt",
    tag: "Specialty Orthodox & Second Flush Hub",
    stgCount: "18,920 Registered Smallholders",
    acreage: "26,400 Hectares",
    mrlCompliance: "99.2% (Export NABL Grade)",
    primaryGrades: "TGFOP1, FTGFOP1 & Premium CTC",
    notableEstates: "Halmari Tea Estate (Record All-India GTAC Price), Moran STG Co-Operative, Chabua, Tingrai",
    sampleBatchId: "ASM-2026-ORT-002",
    sampleBatchName: "Moran Specialty Orthodox (TGFOP1)",
    giCert: "GI-IN-ASM-TEA-00442",
  },
  Tinsukia: {
    name: "Tinsukia Tea District (Doom Dooma & Margherita)",
    subtitle: "Historic High-Yield High-Strength Bold Liquor Tea Division",
    tag: "High-Strength Bold Liquor Belt",
    stgCount: "22,100 Registered Smallholders",
    acreage: "31,500 Hectares",
    mrlCompliance: "98.9% (Verified under TRA Audits)",
    primaryGrades: "CTC BP, CTC Dust, Single-Estate Orthodox",
    notableEstates: "Doom Dooma Heritage Estate, Margherita Division, Makum, Samdang",
    sampleBatchId: "EST-TIN-003",
    sampleBatchName: "Doom Dooma Heritage Estate (CTC BP)",
    giCert: "GI-IN-ASM-TEA-00443",
  },
  Golaghat: {
    name: "Golaghat Tea District (Bokakhat & Kaziranga Foothills)",
    subtitle: "Cooperative Smallholder Epicenter & Bio-Organic Handcrafted Cultivation",
    tag: "Organic & Smallholder Cooperative Hub",
    stgCount: "15,300 Registered Smallholders",
    acreage: "19,800 Hectares",
    mrlCompliance: "99.4% (Bio-Pesticide Adherent)",
    primaryGrades: "CTC OF, PD & Handcrafted Green Tea",
    notableEstates: "Bokakhat STG Producer Co., Numaligarh, Behora Organic Gardens",
    sampleBatchId: "STG-GLG-004",
    sampleBatchName: "Bokakhat Organic Smallholder Lot",
    giCert: "GI-IN-ASM-TEA-00444",
  },
  Guwahati: {
    name: "Guwahati Tea Auction Centre (GTAC) & Export Hub",
    subtitle: "Central Electronic Trading Gateway & Inland Container Depot for Global Exports",
    tag: "World's Premier CTC Electronic Auction",
    stgCount: "34 Warehouses & 180 Registered Brokers",
    acreage: "Handling >200 Million Kg Annually",
    mrlCompliance: "100% Pre-Auction Mandatory Clearance",
    primaryGrades: "All Commercial & Specialty Assam Lots",
    notableEstates: "Guwahati Tea Auction Centre (GTAC), Amingaon Inland Container Depot (ICD)",
    sampleBatchId: "QR-ASM26-8894-X82F",
    sampleBatchName: "GTAC Lot #402 (Export Handover)",
    giCert: "GI-IN-ASM-TEA-00441",
  },
};

window.selectDistrict = function(districtName) {
  const data = ASSAM_REGIONAL_DATA[districtName];
  if (!data) return;

  document.querySelectorAll(".garden-pin-group").forEach((el) => {
    if (el.getAttribute("data-district") === districtName) {
      el.classList.add("active-pin");
    } else {
      el.classList.remove("active-pin");
    }
  });

  const box = document.getElementById("district-info-box");
  if (!box) return;

  box.innerHTML = `
    <div class="district-card">
      <div class="district-header">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 0.35rem; background: #dcfce7; color: #166534; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 9999px; margin-bottom: 0.25rem;">
            <span>🛡️</span> ${data.giCert} • Assam GI Certified
          </div>
          <div class="district-title">📍 ${data.name}</div>
          <div style="font-size: 0.82rem; color: var(--text-muted);">${data.subtitle}</div>
        </div>
        <button onclick="lookupBatch('${data.sampleBatchId}'); jumpToTab('consumer');" class="btn-primary" style="font-size: 0.8rem; padding: 0.45rem 0.9rem; white-space: nowrap;">
          🔍 Inspect Batch in Explorer →
        </button>
      </div>

      <div class="district-metrics-grid">
        <div class="metric-pill">
          <div class="metric-pill-label">Registered Growers</div>
          <div class="metric-pill-val">${data.stgCount.split(" ")[0]}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">STGs on ledger</div>
        </div>
        <div class="metric-pill">
          <div class="metric-pill-label">Tracked Acreage</div>
          <div class="metric-pill-val">${data.acreage.split(" ")[0]}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">${data.acreage.split(" ").slice(1).join(" ")}</div>
        </div>
        <div class="metric-pill">
          <div class="metric-pill-label">MRL Compliance</div>
          <div class="metric-pill-val" style="color: #059669;">${data.mrlCompliance.split(" ")[0]}</div>
          <div style="font-size: 0.72rem; color: #059669;">PPC Whitelist Pass</div>
        </div>
        <div class="metric-pill">
          <div class="metric-pill-label">Primary Grades</div>
          <div class="metric-pill-val" style="font-size: 0.85rem; line-height: 1.3;">${data.primaryGrades}</div>
        </div>
      </div>

      <div style="font-size: 0.84rem; color: #374151; line-height: 1.5; background: #fafaf9; padding: 0.6rem 0.8rem; border-radius: 6px; border: 1px solid #e7e5e4;">
        <strong>Notable Gardens & Hubs:</strong> ${data.notableEstates}<br>
        <span style="color: var(--text-muted); font-size: 0.78rem;">Active Verified Batch: <code>${data.sampleBatchId}</code> (${data.sampleBatchName})</span>
      </div>
    </div>
  `;
};

window.showDistrictInfo = function(district, details) {
  window.selectDistrict(district);
};

// Tutorial Modal Controls
function setupTutorialModal() {
  const modal = document.getElementById("tutorial-modal");
  const openBtn = document.getElementById("btn-open-tutorial");
  const closeBtn = document.getElementById("btn-close-tutorial");
  const closeBottomBtn = document.getElementById("btn-close-tutorial-bottom");

  function openModal() {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (closeBottomBtn) closeBottomBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// -------------------------------------------------------------
// Cadastral Land Parcel GIS Engine (Dharitree / ILRMS Standards)
// -------------------------------------------------------------
const CADASTRAL_PLOTS = {
  Dag_142_518: {
    dagNo: "Dag #142/518 (দাগ ১৪২/৫১৮)",
    pattaNo: "Patta #42 (ম্যাদী পট্টা / Periodic Patta)",
    owner: "Mukund Saikia (Small Tea Grower #JHT-408)",
    revenueCircle: "Jorhat West Revenue Circle",
    mouza: "Borbhetta Mouza",
    areaHa: "2.45 Hectares (18 Bighas, 2 Kathas)",
    clone: "TV23 (High Quality Tocklai Vegetative Clone)",
    soilPh: "4.82 pH (Optimal Upper Assam Acidic Loam)",
    liveGps: "26.7512° N, 94.2155° E (Field BLE Plucker Beacon active)",
    eudrCompliance: "VERIFIED DEFORESTATION-FREE (Sentinel-2 satellite audit post-2020: 0% canopy loss)",
    activeBatchId: "ASM-2026-CTC-001",
    statusBadge: "ACTIVE_PLUCKING",
    statusText: "Active Plucking • Leaf Dispatch to Bought Leaf Factory",
    color: "#16a34a"
  },
  Dag_143_519: {
    dagNo: "Dag #143/519 (দাগ ১৪৩/৫১৯)",
    pattaNo: "Grant #TRA-RES-1911 (Special Scientific Research Tenure)",
    owner: "Tea Research Association (TRA Tocklai) Experimental Station",
    revenueCircle: "Jorhat West Revenue Circle",
    mouza: "Borbhetta Mouza",
    areaHa: "4.10 Hectares (30 Bighas, 3 Kathas)",
    clone: "TV1 Foundation Clonal Genebank (Mother Bush Archive)",
    soilPh: "4.75 pH (Red Sandy Alluvial Loam)",
    liveGps: "26.7525° N, 94.2180° E (Agro-Weather Station JHT-AWS-01)",
    eudrCompliance: "VERIFIED COMPLIANT (Established Tea Heritage since 1911)",
    activeBatchId: "ASM-2026-CTC-001",
    statusBadge: "RESEARCH_GENEBANK",
    statusText: "Scientific Germplasm Archive & Clone Certification Foundation",
    color: "#2563eb"
  },
  Dag_144_520: {
    dagNo: "Dag #144/520 (দাগ ১৪৪/৫২০)",
    pattaNo: "Patta #77 (Khiraj Myadi / খেৰাজ ম্যাদী)",
    owner: "Diganta Phukan (STG Member #JHT-412)",
    revenueCircle: "Jorhat West Revenue Circle",
    mouza: "Borbhetta Mouza",
    areaHa: "1.80 Hectares (13 Bighas, 1 Katha)",
    clone: "S3A3 (High-Yield Assamica Clone)",
    soilPh: "4.90 pH (Organic Matter 2.8%)",
    liveGps: "26.7508° N, 94.2201° E (Handheld Mobile Geo-Tagged)",
    eudrCompliance: "VERIFIED COMPLIANT (ILRMS Cadastral Survey Cleared)",
    activeBatchId: "ASM-2026-CTC-001",
    statusBadge: "ACTIVE_PLUCKING",
    statusText: "Under Regular 7-Day Plucking Rotation",
    color: "#16a34a"
  },
  Dag_145_521: {
    dagNo: "Dag #145/521 (দাগ ১৪৫/৫২১)",
    pattaNo: "TRA-VP-NURSERY-08",
    owner: "Tocklai Vegetative Propagation & Nursery Division",
    revenueCircle: "Jorhat West Revenue Circle",
    mouza: "Borbhetta Mouza",
    areaHa: "0.95 Hectares (7 Bighas)",
    clone: "Certified Clonal Cuttings (TV1, TV23, TV29, TV30)",
    soilPh: "4.65 pH (Microbial Inoculated Nursery Substrate)",
    liveGps: "26.7533° N, 94.2225° E (Automated Fogging & Mist Irrigation)",
    eudrCompliance: "VERIFIED COMPLIANT",
    activeBatchId: "QR-ASM26-8894-X82F",
    statusBadge: "NURSERY_STOCK",
    statusText: "Mother Bush Vegetative Cuttings for Smallholder Distribution",
    color: "#ca8a04"
  },
  Dag_146_522: {
    dagNo: "Dag #146/522 (দাগ ১৪৬/৫২২)",
    pattaNo: "GOV-RIPARIAN-BUFFER-99 (Strict Environmental Conservation Zone)",
    owner: "Government Forest & Riverine Buffer (Dhekiajuli Stream corridor)",
    revenueCircle: "Jorhat West Revenue Circle",
    mouza: "Borbhetta Mouza",
    areaHa: "1.60 Hectares (11 Bighas, 4 Kathas)",
    clone: "Native Riparian Vegetation (No Commercial Cultivation Allowed)",
    soilPh: "5.40 pH (Wetland Riparian Silt)",
    liveGps: "26.7495° N, 94.2140° E (Sentinel-2 Spectral Water Index Sensor)",
    eudrCompliance: "STRICT NON-PLUCKING ZONE (Illegal to Harvest / Deforest under EUDR & TRA Norms)",
    activeBatchId: "QUARANTINED_AREA",
    statusBadge: "PROHIBITED_ZONE",
    statusText: "⛔ Plucking Prohibited • Protected Natural Buffer Corridors",
    color: "#dc2626"
  },
  Dag_147_523: {
    dagNo: "Dag #147/523 (দাগ ১৪৭/৫২৩)",
    pattaNo: "Patta #84 (Periodic Bio-Organic Patta)",
    owner: "Hiren Baruah (NPOP & Aditi Organic Certified Producer)",
    revenueCircle: "Jorhat West Revenue Circle",
    mouza: "Borbhetta Mouza",
    areaHa: "2.15 Hectares (16 Bighas)",
    clone: "TV23 / T3E3 Flavoured Hybrid Clones",
    soilPh: "5.10 pH (Vermicompost & Bio-Char Enriched)",
    liveGps: "26.7480° N, 94.2175° E (Bio-Shield Agro-Sensors)",
    eudrCompliance: "VERIFIED 100% ORGANIC & DEFORESTATION-FREE",
    activeBatchId: "STG-GLG-004",
    statusBadge: "CERTIFIED_ORGANIC",
    statusText: "Zero Synthetic Chemical Applications • NPOP Certified",
    color: "#16a34a"
  }
};

function setupCadastralMap() {
  document.querySelectorAll(".cadastral-parcel").forEach(el => {
    el.addEventListener("click", () => {
      const dagId = el.getAttribute("data-dag");
      if (dagId) window.selectCadastralPlot(dagId);
    });
  });

  // Pre-select primary plot
  window.selectCadastralPlot("Dag_142_518");
}

window.switchGisMode = function(mode) {
  const btnMacro = document.getElementById("btn-mode-macro");
  const btnCadastral = document.getElementById("btn-mode-cadastral");
  const viewMacro = document.getElementById("gis-view-macro");
  const viewCadastral = document.getElementById("gis-view-cadastral");

  if (!btnMacro || !btnCadastral || !viewMacro || !viewCadastral) return;

  if (mode === "cadastral") {
    btnMacro.classList.remove("active");
    btnCadastral.classList.add("active");
    viewMacro.classList.remove("active");
    viewCadastral.classList.add("active");
    window.selectCadastralPlot("Dag_142_518");
    showToast("📐 Switched to High-Precision Cadastral Land Parcel Survey Map (Dharitree / ILRMS)", "info");
  } else {
    btnCadastral.classList.remove("active");
    btnMacro.classList.add("active");
    viewCadastral.classList.remove("active");
    viewMacro.classList.add("active");
    showToast("🗺️ Switched to Assam Valley Macro Distribution Map", "info");
  }
};

window.selectCadastralPlot = function(dagId) {
  const plot = CADASTRAL_PLOTS[dagId];
  if (!plot) return;

  // Highlight active SVG polygon parcel
  document.querySelectorAll(".cadastral-parcel").forEach(el => {
    if (el.getAttribute("data-dag") === dagId) {
      el.classList.add("active-dag");
    } else {
      el.classList.remove("active-dag");
    }
  });

  const detailsContainer = document.getElementById("cadastral-plot-details");
  if (!detailsContainer) return;

  const isProhibited = plot.statusBadge === "PROHIBITED_ZONE";

  detailsContainer.innerHTML = `
    <div class="cadastral-details-header">
      <div class="cadastral-details-title">
        <span>📐</span> ${plot.dagNo}
        <span style="font-size: 0.75rem; padding: 0.2rem 0.55rem; border-radius: 9999px; background: ${isProhibited ? '#fee2e2' : '#dcfce7'}; color: ${isProhibited ? '#991b1b' : '#166534'}; font-weight: 700;">
          ${plot.statusBadge}
        </span>
      </div>
      <div>
        ${!isProhibited ? `
          <button onclick="lookupBatch('${plot.activeBatchId}'); jumpToTab('consumer');" class="btn-primary" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;">
            🔍 View Active Tea Batch (${plot.activeBatchId}) →
          </button>
        ` : `
          <span style="font-size: 0.8rem; color: #dc2626; font-weight: 700;">⚠️ Commercial Plucking Strictly Banned</span>
        `}
      </div>
    </div>

    <div style="font-size: 0.88rem; color: #334155; margin-bottom: 0.85rem;">
      <strong>${plot.owner}</strong> • ${plot.revenueCircle}, ${plot.mouza}
    </div>

    <div class="cadastral-details-grid">
      <div class="cadastral-attr">
        <div class="cadastral-attr-label">Land Tenure & Patta</div>
        <div class="cadastral-attr-value">${plot.pattaNo}</div>
      </div>
      <div class="cadastral-attr">
        <div class="cadastral-attr-label">Surveyed Cadastral Area</div>
        <div class="cadastral-attr-value">${plot.areaHa}</div>
      </div>
      <div class="cadastral-attr">
        <div class="cadastral-attr-label">Tea Cultivar / Clones</div>
        <div class="cadastral-attr-value">${plot.clone}</div>
      </div>
      <div class="cadastral-attr">
        <div class="cadastral-attr-label">Soil Acidity (Tocklai Standard)</div>
        <div class="cadastral-attr-value" style="color: #047857;">${plot.soilPh}</div>
      </div>
      <div class="cadastral-attr">
        <div class="cadastral-attr-label">Live Field Telemetry</div>
        <div class="cadastral-attr-value" style="font-size: 0.8rem;">${plot.liveGps}</div>
      </div>
      <div class="cadastral-attr">
        <div class="cadastral-attr-label">EUDR Deforestation Compliance</div>
        <div class="cadastral-attr-value" style="font-size: 0.8rem; color: ${isProhibited ? '#dc2626' : '#15803d'};">
          ${isProhibited ? '⛔ PROTECTED FOREST CORRIDOR' : '✓ 100% DEFORESTATION-FREE AUDIT PASS'}
        </div>
      </div>
    </div>

    <div style="margin-top: 0.85rem; font-size: 0.8rem; color: #64748b; background: #ffffff; padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
      <span>📌 Land Registry Source: <strong>Dharitree / ILRMS Assam Cadastral Geo-Database</strong></span>
      <span>Status: <strong>${plot.statusText}</strong></span>
    </div>
  `;
};

window.loadCadastralCluster = function(clusterName) {
  const clusterLabels = {
    "Jorhat_Borbhetta": "Borbhetta Tocklai Division (Jorhat West Circle, Mouza Borbhetta)",
    "Dibrugarh_Moran": "Moran STG Cluster (Dibrugarh, Moran Circle, Mouza Ekarani)",
    "Tinsukia_DoomDooma": "Doom Dooma Heritage Sector (Tinsukia Circle, Mouza Doom Dooma)",
  };
  showToast(`📐 Loaded Cadastral Cluster: ${clusterLabels[clusterName] || clusterName}`, "info");
  window.selectCadastralPlot("Dag_142_518");
};
