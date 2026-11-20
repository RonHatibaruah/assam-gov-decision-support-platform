/**
 * Cloudflare Pages Function: Serverless Edge API for Assam Tea Traceability
 * Runs natively on Cloudflare Workers edge runtime
 */

const SEED_BATCHES = [
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

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // 1. Health
  if (path === "/api/health") {
    return jsonResponse({
      status: "ok",
      service: "Assam Tea Value Chain Traceability Engine (Cloudflare Edge)",
      timestamp: new Date().toISOString(),
    });
  }

  // 2. Batches list
  if (path === "/api/batches" && method === "GET") {
    return jsonResponse({ success: true, data: SEED_BATCHES });
  }

  // 3. Consumer Verify
  const verifyMatch = path.match(/^\/api\/verify\/(.+)$/);
  if (verifyMatch) {
    const token = decodeURIComponent(verifyMatch[1]);
    const match = SEED_BATCHES.find(b => b.serializedQrCode === token || b.id === token);
    if (!match) {
      return jsonResponse({
        success: false,
        error: "Invalid or unregistered Assam Tea QR code. Warning: Possible counterfeit.",
      }, 404);
    }
    return jsonResponse({
      success: true,
      verified: true,
      giCertified: match.giTagAuthorized,
      certNumber: match.giCertNumber,
      provenance: match,
      tocklaiAuthenticationBadge: "VERIFIED_AUTHENTIC_ASSAM_TEA",
    });
  }

  // 4. Analytics
  if (path === "/api/analytics") {
    return jsonResponse({
      success: true,
      data: {
        totalBatches: SEED_BATCHES.length,
        totalGreenLeafKg: 697.5,
        totalMadeTeaKg: 155.7,
        registeredGrowersCount: 3,
        mrlComplianceRatePct: 100,
        totalAnchorsOnChain: 1,
        latestMerkleRoot: "0x8f3c7e99214b2a65d38a719c84e1bfa74319a92289410d55e925bca34821a812",
        districtBreakdown: { Jorhat: 1, Dibrugarh: 1 },
      },
    });
  }

  // 5. IoT Telemetry
  if (path === "/api/iot/telemetry") {
    return jsonResponse({
      success: true,
      data: {
        factoryId: "FAC-JHT-01",
        sensors: [
          { chamber: "WITHERING_TROUGH_03", tempCelsius: 24.8, humidityPct: 69.2, airflowMps: 2.1, status: "OPTIMAL" },
          { chamber: "FERMENTATION_FLOOR_01", tempCelsius: 28.4, humidityPct: 93.0, oxidationTimeHrs: 2.4, status: "OPTIMAL" },
          { chamber: "DRYING_CHAMBER_VFBD", inletTempCelsius: 115.5, exhaustTempCelsius: 58.2, targetMoisturePct: 3.0, status: "ACTIVE_FIRING" },
        ],
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Fallback
  return jsonResponse({ success: false, error: "Endpoint not found" }, 404);
}
