import http from "node:http";
import { URL } from "node:url";
import { db } from "./db.js";

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

const server = http.createServer(async (req, res) => {
  // Handle CORS Preflight
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
        service: "Assam Tea Value Chain Traceability Engine (NESFIC-I-08)",
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Growers list
    if (pathname === "/api/growers" && method === "GET") {
      return sendJson(res, 200, { success: true, data: db.growers });
    }

    // 3. Analytics (TRA Tocklai Command Center)
    if (pathname === "/api/analytics" && method === "GET") {
      return sendJson(res, 200, { success: true, data: db.getAnalytics() });
    }

    // 4. Batches list
    if (pathname === "/api/batches" && method === "GET") {
      const batches = db.getAllBatches();
      return sendJson(res, 200, { success: true, data: batches });
    }

    // 5. STG Harvest plucking creation
    if (pathname === "/api/batches/harvest" && method === "POST") {
      const body = await parseBody(req);
      if (!body.growerId || !body.estimatedWeightKg || !body.gps) {
        return sendJson(res, 400, {
          success: false,
          error: "Missing required fields: growerId, estimatedWeightKg, gps",
        });
      }
      const newBatch = db.createPlucking(body);
      return sendJson(res, 201, { success: true, data: newBatch });
    }

    // 6. Weighbridge collection receipt
    const weighbridgeMatch = pathname.match(/^\/api\/batches\/([^\/]+)\/weighbridge$/);
    if (weighbridgeMatch && method === "POST") {
      const batchId = decodeURIComponent(weighbridgeMatch[1]);
      const body = await parseBody(req);
      const updated = db.updateWeighbridge(batchId, body);
      if (!updated) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: updated });
    }

    // 7. Factory processing update
    const processMatch = pathname.match(/^\/api\/batches\/([^\/]+)\/process$/);
    if (processMatch && method === "POST") {
      const batchId = decodeURIComponent(processMatch[1]);
      const body = await parseBody(req);
      const updated = db.updateProcessing(batchId, body);
      if (!updated) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: updated });
    }

    // 8. Lab test MRL update
    const labMatch = pathname.match(/^\/api\/batches\/([^\/]+)\/lab-test$/);
    if (labMatch && method === "POST") {
      const batchId = decodeURIComponent(labMatch[1]);
      const body = await parseBody(req);
      const updated = db.updateLabTest(batchId, body);
      if (!updated) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: updated });
    }

    // 9. Auction transfer
    const auctionMatch = pathname.match(/^\/api\/batches\/([^\/]+)\/auction$/);
    if (auctionMatch && method === "POST") {
      const batchId = decodeURIComponent(auctionMatch[1]);
      const body = await parseBody(req);
      const updated = db.updateAuction(batchId, body);
      if (!updated) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: updated });
    }

    // 10. Packaging & QR code minting
    const packageMatch = pathname.match(/^\/api\/batches\/([^\/]+)\/package$/);
    if (packageMatch && method === "POST") {
      const batchId = decodeURIComponent(packageMatch[1]);
      const body = await parseBody(req);
      const updated = db.updatePackaging(batchId, body);
      if (!updated) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: updated });
    }

    // 11. Consumer Verification (QR / Batch ID lookup)
    const verifyMatch = pathname.match(/^\/api\/verify\/([^\/]+)$/);
    if (verifyMatch && method === "GET") {
      const token = decodeURIComponent(verifyMatch[1]);
      const batch = db.getBatchByQr(token);
      if (!batch) {
        return sendJson(res, 404, {
          success: false,
          error: "Invalid or unregistered Assam Tea QR code. Warning: Possible counterfeit.",
        });
      }
      return sendJson(res, 200, {
        success: true,
        verified: true,
        giCertified: batch.giTagAuthorized,
        certNumber: batch.giCertNumber,
        provenance: batch,
        tocklaiAuthenticationBadge: "VERIFIED_AUTHENTIC_ASSAM_TEA",
      });
    }

    // 12. Blockchain Merkle Anchor trigger
    if (pathname === "/api/blockchain/anchor" && method === "POST") {
      const anchor = db.createAnchor();
      return sendJson(res, 200, {
        success: true,
        message: "Merkle Root successfully computed and anchored to blockchain ledger",
        data: anchor,
      });
    }

    // 13. Simulated IoT Telemetry
    if (pathname === "/api/iot/telemetry" && method === "GET") {
      const telemetry = {
        factoryId: "FAC-JHT-01",
        sensors: [
          {
            chamber: "WITHERING_TROUGH_03",
            tempCelsius: +(24.5 + Math.random() * 2).toFixed(1),
            humidityPct: +(68 + Math.random() * 5).toFixed(1),
            airflowMps: 2.1,
            status: "OPTIMAL",
          },
          {
            chamber: "FERMENTATION_FLOOR_01",
            tempCelsius: +(28.2 + Math.random() * 1.5).toFixed(1),
            humidityPct: +(92 + Math.random() * 3).toFixed(1),
            oxidationTimeHrs: 2.4,
            status: "OPTIMAL",
          },
          {
            chamber: "DRYING_CHAMBER_VFBD",
            inletTempCelsius: +(115 + Math.random() * 3).toFixed(1),
            exhaustTempCelsius: +(58 + Math.random() * 2).toFixed(1),
            targetMoisturePct: 3.0,
            status: "ACTIVE_FIRING",
          },
        ],
        timestamp: new Date().toISOString(),
      };
      return sendJson(res, 200, { success: true, data: telemetry });
    }

    // 14. Single batch by ID
    const singleBatchMatch = pathname.match(/^\/api\/batches\/([^\/]+)$/);
    if (singleBatchMatch && method === "GET") {
      const batchId = decodeURIComponent(singleBatchMatch[1]);
      const batch = db.getBatchById(batchId);
      if (!batch) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: batch });
    }

    // Fallthrough 404
    return sendJson(res, 404, { success: false, error: "Endpoint not found" });
  } catch (error) {
    console.error("API error:", error);
    return sendJson(res, 500, { success: false, error: error.message || "Internal server error" });
  }
});

server.listen(PORT, () => {
  console.log(`🍵 NESFIC-I-08 Assam Tea Traceability API running on http://localhost:${PORT}`);
  console.log(`📡 Endpoints: /api/batches, /api/verify/:qrToken, /api/analytics, /api/iot/telemetry`);
});
