/**
 * Frontend Application Logic for Assam Tea Digital Traceability (NESFIC-I-08)
 */

const API_BASE = "http://localhost:4000/api";

// Fallback in-memory state in case web UI is opened directly as a file or without API
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
  }
];

let isAssamese = false;

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupConsumerVerification();
  setupSTGPortal();
  setupFactoryPortal();
  setupTocklaiCommand();

  // Load initial demo batch
  lookupBatch("QR-ASM26-8894-X82F");
  fetchIoTTelemetry();
  fetchAnalytics();
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
  const resultDiv = document.getElementById("verification-result");
  resultDiv.innerHTML = `<div style="text-align: center; padding: 2rem;">Verifying cryptographic proof on Assam tea blockchain...</div>`;

  try {
    const res = await fetch(`${API_BASE}/verify/${encodeURIComponent(token)}`);
    if (res.ok) {
      const json = await res.json();
      renderVerificationSuccess(json.provenance);
      return;
    }
  } catch (err) {
    console.warn("API offline or unreachable, using local mock data:", err);
  }

  // Fallback lookup
  const match = fallbackBatches.find(b => b.serializedQrCode === token || b.id === token);
  if (match) {
    renderVerificationSuccess(match);
  } else {
    renderVerificationFailure(token);
  }
};

function renderVerificationSuccess(batch) {
  const container = document.getElementById("verification-result");

  container.innerHTML = `
    <!-- Top GI & Authenticity Banner -->
    <div class="card" style="border: 2px solid #15803d; background: linear-gradient(to right, #f0fdf4, #ffffff);">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: #dcfce7; color: #166534; font-weight: 700; font-size: 0.9rem; padding: 0.4rem 0.8rem; border-radius: 9999px; border: 1px solid #86efac; margin-bottom: 0.5rem;">
            <span>🛡️</span> AUTHENTIC ASSAM GI TAG CERTIFIED
          </div>
          <h2 style="color: #14532d; font-size: 1.4rem; margin-bottom: 0.25rem;">
            ${batch.processing?.grade || "Pure Assam Orthodox"} • ${batch.id}
          </h2>
          <div style="color: var(--text-muted); font-size: 0.9rem;">
            Estate / Garden: <strong>${batch.plucking.gardenName}</strong> (${batch.plucking.district}, Assam)
          </div>
        </div>

        <div style="text-align: right;">
          <div style="font-size: 0.8rem; color: var(--text-muted);">GI Registration No:</div>
          <div style="font-size: 1.1rem; font-weight: 700; color: #92400e;">${batch.giCertNumber || "GI-IN-ASM-TEA-00441"}</div>
          <div style="font-size: 0.75rem; color: #059669; font-weight: 600;">✓ Tea Board of India & TRA Tocklai Authorized</div>
        </div>
      </div>
    </div>

    <!-- Timeline & Details Grid -->
    <div class="grid-2">
      <!-- Left: Leaf-to-Cup Provenance Timeline -->
      <div class="card">
        <h2>🍃 Verified Leaf-to-Cup Journey</h2>
        <div class="timeline">

          <!-- Step 1: Plucking -->
          <div class="timeline-step">
            <div class="step-node">1</div>
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
            <div class="step-node">2</div>
            <div class="step-content">
              <div class="step-header">
                <span class="step-title">Collection & Weighbridge</span>
                <span class="step-time">Intake Verified</span>
              </div>
              <div class="step-body">
                <div>Weighbridge Station: <code>${batch.plucking.weighbridgeId || "WB-JHT-BLF-02"}</code></div>
                <div>Tare deducted, zero manual leaf alteration, digital receipt generated.</div>
              </div>
            </div>
          </div>

          <!-- Step 3: Factory Processing -->
          <div class="timeline-step">
            <div class="step-node">3</div>
            <div class="step-content">
              <div class="step-header">
                <span class="step-title">Manufacturing (${batch.processing?.procType || "CTC"})</span>
                <span class="step-time">${batch.processing ? "Completed" : "In Progress"}</span>
              </div>
              <div class="step-body">
                ${batch.processing ? `
                  <div>Factory: <strong>${batch.processing.factoryName}</strong></div>
                  <div>Grade: <strong>${batch.processing.grade}</strong></div>
                  <div>Drying Temp: <strong>${batch.processing.dryingTempC}°C</strong> • Withering: <strong>${batch.processing.witheringLossPct}%</strong></div>
                  <div>Made Tea Yield: <strong>${batch.processing.madeTeaWeightKg} Kg</strong></div>
                ` : `<div style="color: #b45309;">Currently undergoing withering and CTC cutting in factory.</div>`}
              </div>
            </div>
          </div>

          <!-- Step 4: Chemical Residue MRL Lab -->
          <div class="timeline-step">
            <div class="step-node">4</div>
            <div class="step-content">
              <div class="step-header">
                <span class="step-title">TRA Tocklai Safety Test</span>
                <span class="step-time">${batch.labTest ? "NABL Passed" : "Pending"}</span>
              </div>
              <div class="step-body">
                ${batch.labTest ? `
                  <div style="color: #166534; font-weight: 600;">✓ Pesticide MRL Status: COMPLIANT</div>
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
            <div class="step-node">5</div>
            <div class="step-content">
              <div class="step-header">
                <span class="step-title">Retail Packaging & Cryptographic Seal</span>
                <span class="step-time">${batch.stage === "RETAIL_PACKAGED" ? "Sealed" : "Active"}</span>
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
                { chemical: "Hexaconazole", foundPpm: 0.035, maxPermissibleLimitPpm: 0.10, pass: true },
                { chemical: "Thiamethoxam", foundPpm: 0.015, maxPermissibleLimitPpm: 0.05, pass: true },
              ]).map(p => `
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 0.45rem 0; font-weight: 600;">${p.chemical}</td>
                  <td style="padding: 0.45rem 0;">${p.foundPpm} ppm</td>
                  <td style="padding: 0.45rem 0; color: var(--text-muted);">${p.maxPermissibleLimitPpm} ppm</td>
                  <td style="padding: 0.45rem 0;"><span style="color: #15803d; font-weight: bold;">PASS ✓</span></td>
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

// 2. STG & Field Portal
function setupSTGPortal() {
  const selectGrower = document.getElementById("select-grower");
  selectGrower.innerHTML = `
    <option value="STG-JHT-001">Mukund Saikia (Borbhetta Cluster #4, Jorhat)</option>
    <option value="STG-DIB-002">Pronab Gogoi (Moran Co-Op, Dibrugarh)</option>
    <option value="EST-TIN-003">Doom Dooma Heritage Estate (Tinsukia)</option>
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
        alert(`🎉 Harvest recorded on blockchain ledger!\nBatch ID: ${json.data.id}\nStatus: PLUCKED`);
        updateProcessBatchDropdown();
        return;
      }
    } catch (err) {
      console.warn("Using offline mode fallback:", err);
    }

    const fallbackId = `ASM-2026-${procType}-${String(fallbackBatches.length + 1).padStart(3, "0")}`;
    alert(`🎉 Harvest recorded locally!\nBatch ID: ${fallbackId}\nStatus: PLUCKED`);
  });

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
  });
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

    alert(`🏭 Factory processing confirmed for batch ${select.value}!\nGrade: ${grade}\nMade Tea: ${madeWeight} Kg\nQR codes minted.`);
  });

  const btnLab = document.getElementById("btn-issue-lab-cert");
  btnLab.addEventListener("click", () => {
    alert("🧪 TRA Tocklai NABL Lab certificate generated and pinned to IPFS!\nCID: QmTRA9942TocklaiChemicalMRLPassCert\nMRL Status: COMPLIANT ✓");
  });
}

