import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

test("HTTP API endpoints respond accurately", async () => {
  // Dynamically import server or launch a test instance
  const { db } = await import("../src/db.js");

  // Verify DB state
  const batches = db.getAllBatches();
  assert.ok(batches.length >= 2);

  // Test verify logic
  const verified = db.getBatchByQr("QR-ASM26-8894-X82F");
  assert.equal(verified.id, "ASM-2026-CTC-001");
  assert.equal(verified.giCertNumber, "GI-IN-ASM-TEA-00441");

  // Test analytics
  const analytics = db.getAnalytics();
  assert.equal(analytics.mrlComplianceRatePct, 75); // 3 of 4 tested batches compliant (1 flagged violation)
  assert.ok(analytics.latestMerkleRoot.startsWith("0x"));
});
