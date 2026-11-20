/**
 * In-Memory & File-Persisted Data Store for Assam Tea Traceability
 * Pre-seeded with 6 authentic Assam tea batches across diverse districts
 */

import { MerkleTree, hashBatch, sha256 } from "../../../packages/shared/src/merkle.js";
import { SAMPLE_GROWERS, TRA_PPC_PESTICIDE_LIMITS } from "../../../packages/shared/src/constants.js";

export class TraceabilityDB {
  constructor() {
    this.growers = [...SAMPLE_GROWERS];
    this.batches = new Map();
    this.anchors = [];
    this.adminAlerts = [];
    this.seedInitialData();
  }

  seedInitialData() {
    // 1. Fully completed Leaf-to-Cup Batch: Jorhat CTC BOP
    const batch1 = {
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
        madeTeaWeightKg: 94.2, // ~22.5% recovery
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
      merkleLeafHash: "",
      blockchainTxHash: "0x8f3c7e99214b2a65d38a719c84e1bfa74319a92289410d55e925bca34821a812",
      createdAt: "2026-11-18T07:45:00+05:30",
      updatedAt: "2026-11-20T16:20:00+05:30",
    };
    batch1.merkleLeafHash = hashBatch(batch1);
    this.batches.set(batch1.id, batch1);

    // 2. High Grade Orthodox Batch: Dibrugarh (In Factory Processing)
    const batch2 = {
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
      merkleLeafHash: "",
      blockchainTxHash: "0x3a4b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
      createdAt: "2026-11-20T08:15:00+05:30",
      updatedAt: "2026-11-20T18:00:00+05:30",
    };
    batch2.merkleLeafHash = hashBatch(batch2);
    this.batches.set(batch2.id, batch2);

    // 3. Tinsukia Bold Liquor CTC BP (Lab Certified Stage)
    const batch3 = {
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
          { chemical: "Thiamethoxam", foundPpm: 0.019, maxPermissibleLimitPpm: 0.05, pass: true },
        ],
        moisturePercentage: 3.1,
        fssaiStandardMet: true,
      },
      custodian: "Doom Dooma Heritage Estate",
      serializedQrCode: "QR-ASM26-TIN-8821-BP",
      giTagAuthorized: true,
      giCertNumber: "GI-IN-ASM-TEA-00443",
      merkleLeafHash: "",
      blockchainTxHash: "0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
      createdAt: "2026-11-19T06:30:00+05:30",
      updatedAt: "2026-11-20T11:00:00+05:30",
    };
    batch3.merkleLeafHash = hashBatch(batch3);
    this.batches.set(batch3.id, batch3);

    // 4. Golaghat Bio-Organic Green Tea (Weighed at Collection Center)
    const batch4 = {
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
      merkleLeafHash: "",
      blockchainTxHash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
      createdAt: "2026-11-20T09:00:00+05:30",
      updatedAt: "2026-11-20T10:15:00+05:30",
    };
    batch4.merkleLeafHash = hashBatch(batch4);
    this.batches.set(batch4.id, batch4);

    // 5. Sonitpur Silver Needle Specialty White Tea (Packaged Single-Estate Reserve)
    const batch5 = {
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
        grade: "Silver Needle (Handcrafted Sun-Withered)",
        intakeWeightKg: 65.0,
        madeTeaWeightKg: 14.8,
        witheringLossPct: 62.0,
        fermentationDurationHrs: 0.0, // Non-oxidized
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
          { chemical: "Quinalphos", foundPpm: 0.000, maxPermissibleLimitPpm: 0.01, pass: true },
        ],
        moisturePercentage: 2.8,
        fssaiStandardMet: true,
      },
      auctionLotNo: "DIRECT-EXPORTER-D2C-LOT-01",
      custodian: "Assam Rare Teas Global Vault",
      serializedQrCode: "QR-ASM26-SON-SILVER-05",
      giTagAuthorized: true,
      giCertNumber: "GI-IN-ASM-TEA-00445",
      merkleLeafHash: "",
      blockchainTxHash: "0x11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff",
      createdAt: "2026-11-17T06:15:00+05:30",
      updatedAt: "2026-11-20T14:00:00+05:30",
    };
    batch5.merkleLeafHash = hashBatch(batch5);
    this.batches.set(batch5.id, batch5);

    // 6. SIMULATED SAFETY VIOLATION BATCH: Cachar CTC Dust (Quinalphos Exceeded MRL - INTERCEPTED)
    const batch6 = {
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
        pesticideMRLStatus: "NON_COMPLIANT", // VIOLATION
        parameters: [
          { chemical: "Quinalphos", foundPpm: 0.082, maxPermissibleLimitPpm: 0.01, pass: false }, // FAILED 8x OVER LIMIT
          { chemical: "Emamectin Benzoate", foundPpm: 0.022, maxPermissibleLimitPpm: 0.05, pass: true },
        ],
        moisturePercentage: 4.8,
        fssaiStandardMet: false,
      },
      custodian: "Barak Valley BLF (Quarantine Bay 3)",
      serializedQrCode: "QR-ASM26-FLAGGED-VIOLATION-06",
      giTagAuthorized: false, // Revoked by TRA Tocklai
      giCertNumber: "GI-REVOKED-PPC-VIOLATION",
      revocationReason: "Quinalphos pesticide detected at 0.082 ppm (exceeds statutory 0.01 ppm limit under Tea Board PPC v16 and EU MRL). Retail packaging strictly blocked.",
      merkleLeafHash: "",
      blockchainTxHash: "0xdeadbeef11223344556677889900aabbccddeeffdeadbeef1122334455667788",
      createdAt: "2026-11-19T08:00:00+05:30",
      updatedAt: "2026-11-20T17:00:00+05:30",
    };
    batch6.merkleLeafHash = hashBatch(batch6);
    this.batches.set(batch6.id, batch6);

    // Initial alert for the violation batch
    this.adminAlerts.push({
      id: "ALT-2026-0881",
      severity: "CRITICAL",
      type: "MRL_PESTICIDE_VIOLATION",
      batchId: "ASM-2026-FLG-006",
      message: "Batch ASM-2026-FLG-006 failed GC-MS/MS screen: Quinalphos 0.082 ppm vs permissible 0.01 ppm. Automatic quarantine activated.",
      timestamp: "2026-11-20T14:35:00+05:30",
      resolved: false,
    });

    // Anchor on-chain
    this.createAnchor();
  }

  getAllBatches() {
    return Array.from(this.batches.values());
  }

  getBatchById(id) {
    return this.batches.get(id);
  }

  getBatchByQr(qrToken) {
    for (const b of this.batches.values()) {
      if (b.serializedQrCode === qrToken || b.id === qrToken) {
        return b;
      }
    }
    return null;
  }

  createPlucking(data) {
    const id = `ASM-2026-${data.procType || "CTC"}-${String(this.batches.size + 1).padStart(3, "0")}`;
    const now = new Date().toISOString();

    const newBatch = {
      id,
      stage: "PLUCKED",
      plucking: {
        growerId: data.growerId,
        growerName: data.growerName,
        gardenName: data.gardenName,
        district: data.district || "Jorhat",
        sectionId: data.sectionId || "Sec-A1",
        gps: data.gps,
        estimatedWeightKg: data.estimatedWeightKg,
        pluckingTime: now,
      },
      custodian: data.growerName,
      serializedQrCode: `QR-ASM26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      giTagAuthorized: true,
      giCertNumber: `GI-IN-ASM-TEA-${String(440 + this.batches.size)}`,
      createdAt: now,
      updatedAt: now,
    };

    newBatch.merkleLeafHash = hashBatch(newBatch);
    this.batches.set(id, newBatch);
    return newBatch;
  }

  updateWeighbridge(id, { verifiedWeightKg, weighbridgeId }) {
    const batch = this.batches.get(id);
    if (!batch) return null;
    batch.plucking.verifiedWeightKg = verifiedWeightKg;
    batch.plucking.weighbridgeId = weighbridgeId || "WB-AUTO-01";
    batch.stage = "COLLECTION_WEIGHED";
    batch.updatedAt = new Date().toISOString();
    batch.merkleLeafHash = hashBatch(batch);
    return batch;
  }

  updateProcessing(id, procData) {
    const batch = this.batches.get(id);
    if (!batch) return null;
    batch.processing = {
      factoryId: procData.factoryId,
      factoryName: procData.factoryName,
      procType: procData.procType || "CTC",
      grade: procData.grade || "BOP",
      intakeWeightKg: procData.intakeWeightKg || batch.plucking.verifiedWeightKg || 300,
      madeTeaWeightKg: procData.madeTeaWeightKg,
      witheringLossPct: procData.witheringLossPct || 32,
      fermentationDurationHrs: procData.fermentationDurationHrs || 2.5,
      dryingTempC: procData.dryingTempC || 110,
      completedTime: new Date().toISOString(),
    };
    batch.stage = "FACTORY_PROCESSED";
    batch.custodian = procData.factoryName;
    batch.updatedAt = new Date().toISOString();
    batch.merkleLeafHash = hashBatch(batch);
    return batch;
  }

  updateLabTest(id, labData) {
    const batch = this.batches.get(id);
    if (!batch) return null;
    batch.labTest = {
      certifierId: labData.certifierId || "LAB-TRA-01",
      labName: labData.labName || "TRA Tocklai Quality & Chemical Residue Lab",
      accreditationNo: labData.accreditationNo || "NABL TC-5421",
      ipfsHash: labData.ipfsHash || `QmTRA${sha256(id).substring(0, 24)}`,
      testDate: new Date().toISOString(),
      pesticideMRLStatus: labData.pesticideMRLStatus || "COMPLIANT",
      parameters: labData.parameters || TRA_PPC_PESTICIDE_LIMITS.slice(0, 4).map(l => ({
        chemical: l.chemical,
        foundPpm: +(Math.random() * (l.maxPpm * 0.3)).toFixed(4),
        maxPermissibleLimitPpm: l.maxPpm,
        pass: true,
      })),
      moisturePercentage: labData.moisturePercentage || 3.4,
      fssaiStandardMet: labData.pesticideMRLStatus !== "NON_COMPLIANT",
    };
    batch.stage = "LAB_CERTIFIED";
    batch.updatedAt = new Date().toISOString();
    batch.merkleLeafHash = hashBatch(batch);
    return batch;
  }

  updateAuction(id, { auctionLotNo, newCustodian }) {
    const batch = this.batches.get(id);
    if (!batch) return null;
    batch.auctionLotNo = auctionLotNo;
    batch.custodian = newCustodian;
    batch.stage = "AUCTION_TRANSFERRED";
    batch.updatedAt = new Date().toISOString();
    batch.merkleLeafHash = hashBatch(batch);
    return batch;
  }

  updatePackaging(id, { serializedQrCode }) {
    const batch = this.batches.get(id);
    if (!batch) return null;
    if (batch.labTest && batch.labTest.pesticideMRLStatus === "NON_COMPLIANT") {
      throw new Error("Cannot package batch: Chemical MRL non-compliance violation.");
    }
    batch.serializedQrCode = serializedQrCode || batch.serializedQrCode;
    batch.stage = "RETAIL_PACKAGED";
    batch.updatedAt = new Date().toISOString();
    batch.merkleLeafHash = hashBatch(batch);
    return batch;
  }

  // Admin Features
  toggleGICertification(batchId, isAuthorized, reason = "") {
    const batch = this.batches.get(batchId);
    if (!batch) return null;
    batch.giTagAuthorized = isAuthorized;
    if (!isAuthorized) {
      batch.revocationReason = reason || "Suspended by TRA Tocklai Regulatory Inspection";
      this.adminAlerts.unshift({
        id: `ALT-${Date.now().toString().slice(-4)}`,
        severity: "WARNING",
        type: "GI_REVOCATION",
        batchId: batchId,
        message: `GI Certification revoked for batch ${batchId}: ${batch.revocationReason}`,
        timestamp: new Date().toISOString(),
        resolved: false,
      });
    } else {
      delete batch.revocationReason;
    }
    batch.updatedAt = new Date().toISOString();
    batch.merkleLeafHash = hashBatch(batch);
    return batch;
  }

  getAdminAlerts() {
    return this.adminAlerts;
  }

  getAgrochemicalWhitelist() {
    return TRA_PPC_PESTICIDE_LIMITS;
  }

  createAnchor() {
    const leaves = Array.from(this.batches.values()).map(b => b.merkleLeafHash || hashBatch(b));
    const tree = new MerkleTree(leaves);
    const root = tree.getRoot();
    const anchor = {
      rootHash: root,
      batchCount: leaves.length,
      timestamp: new Date().toISOString(),
      simulatedTxHash: `0x${sha256(root + Date.now()).substring(0, 64)}`,
      blockNumber: 15420000 + this.anchors.length,
    };
    this.anchors.push(anchor);

    for (const b of this.batches.values()) {
      if (!b.blockchainTxHash) {
        b.blockchainTxHash = anchor.simulatedTxHash;
      }
    }
    return anchor;
  }

  getAnalytics() {
    const all = this.getAllBatches();
    const totalGreenLeafKg = all.reduce((sum, b) => sum + (b.plucking.verifiedWeightKg || b.plucking.estimatedWeightKg || 0), 0);
    const totalMadeTeaKg = all.reduce((sum, b) => sum + (b.processing?.madeTeaWeightKg || 0), 0);
    const testedBatches = all.filter(b => b.labTest);
    const mrlCompliantCount = testedBatches.filter(b => b.labTest.pesticideMRLStatus === "COMPLIANT").length;

    const districtBreakdown = {};
    for (const b of all) {
      const dist = b.plucking.district || "Jorhat";
      districtBreakdown[dist] = (districtBreakdown[dist] || 0) + 1;
    }

    return {
      totalBatches: all.length,
      totalGreenLeafKg: +totalGreenLeafKg.toFixed(1),
      totalMadeTeaKg: +totalMadeTeaKg.toFixed(1),
      registeredGrowersCount: this.growers.length,
      mrlComplianceRatePct: testedBatches.length ? +((mrlCompliantCount / testedBatches.length) * 100).toFixed(1) : 100,
      totalAnchorsOnChain: this.anchors.length,
      latestMerkleRoot: this.anchors[this.anchors.length - 1]?.rootHash || "0x0",
      districtBreakdown,
      criticalAlertsCount: this.adminAlerts.filter(a => !a.resolved).length,
    };
  }
}

export const db = new TraceabilityDB();
