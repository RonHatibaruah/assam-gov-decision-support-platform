import test from "node:test";
import assert from "node:assert/strict";
import { govDb } from "../src/db.js";
import { CHALLENGE_INFO } from "../../../packages/shared/src/constants.js";

test("API state and data models align with NESFIC-D-36", () => {
  assert.equal(CHALLENGE_INFO.code, "NESFIC-D-36");
  assert.equal(CHALLENGE_INFO.title, "Trusted Government Knowledge, Rules & Document Assistant");

  const stats = govDb.getSystemStats();
  assert.ok(stats.totalDocuments >= 6);
  assert.ok(stats.totalClauses >= 15);
  assert.equal(stats.zeroHallucinationCompliance, "100%");
});
