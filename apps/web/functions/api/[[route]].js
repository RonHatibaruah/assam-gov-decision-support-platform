/**
 * Cloudflare Pages Function: Serverless Edge API for Assam Tea Traceability
 * Synchronized with 6-batch multi-district dataset and admin governance
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
        totalGreenLeafKg: 2306.7,
        totalMadeTeaKg: 481.5,
        registeredGrowersCount: 6,
        mrlComplianceRatePct: 75,
        totalAnchorsOnChain: 1,
        latestMerkleRoot: "0x8f3c7e99214b2a65d38a719c84e1bfa74319a92289410d55e925bca34821a812",
        districtBreakdown: { Jorhat: 1, Dibrugarh: 1, Tinsukia: 1, Golaghat: 1, Sonitpur: 1, Cachar: 1 },
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

  return jsonResponse({ success: false, error: "Endpoint not found" }, 404);
}
