/**
 * In-Memory & File-Persisted Data Store for Assam Tea Traceability
 * Pre-seeded with authentic Assam tea estates, STGs, and realistic batch journeys
 */

import { MerkleTree, hashBatch, sha256 } from "../../../packages/shared/src/merkle.js";
import { SAMPLE_GROWERS, TRA_PPC_PESTICIDE_LIMITS } from "../../../packages/shared/src/constants.js";

export class TraceabilityDB {
  constructor() {
    this.growers = [...SAMPLE_GROWERS];
    this.batches = new Map();
    this.anchors = [];
    this.seedInitialData();
  }

  seedInitialData() {
    // 1. Fully completed Leaf-to-Cup Batch: Jorhat CTC
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
        madeTeaWeightKg: 94.2, // ~22.5% recovery ratio
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
        parameters: TRA_PPC_PESTICIDE_LIMITS.map(limit => ({
          chemical: limit.chemical,
          foundPpm: +(Math.random() * (limit.maxPpm * 0.4)).toFixed(4),
          maxPermissibleLimitPpm: limit.maxPpm,
          pass: true,
        })),
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

    // 2. High Grade Orthodox Batch: Dibrugarh (In Lab Testing stage)
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

    // Initial Anchor
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
      parameters: labData.parameters || TRA_PPC_PESTICIDE_LIMITS.map(l => ({
        chemical: l.chemical,
        foundPpm: +(Math.random() * (l.maxPpm * 0.3)).toFixed(4),
        maxPermissibleLimitPpm: l.maxPpm,
        pass: true,
      })),
      moisturePercentage: labData.moisturePercentage || 3.4,
      fssaiStandardMet: true,
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
    batch.serializedQrCode = serializedQrCode || batch.serializedQrCode;
    batch.stage = "RETAIL_PACKAGED";
    batch.updatedAt = new Date().toISOString();
    batch.merkleLeafHash = hashBatch(batch);
    return batch;
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

    // Update batch blockchainTxHash with latest anchor
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
    };
  }
}

export const db = new TraceabilityDB();
