import test from "node:test";
import assert from "node:assert/strict";
import { db } from "../src/db.js";
import { MerkleTree, sha256 } from "../../../packages/shared/src/merkle.js";

test("Database seeds correctly with authentic Assam tea batches", () => {
  const batches = db.getAllBatches();
  assert.ok(batches.length >= 2, "Expected at least 2 pre-seeded batches");
  const batch1 = db.getBatchById("ASM-2026-CTC-001");
  assert.ok(batch1, "Batch ASM-2026-CTC-001 should exist");
  assert.equal(batch1.stage, "RETAIL_PACKAGED");
  assert.equal(batch1.plucking.district, "Jorhat");
  assert.equal(batch1.giTagAuthorized, true);
  assert.equal(batch1.labTest.pesticideMRLStatus, "COMPLIANT");
});

test("Consumer QR lookup resolves correctly", () => {
  const verified = db.getBatchByQr("QR-ASM26-8894-X82F");
  assert.ok(verified, "Should find batch by QR token");
  assert.equal(verified.id, "ASM-2026-CTC-001");
  assert.equal(verified.processing.grade, "BOP (Broken Orange Pekoe)");
});

test("STG Plucking creates new batch and transitions stages", () => {
  const newBatch = db.createPlucking({
    growerId: "STG-JHT-001",
    growerName: "Mukund Saikia",
    gardenName: "Borbhetta Smallholding Cluster #4",
    district: "Jorhat",
    gps: { lat: 26.7512, lng: 94.2155 },
    estimatedWeightKg: 350.0,
    procType: "CTC",
  });

  assert.ok(newBatch.id.startsWith("ASM-2026-CTC-"));
  assert.equal(newBatch.stage, "PLUCKED");

  // Step 2: Weighbridge
  const weighed = db.updateWeighbridge(newBatch.id, {
    verifiedWeightKg: 348.2,
    weighbridgeId: "WB-JHT-01",
  });
  assert.equal(weighed.stage, "COLLECTION_WEIGHED");
  assert.equal(weighed.plucking.verifiedWeightKg, 348.2);

  // Step 3: Factory Processing
  const processed = db.updateProcessing(newBatch.id, {
    factoryId: "FAC-JHT-01",
    factoryName: "Tocklai Valley Bought Leaf Factory",
    grade: "BP (Broken Pekoe)",
    madeTeaWeightKg: 78.3,
  });
  assert.equal(processed.stage, "FACTORY_PROCESSED");

  // Step 4: Lab Test
  const tested = db.updateLabTest(newBatch.id, {
    pesticideMRLStatus: "COMPLIANT",
    moisturePercentage: 3.1,
  });
  assert.equal(tested.stage, "LAB_CERTIFIED");
  assert.equal(tested.labTest.pesticideMRLStatus, "COMPLIANT");
});

test("Merkle Tree root generation and anchor calculation", () => {
  const leaves = ["apple", "banana", "camellia_sinensis_assamica"].map(s => sha256(s));
  const tree = new MerkleTree(leaves);
  const root = tree.getRoot();
  assert.ok(root.startsWith("0x"), "Root must be hex string with 0x prefix");

  const anchor = db.createAnchor();
  assert.ok(anchor.rootHash.startsWith("0x"));
  assert.ok(anchor.simulatedTxHash.startsWith("0x"));
  assert.ok(anchor.batchCount > 0);
});

test("Analytics correctly computes regional breakdown", () => {
  const stats = db.getAnalytics();
  assert.ok(stats.totalBatches >= 6, "Expected at least 6 pre-seeded batches");
  assert.ok(stats.totalGreenLeafKg > 0);
  assert.ok(stats.totalMadeTeaKg > 0);
  assert.ok(stats.districtBreakdown["Jorhat"] >= 1);
});

test("Intercepts chemical safety violations and blocks packaging", () => {
  const flagged = db.getBatchById("ASM-2026-FLG-006");
  assert.ok(flagged, "Flagged batch ASM-2026-FLG-006 must exist");
  assert.equal(flagged.labTest.pesticideMRLStatus, "NON_COMPLIANT");
  assert.equal(flagged.giTagAuthorized, false);
  assert.ok(flagged.revocationReason.includes("Quinalphos"));

  // Verify packaging is blocked
  assert.throws(() => {
    db.updatePackaging("ASM-2026-FLG-006", { serializedQrCode: "FORGED_QR" });
  }, /Chemical MRL non-compliance violation/);
});

test("Admin GI revocation and alert feed functions", () => {
  const alerts = db.getAdminAlerts();
  assert.ok(alerts.length >= 1, "Must have active alerts");
  assert.equal(alerts[0].severity, "CRITICAL");

  // Test toggling GI
  const toggled = db.toggleGICertification("ASM-2026-CTC-001", false, "Random Audit Quarantine");
  assert.equal(toggled.giTagAuthorized, false);
  assert.equal(toggled.revocationReason, "Random Audit Quarantine");

  // Re-authorize
  const restored = db.toggleGICertification("ASM-2026-CTC-001", true);
  assert.equal(restored.giTagAuthorized, true);
  assert.equal(restored.revocationReason, undefined);
});

test("PPC Agrochemical Whitelist returns approved reference compounds", () => {
  const whitelist = db.getAgrochemicalWhitelist();
  assert.ok(whitelist.length >= 10);
  const quinalphos = whitelist.find(c => c.chemical === "Quinalphos");
  assert.equal(quinalphos.maxPpm, 0.01);
  assert.equal(quinalphos.phiDays, 14);
});