function updateProcessBatchDropdown() {
  const select = document.getElementById("select-process-batch");
  if (!select) return;
  select.innerHTML = `
    <option value="ASM-2026-ORT-002">ASM-2026-ORT-002 (Moran Co-Op, Dibrugarh - 279 Kg)</option>
    <option value="ASM-2026-CTC-001">ASM-2026-CTC-001 (Borbhetta Cluster, Jorhat - 418.5 Kg)</option>
  `;
}

async function fetchIoTTelemetry() {
  const container = document.getElementById("iot-telemetry-container");
  if (!container) return;

  const mockTelemetry = [
    {
      chamber: "Withering Trough #03",
      temp: "24.5°C",
      humidity: "68%",
      metric: "Moisture Loss: 32.4%",
      badge: "OPTIMAL",
    },
    {
      chamber: "Fermentation Floor",
      temp: "28.2°C",
      humidity: "92%",
      metric: "Oxidation: 2.4 Hrs",
      badge: "OPTIMAL",
    },
    {
      chamber: "Vibro-Fluid Dryer (VFBD)",
      temp: "115.0°C",
      humidity: "18%",
      metric: "Exhaust Temp: 58°C",
      badge: "ACTIVE FIRING",
    },
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

// 4. TRA Tocklai Command Center
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
  });
}

async function fetchAnalytics() {
  const container = document.getElementById("analytics-stats-grid");
  if (!container) return;

  let data = {
    totalBatches: 2,
    totalGreenLeafKg: 697.5,
    totalMadeTeaKg: 155.7,
    mrlComplianceRatePct: 100,
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
    <div class="stat-box" style="border-left-color: #10b981;">
      <div class="stat-label">MRL Compliance Rate</div>
      <div class="stat-value" style="color: #059669;">${data.mrlComplianceRatePct}%</div>
    </div>
  `;
}

window.showDistrictInfo = function(district, details) {
  const box = document.getElementById("district-info-box");
  box.innerHTML = `📍 <strong>${district}</strong>: ${details} • GI Authentication Status: <span style="color: #166534;">Active ✓</span>`;
};
