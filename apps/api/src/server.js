import http from "node:http";
import { URL } from "node:url";
import { govDb } from "./db.js";
import { CHALLENGE_INFO, DEPARTMENTS, RULE_CATEGORIES, RBAC_ROLES } from "@nesfic/shared/constants.js";

const PORT = process.env.PORT || 4000;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(data, null, 2));
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

export const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    return res.end();
  }

  const reqUrl = new URL(req.url, `http://${req.headers.host || "localhost:4000"}`);
  const pathname = reqUrl.pathname;
  const method = req.method;

  try {
    // 1. Health check
    if (pathname === "/api/health" && method === "GET") {
      return sendJson(res, 200, {
        status: "ok",
        challenge: CHALLENGE_INFO.code,
        title: CHALLENGE_INFO.title,
        authority: CHALLENGE_INFO.authority,
        pilotPartners: ["AASC", "ARTD", "STCCD", "PPGD", "ASSAC"],
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Metadata / Taxonomies
    if (pathname === "/api/meta" && method === "GET") {
      return sendJson(res, 200, {
        challenge: CHALLENGE_INFO,
        departments: DEPARTMENTS,
        categories: RULE_CATEGORIES,
        roles: RBAC_ROLES,
      });
    }

    // 3. Document catalog
    if (pathname === "/api/documents" && method === "GET") {
      const dept = reqUrl.searchParams.get("department");
      const docs = govDb.getDocuments(dept);
      return sendJson(res, 200, {
        count: docs.length,
        departmentFilter: dept || "ALL",
        documents: docs,
      });
    }

    // 4. Single Document Detail
    if (pathname.startsWith("/api/documents/") && method === "GET") {
      const id = pathname.replace("/api/documents/", "");
      const doc = govDb.getDocumentById(id);
      if (!doc) {
        return sendJson(res, 404, { error: `Document ${id} not found in state archive` });
      }
      return sendJson(res, 200, doc);
    }

    // 5. Query / RAG Search with Strict Citations
    if (pathname === "/api/query" && method === "POST") {
      const body = await parseBody(req);
      const result = govDb.queryKnowledgeBase({
        query: body.query,
        department: body.department,
        language: body.language || "en",
      });
      return sendJson(res, 200, result);
    }

    // 6. Government Drafter
    if (pathname === "/api/draft" && method === "POST") {
      const body = await parseBody(req);
      const draft = govDb.generateDraft({
        docType: body.docType || "NOTE_SHEET",
        subject: body.subject,
        department: body.department,
        context: body.context,
        officerDesignation: body.officerDesignation,
        language: body.language || "en",
      });
      return sendJson(res, 200, draft);
    }

    // 7. Admin Ingestion
    if (pathname === "/api/admin/documents" && method === "POST") {
      const body = await parseBody(req);
      if (!body.title) {
        return sendJson(res, 400, { error: "Document title is required" });
      }
      const newDoc = govDb.addDocument(body);
      return sendJson(res, 201, {
        message: "Official document indexed with cryptographic SHA-256 seal",
        document: newDoc,
      });
    }

    // 8. Admin Audit Logs
    if (pathname === "/api/admin/audit-logs" && method === "GET") {
      const limit = parseInt(reqUrl.searchParams.get("limit") || "20", 10);
      const logs = govDb.getAuditLogs(limit);
      return sendJson(res, 200, {
        count: logs.length,
        logs,
      });
    }

    // 9. Admin Benchmarks
    if (pathname === "/api/admin/benchmarks" && method === "GET") {
      const benchmarkData = govDb.getBenchmarks();
      return sendJson(res, 200, benchmarkData);
    }

    // 10. Admin Stats
    if (pathname === "/api/admin/stats" && method === "GET") {
      const stats = govDb.getSystemStats();
      return sendJson(res, 200, stats);
    }

    return sendJson(res, 404, { error: "Endpoint not found", path: pathname });
  } catch (err) {
    console.error("API Error:", err);
    return sendJson(res, 500, { error: "Internal Server Error", message: err.message });
  }
});

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`🏛️ NESFIC-D-36 Decision Support API running at http://localhost:${PORT}`);
  });
}
