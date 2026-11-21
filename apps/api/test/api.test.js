import test from "node:test";
import assert from "node:assert/strict";
import { govDb } from "../src/db.js";
import { MerkleTree, sha256 } from "../../../packages/shared/src/merkle.js";

test("Database seeds correctly with authentic Assam Government documents", () => {
  const docs = govDb.getDocuments();
  assert.ok(docs.length >= 6, "Expected at least 6 pre-seeded government documents");

  const pensionDoc = govDb.getDocumentById("DOC-PPG-1969-01");
  assert.ok(pensionDoc, "Pension Rules document must exist");
  assert.equal(pensionDoc.department, "PPGD");
  assert.ok(pensionDoc.clauses.some(c => c.clauseId === "Rule 31"));
  assert.ok(pensionDoc.clauses.some(c => c.clauseId === "Rule 99"));

  const conductDoc = govDb.getDocumentById("DOC-ARTD-1965-02");
  assert.ok(conductDoc, "Conduct Rules document must exist");
  assert.equal(conductDoc.department, "ARTD");

  const assacDoc = govDb.getDocumentById("DOC-ASSAC-2024-06");
  assert.ok(assacDoc, "ASSAC Spatial policy document must exist");
  assert.equal(assacDoc.department, "ASSAC");
});

test("RAG query retrieves accurate answer with strict clause-level citations", () => {
  const res = govDb.queryKnowledgeBase({
    query: "What is the minimum qualifying service required for pension in Assam?",
    department: "PPGD",
    language: "en",
  });

  assert.equal(res.refusal, false);
  assert.ok(res.citations.length >= 1, "Must return at least 1 verified citation");
  assert.equal(res.citations[0].clauseId, "Rule 31");
  assert.ok(res.answer.includes("10 years"));
  assert.ok(res.groundednessScore >= 0.95);
  assert.equal(res.hallucinationRisk, "LOW");
});

test("Superannuation age query resolves to FR 56", () => {
  const res = govDb.queryKnowledgeBase({
    query: "At what age do Assam government employees retire under superannuation?",
    department: "ARTD",
    language: "en",
  });

  assert.equal(res.refusal, false);
  assert.ok(res.citations.some(c => c.clauseId.includes("FR 56")));
  assert.ok(res.answer.includes("sixty (60) years"));
});

test("Zero-hallucination guardrail: Refuses queries lacking authoritative source records", () => {
  const res = govDb.queryKnowledgeBase({
    query: "What is the subsidy rate for martian spacecraft fueling stations in Dispur?",
    department: null,
    language: "en",
  });

  assert.equal(res.refusal, true);
  assert.equal(res.citations.length, 0);
  assert.equal(res.hallucinationRisk, "REJECTED_UNGROUNDED");
  assert.ok(res.answer.includes("refuses to generate ungrounded claims") || res.answer.includes("No authoritative"));
});

test("Bilingual response returns authentic Assamese translation", () => {
  const res = govDb.queryKnowledgeBase({
    query: "What is the maximum limit for pension commutation?",
    department: "PPGD",
    language: "as",
  });

  assert.equal(res.refusal, false);
  assert.ok(res.citations.some(c => c.clauseId.includes("Rule 99")));
  assert.ok(res.answer.includes("৪০%"));
});

test("Government Notesheet & OM Drafter generates structured official formats", () => {
  const notesheet = govDb.generateDraft({
    docType: "NOTE_SHEET",
    subject: "Sanction of voluntary retirement under Rule 42",
    department: "PPGD",
    context: "Completed 28 years of qualifying service",
    officerDesignation: "Joint Secretary",
  });

  assert.ok(notesheet.body.includes("GOVERNMENT OF ASSAM"));
  assert.ok(notesheet.body.includes("SECRETARIAT NOTE-SHEET"));
  assert.ok(notesheet.body.includes("Joint Secretary"));

  const om = govDb.generateDraft({
    docType: "OFFICE_MEMORANDUM",
    subject: "Compliance with e-Tendering Thresholds",
    department: "FINANCE",
    context: "All directorates must adhere to ₹50 Lakhs open tender rule",
  });

  assert.ok(om.body.includes("OFFICE MEMORANDUM"));
  assert.ok(om.body.includes("By Order & in the Name of the Governor of Assam"));
});

test("Document Ingestion registers new OM with SHA-256 seal and searchable clauses", () => {
  const newDoc = govDb.addDocument({
    title: "Special Leave Concession for Flood Relief Deployment",
    titleAs: "বান সাহাৰ্য অভিযানৰ বাবে বিশেষ ছুটী ৰেহাই",
    department: "ARTD",
    content: "Special casual leave up to 15 days is granted to officers deployed in flood rescue operations under the Disaster Management Act.",
  });

  assert.ok(newDoc.id.startsWith("DOC-CUSTOM-"));
  assert.ok(newDoc.hash.length === 64);

  // Verify it is now searchable
  const searchRes = govDb.queryKnowledgeBase({
    query: "flood relief deployment special leave",
    department: "ARTD",
  });

  assert.equal(searchRes.refusal, false);
  assert.ok(searchRes.citations.some(c => c.title.includes("Flood Relief")));
});

test("Audit logging and RAG Triad benchmarks execute properly", () => {
  const logs = govDb.getAuditLogs(10);
  assert.ok(logs.length > 0);
  assert.ok(logs[0].groundednessScore >= 0.1);

  const bm = govDb.getBenchmarks();
  assert.ok(bm.totalQueriesTested >= 5);
  assert.equal(bm.passedCount, 5);
  assert.ok(bm.overallScore >= 0.95);
});
