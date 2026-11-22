#!/usr/bin/env python3
"""
High-Impact 16:9 Widescreen Technological Framework Infographic Generator for NESFIC-D-36
Renders ultra-crisp, production-grade 16:9 widescreen (2752x1536) infographics
using Playwright and modern CSS3/SVG design systems matching the Data Centers masterwork style.
"""

import os
import sys
from playwright.sync_api import sync_playwright

ASSETS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'docs', 'assets'))
os.makedirs(ASSETS_DIR, exist_ok=True)

COMMON_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 2752px;
  height: 1536px;
  background-color: #FFFFFF;
  background-image: 
    radial-gradient(#CBD5E1 1.2px, transparent 1.2px),
    radial-gradient(#CBD5E1 1.2px, #F8FAFC 1.2px);
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #0F172A;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 48px 64px;
}

/* Blueprint Framing & Technical Registration Marks */
.frame-corner {
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: #0A192F;
}
.frame-tl { top: 24px; left: 24px; border-top: 3px solid #0A192F; border-left: 3px solid #0A192F; }
.frame-tr { top: 24px; right: 24px; border-top: 3px solid #0A192F; border-right: 3px solid #0A192F; }
.frame-bl { bottom: 24px; left: 24px; border-bottom: 3px solid #0A192F; border-left: 3px solid #0A192F; }
.frame-br { bottom: 24px; right: 24px; border-bottom: 3px solid #0A192F; border-right: 3px solid #0A192F; }

.frame-label-top {
  position: absolute;
  top: 26px;
  left: 64px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  letter-spacing: 2px;
  color: #64748B;
  font-weight: 600;
}
.frame-label-right {
  position: absolute;
  top: 26px;
  right: 64px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  letter-spacing: 2px;
  color: #64748B;
  font-weight: 600;
}

/* Header Component */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid #E2E8F0;
  padding-bottom: 24px;
  margin-bottom: 32px;
}
.header-badge-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.cat-badge {
  background: #0A192F;
  color: #F8FAFC;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 6px;
  letter-spacing: 1.5px;
}
.status-badge {
  background: #DCFCE7;
  color: #166534;
  border: 1px solid #86EFAC;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.status-dot {
  width: 8px;
  height: 8px;
  background: #16A34A;
  border-radius: 50%;
}
.main-title {
  font-size: 40px;
  font-weight: 900;
  color: #0A192F;
  letter-spacing: -0.5px;
  line-height: 1.15;
}
.main-subtitle {
  font-size: 20px;
  color: #475569;
  font-weight: 500;
  margin-top: 8px;
}

.header-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.gov-seal-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  font-weight: 700;
  color: #0A192F;
  letter-spacing: 1px;
}
.meta-chips {
  display: flex;
  gap: 10px;
}
.chip {
  background: #F1F5F9;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  font-family: 'JetBrains Mono', monospace;
}

/* Footer Metrics Bar */
.footer-metrics-bar {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0A192F;
  border-radius: 12px;
  padding: 18px 32px;
  color: #FFFFFF;
  box-shadow: 0 10px 25px -5px rgba(10, 25, 47, 0.2);
}
.footer-metric {
  display: flex;
  align-items: center;
  gap: 12px;
}
.metric-bullet {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.metric-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 800;
}
.metric-label {
  font-size: 14px;
  color: #94A3B8;
  font-weight: 500;
}
"""

def generate_figure_1():
    """Figure 1: Administrative Paradigm Shift (16:9 Widescreen)"""
    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{COMMON_CSS}

.content-grid {{
  display: grid;
  grid-template-columns: 1fr 140px 1fr;
  gap: 24px;
  align-items: stretch;
  flex: 1;
  margin-bottom: 24px;
}}

.column-card {{
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 10px 30px -5px rgba(0,0,0,0.06);
}}

.col-legacy {{
  background: #FFF5F5;
  border: 2px solid #FECACA;
}}
.col-target {{
  background: #F0FDF4;
  border: 2px solid #BBF7D0;
}}

.col-header {{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(0,0,0,0.08);
  margin-bottom: 24px;
}}
.col-title-group h2 {{
  font-size: 26px;
  font-weight: 800;
}}
.col-legacy h2 {{ color: #991B1B; }}
.col-target h2 {{ color: #166534; }}

.col-pill {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  letter-spacing: 1px;
}}
.col-legacy .col-pill {{ background: #FEE2E2; color: #991B1B; border: 1px solid #FCA5A5; }}
.col-target .col-pill {{ background: #DCFCE7; color: #15803D; border: 1px solid #86EFAC; }}

.card-stack {{
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}}

.item-card {{
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}}
.col-legacy .item-card {{ border-left: 5px solid #EF4444; }}
.col-target .item-card {{ border-left: 5px solid #10B981; }}

.item-title {{
  font-size: 18px;
  font-weight: 700;
  color: #0F172A;
  display: flex;
  align-items: center;
  gap: 10px;
}}
.item-desc {{
  font-size: 15px;
  color: #475569;
  line-height: 1.5;
}}
.item-tag {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  align-self: flex-start;
}}
.col-legacy .item-tag {{ background: #FEE2E2; color: #B91C1C; }}
.col-target .item-tag {{ background: #DCFCE7; color: #15803D; }}

/* Center Bridge */
.bridge-column {{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: relative;
}}
.bridge-line {{
  width: 4px;
  flex: 1;
  background: linear-gradient(180deg, #EF4444 0%, #3B82F6 50%, #10B981 100%);
  border-radius: 4px;
}}
.bridge-core {{
  width: 90px;
  height: 90px;
  background: #0A192F;
  border: 4px solid #F59E0B;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 30px rgba(245, 158, 11, 0.4);
  color: #FFFFFF;
  text-align: center;
}}
.bridge-core-title {{
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1px;
  color: #F59E0B;
}}
.bridge-core-sub {{
  font-size: 9px;
  color: #94A3B8;
  font-family: 'JetBrains Mono', monospace;
}}

.col-summary {{
  margin-top: 20px;
  padding: 16px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
}}
.col-legacy .col-summary {{ background: #FEE2E2; color: #991B1B; }}
.col-target .col-summary {{ background: #DCFCE7; color: #166534; }}
</style>
</head>
<body>
  <div class="frame-corner frame-tl"></div>
  <div class="frame-corner frame-tr"></div>
  <div class="frame-corner frame-bl"></div>
  <div class="frame-corner frame-br"></div>
  <div class="frame-label-top">SYSTEM ARCHITECTURE MATRIX // NESFIC-D-36</div>
  <div class="frame-label-right">DISPUR // GUWAHATI // ASSAM</div>

  <div class="header-container">
    <div>
      <div class="header-badge-row">
        <span class="cat-badge">PARADIGM SHIFT ANALYSIS</span>
        <span class="status-badge"><span class="status-dot"></span>VERIFIED FRAMEWORK</span>
      </div>
      <div class="main-title">ADMINISTRATIVE PARADIGM SHIFT: RED-TAPE TO RAG ENGINE</div>
      <div class="main-subtitle">From Fragmented Subjective Precedents to Verifiable Knowledge Graph & Deterministic Guardrails</div>
    </div>
    <div class="header-meta">
      <div class="gov-seal-text">GOVERNMENT OF ASSAM • AASC • ARTD</div>
      <div class="meta-chips">
        <span class="chip">DOC: AS-D36-FIG1</span>
        <span class="chip">SCALE: WIDESCREEN 16:9</span>
        <span class="chip">RELEASE: v2.4</span>
      </div>
    </div>
  </div>

  <div class="content-grid">
    <!-- Legacy Column -->
    <div class="column-card col-legacy">
      <div class="col-header">
        <div class="col-title-group">
          <h2>TRADITIONAL MANUAL GOVERNANCE</h2>
          <div style="font-size:14px; color:#7F1D1D; margin-top:4px;">Discretionary, Siloed & Fragmented Precedents</div>
        </div>
        <span class="col-pill">LEGACY BASELINE</span>
      </div>

      <div class="card-stack">
        <div class="item-card">
          <div class="item-title">
            <span>Physical Files & Fragmented Circulars</span>
          </div>
          <div class="item-desc">Rule notifications scattered across departmental cupboards, unindexed gazettes, and deteriorating physical dockets without search capability.</div>
          <span class="item-tag">High Friction • High Search Cost</span>
        </div>

        <div class="item-card">
          <div class="item-title">
            <span>Discretionary Subjective Delays</span>
          </div>
          <div class="item-desc">Average file turnaround between 18 to 45 business days per pension or disciplinary file movement across Secretariat directorates.</div>
          <span class="item-tag">18-45 Days Latency • Bottleneck Prone</span>
        </div>

        <div class="item-card">
          <div class="item-title">
            <span>Ambiguous Rule Interpretations</span>
          </div>
          <div class="item-desc">Contradictory rulings between Finance and P&PGD on qualifying service and commuted value calculations leading to extensive High Court litigation.</div>
          <span class="item-tag">22-38% Legal Exposure • Non-Uniform</span>
        </div>

        <div class="item-card">
          <div class="item-title">
            <span>Manual Secretariat Drafting</span>
          </div>
          <div class="item-desc">Inconsistent note-sheet formatting, human error in statutory clause recitals, margin violations failing Manual of Office Procedure standards.</div>
          <span class="item-tag">Manual Fatigue • Paper Audit Trail</span>
        </div>
      </div>

      <div class="col-summary">
        <span>AVG LATENCY: 28 DAYS</span>
        <span>ERROR EXPOSURE: 32%</span>
        <span>AUDITABILITY: MANUAL</span>
      </div>
    </div>

    <!-- Center Bridge -->
    <div class="bridge-column">
      <div class="bridge-line"></div>
      <div class="bridge-core">
        <div class="bridge-core-title">NESFIC</div>
        <div class="bridge-core-title" style="font-size:16px;">AI RAG</div>
        <div class="bridge-core-sub">ENGINE</div>
      </div>
      <div class="bridge-line"></div>
    </div>

    <!-- Modern Column -->
    <div class="column-card col-target">
      <div class="col-header">
        <div class="col-title-group">
          <h2>NESFIC-D-36 SMART GOVERNANCE</h2>
          <div style="font-size:14px; color:#14532D; margin-top:4px;">Verifiable Knowledge Core & Deterministic Guardrails</div>
        </div>
        <span class="col-pill">AI-POWERED TARGET</span>
      </div>

      <div class="card-stack">
        <div class="item-card">
          <div class="item-title">
            <span>Unified Digital Knowledge Graph</span>
          </div>
          <div class="item-desc">12+ Assam Codes, Acts, and Service Manuals ingested at clause-level with hierarchical semantic relationships and Gazette cross-references.</div>
          <span class="item-tag">Single Source of Truth • Sub-85ms</span>
        </div>

        <div class="item-card">
          <div class="item-title">
            <span>Sub-85ms Verifiable Retrieval</span>
          </div>
          <div class="item-desc">High-speed vector similarity coupled with BM25 lexical keyword ranking, delivering verbatim clause text and gazette citation cards instantly.</div>
          <span class="item-tag">Instant Access • Exact Gazette Citations</span>
        </div>

        <div class="item-card">
          <div class="item-title">
            <span>Zero-Hallucination Guardrail Engine</span>
          </div>
          <div class="item-desc">Deterministic factual verification layer rejecting ungrounded assumptions; guarantees 100% adherence to Assam Pension and Conduct Rules.</div>
          <span class="item-tag">0.00% Hallucination • 99.4% Precision</span>
        </div>

        <div class="item-card">
          <div class="item-title">
            <span>Automated MOP & Bilingual Note-Sheets</span>
          </div>
          <div class="item-desc">Precision drafting complying strictly with 2.5-inch Secretariat left margins, standard four-part note structures, and dual Assamese/English rendering.</div>
          <span class="item-tag">MOP 2.5" Margin • English & অসমীয়া</span>
        </div>
      </div>

      <div class="col-summary">
        <span>QUERY LATENCY: 85ms</span>
        <span>FACTUAL PRECISION: 99.4%</span>
        <span>AUDITABILITY: 100% SHA-256</span>
      </div>
    </div>
  </div>

  <div class="footer-metrics-bar">
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#10B981;"></div>
      <div>
        <div class="metric-val">99.4%</div>
        <div class="metric-label">Factual Grounding</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#3B82F6;"></div>
      <div>
        <div class="metric-val">0.00%</div>
        <div class="metric-label">Hallucination Rate</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#F59E0B;"></div>
      <div>
        <div class="metric-val">&lt;85 ms</div>
        <div class="metric-label">Edge Query Latency</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#8B5CF6;"></div>
      <div>
        <div class="metric-val">MOP 2.5"</div>
        <div class="metric-label">Secretariat Margin Certified</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#EC4899;"></div>
      <div>
        <div class="metric-val">SHA-256</div>
        <div class="metric-label">Merkle Audit Trail</div>
      </div>
    </div>
  </div>
</body>
</html>"""
    return html

def generate_figure_2():
    """Figure 2: Assam Administrative Rules Knowledge Graph & Clause Ontology (16:9 Widescreen)"""
    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{COMMON_CSS}

.pillars-grid {{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  flex: 1;
  margin-bottom: 24px;
}}

.pillar-card {{
  background: #FFFFFF;
  border-radius: 16px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
  border: 2px solid #E2E8F0;
}}

.p-green {{ border-top: 8px solid #10B981; }}
.p-blue {{ border-top: 8px solid #2563EB; }}
.p-amber {{ border-top: 8px solid #F59E0B; }}
.p-cyan {{ border-top: 8px solid #06B6D4; }}

.pillar-header {{
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 18px;
  border-bottom: 2px solid #F1F5F9;
  margin-bottom: 20px;
}}
.pillar-badge {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  align-self: flex-start;
}}
.p-green .pillar-badge {{ background: #DCFCE7; color: #15803D; }}
.p-blue .pillar-badge {{ background: #DBEAFE; color: #1E40AF; }}
.p-amber .pillar-badge {{ background: #FEF3C7; color: #B45309; }}
.p-cyan .pillar-badge {{ background: #CFFAFE; color: #0E7490; }}

.pillar-title {{
  font-size: 22px;
  font-weight: 800;
  color: #0A192F;
}}
.pillar-source {{
  font-size: 14px;
  color: #64748B;
  font-weight: 500;
}}

.clauses-list {{
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}}
.clause-item {{
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}}
.clause-top {{
  display: flex;
  justify-content: space-between;
  align-items: center;
}}
.clause-id {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #0A192F;
}}
.clause-type {{
  font-size: 11px;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  color: #64748B;
  text-transform: uppercase;
}}
.clause-desc {{
  font-size: 13.5px;
  color: #334155;
  line-height: 1.4;
}}

.pillar-footer {{
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px dashed #CBD5E1;
  display: flex;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #64748B;
  font-weight: 600;
}}
</style>
</head>
<body>
  <div class="frame-corner frame-tl"></div>
  <div class="frame-corner frame-tr"></div>
  <div class="frame-corner frame-bl"></div>
  <div class="frame-corner frame-br"></div>
  <div class="frame-label-top">ONTOLOGY CLUSTER SPECIFICATION // AS-KG-2026</div>
  <div class="frame-label-right">SEMANTIC GRAPH • DISPUR KNOWLEDGE CORE</div>

  <div class="header-container">
    <div>
      <div class="header-badge-row">
        <span class="cat-badge">KNOWLEDGE GRAPH TAXONOMY</span>
        <span class="status-badge"><span class="status-dot"></span>CLAUSE-LEVEL ONTOLOGY</span>
      </div>
      <div class="main-title">ASSAM ADMINISTRATIVE RULES KNOWLEDGE GRAPH</div>
      <div class="main-subtitle">Hierarchical Semantic Decomposition: From Statutory Gazette Enactments to Verifiable Chunks</div>
    </div>
    <div class="header-meta">
      <div class="gov-seal-text">GOVERNMENT OF ASSAM • STATUTORY TAXONOMY</div>
      <div class="meta-chips">
        <span class="chip">DOC: AS-D36-FIG2</span>
        <span class="chip">GRAPH NODES: 14,820+</span>
        <span class="chip">RELATIONS: 42,600+</span>
      </div>
    </div>
  </div>

  <div class="pillars-grid">
    <!-- Pillar 1 -->
    <div class="pillar-card p-green">
      <div class="pillar-header">
        <span class="pillar-badge">DOMAIN PILLAR 1</span>
        <div class="pillar-title">PENSIONS & RETIREMENT</div>
        <div class="pillar-source">Assam Services (Pension) Rules, 1969</div>
      </div>
      <div class="clauses-list">
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">Rule 31</span>
            <span class="clause-type">Statutory Mandate</span>
          </div>
          <div class="clause-desc">Qualifying service criteria, interruption condonation, and counting of temporary work-charged service.</div>
        </div>
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">Rule 99</span>
            <span class="clause-type">Financial Formula</span>
          </div>
          <div class="clause-desc">Commutation of pension up to 40% maximum; commuted value multipliers based on next birthday age.</div>
        </div>
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">Rule 138 & 143</span>
            <span class="clause-type">Death Benefits</span>
          </div>
          <div class="clause-desc">Death-cum-Retirement Gratuity (DCRG) calculation; family pension entitlement tables and nominee heir ranking.</div>
        </div>
      </div>
      <div class="pillar-footer">
        <span>AUTHORITY: P&PGD</span>
        <span>CHUNKS: 4,120</span>
      </div>
    </div>

    <!-- Pillar 2 -->
    <div class="pillar-card p-blue">
      <div class="pillar-header">
        <span class="pillar-badge">DOMAIN PILLAR 2</span>
        <div class="pillar-title">CONDUCT & DISCIPLINE</div>
        <div class="pillar-source">Assam Services (Conduct) Rules, 1965</div>
      </div>
      <div class="clauses-list">
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">Rule 3</span>
            <span class="clause-type">Core Standard</span>
          </div>
          <div class="clause-desc">Maintenance of absolute integrity, devotion to duty, and conduct befitting a civil servant in public administration.</div>
        </div>
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">Rule 9 & 11</span>
            <span class="clause-type">Private Trade</span>
          </div>
          <div class="clause-desc">Prohibition against unauthorized commercial enterprise, secondary employment, and receipt of gifts/honorariums.</div>
        </div>
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">Rule 15</span>
            <span class="clause-type">Asset Declaration</span>
          </div>
          <div class="clause-desc">Mandatory statutory declaration of movable/immovable assets; prior sanction requirements for land transactions.</div>
        </div>
      </div>
      <div class="pillar-footer">
        <span>AUTHORITY: ARTD / VIGILANCE</span>
        <span>CHUNKS: 3,450</span>
      </div>
    </div>

    <!-- Pillar 3 -->
    <div class="pillar-card p-amber">
      <div class="pillar-header">
        <span class="pillar-badge">DOMAIN PILLAR 3</span>
        <div class="pillar-title">SERVICE & SECRETARIAT</div>
        <div class="pillar-source">FR & SR + Manual of Office Procedure (MOP)</div>
      </div>
      <div class="clauses-list">
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">FR 56(a)</span>
            <span class="clause-type">Superannuation</span>
          </div>
          <div class="clause-desc">Statutory retirement on reaching 60 years of age on afternoon of final calendar month day.</div>
        </div>
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">MOP Paras 24-48</span>
            <span class="clause-type">Note-Sheet Standard</span>
          </div>
          <div class="clause-desc">Strict 2.5-inch left margin docketing protocol; four-tier hierarchy: Statement, Recital, Analysis, Prayer.</div>
        </div>
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">APPR 2020</span>
            <span class="clause-type">Procurement</span>
          </div>
          <div class="clause-desc">Assam Public Procurement Rules 2020: e-Procurement thresholds, tender evaluation committees, and RFP guidelines.</div>
        </div>
      </div>
      <div class="pillar-footer">
        <span>AUTHORITY: FINANCE DEPT</span>
        <span>CHUNKS: 5,280</span>
      </div>
    </div>

    <!-- Pillar 4 -->
    <div class="pillar-card p-cyan">
      <div class="pillar-header">
        <span class="pillar-badge">DOMAIN PILLAR 4</span>
        <div class="pillar-title">SPATIAL & EMERGING</div>
        <div class="pillar-source">ASSAC Drone SOPs & Spatial Regulations</div>
      </div>
      <div class="clauses-list">
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">SOP-01</span>
            <span class="clause-type">Flood Reconnaissance</span>
          </div>
          <div class="clause-desc">UAV aerial inundation survey protocols for Brahmaputra and Barak river basin flash floods.</div>
        </div>
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">SOP-03</span>
            <span class="clause-type">Embankment Breach</span>
          </div>
          <div class="clause-desc">Sub-meter orthomosaic mapping of dyke erosion, geo-spatial tagging, and emergency relief routing.</div>
        </div>
        <div class="clause-item">
          <div class="clause-top">
            <span class="clause-id">SOP-07</span>
            <span class="clause-type">Damage Assessment</span>
          </div>
          <div class="clause-desc">Post-disaster agricultural and infrastructure loss computation in coordination with ASDMA and Revenue Dept.</div>
        </div>
      </div>
      <div class="pillar-footer">
        <span>AUTHORITY: ASSAC / STCCD</span>
        <span>CHUNKS: 1,970</span>
      </div>
    </div>
  </div>

  <div class="footer-metrics-bar">
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#10B981;"></div>
      <div>
        <div class="metric-val">100%</div>
        <div class="metric-label">Statutory Coverage</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#3B82F6;"></div>
      <div>
        <div class="metric-val">500 Tokens</div>
        <div class="metric-label">Semantic Chunk Window</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#F59E0B;"></div>
      <div>
        <div class="metric-val">768-Dim</div>
        <div class="metric-label">Vector Embedding Model</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#8B5CF6;"></div>
      <div>
        <div class="metric-val">Bilingual</div>
        <div class="metric-label">English + Assamese Cross-Lingual</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#EC4899;"></div>
      <div>
        <div class="metric-val">Dynamic</div>
        <div class="metric-label">Live Gazette Ingestion Pipeline</div>
      </div>
    </div>
  </div>
</body>
</html>"""
    return html

def generate_figure_3():
    """Figure 3: Enterprise Cloud & Edge Hybrid Solution Architecture (16:9 Widescreen)"""
    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{COMMON_CSS}

.arch-tiers-stack {{
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  margin-bottom: 24px;
}}

.arch-tier {{
  background: #FFFFFF;
  border-radius: 12px;
  border: 2px solid #E2E8F0;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}}

.tier-label-box {{
  width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 18px;
  border-right: 2px solid #F1F5F9;
}}
.tier-tag {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 3px 8px;
  border-radius: 4px;
  align-self: flex-start;
}}
.tier-name {{
  font-size: 17px;
  font-weight: 800;
  color: #0A192F;
}}

.tier-blocks {{
  display: flex;
  flex: 1;
  gap: 16px;
}}

.arch-block {{
  flex: 1;
  background: #F8FAFC;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}}
.block-title {{
  font-size: 14px;
  font-weight: 700;
  color: #0F172A;
  display: flex;
  justify-content: space-between;
}}
.block-badge {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
}}
.block-desc {{
  font-size: 12.5px;
  color: #475569;
  line-height: 1.35;
}}

.t1 .tier-tag {{ background: #DBEAFE; color: #1E40AF; }}
.t2 .tier-tag {{ background: #CFFAFE; color: #0E7490; }}
.t3 .tier-tag {{ background: #DCFCE7; color: #15803D; }}
.t4 .tier-tag {{ background: #FEF3C7; color: #B45309; }}
.t5 .tier-tag {{ background: #EDE9FE; color: #6D28D9; }}

.t1 {{ border-left: 6px solid #2563EB; }}
.t2 {{ border-left: 6px solid #06B6D4; }}
.t3 {{ border-left: 6px solid #10B981; }}
.t4 {{ border-left: 6px solid #F59E0B; }}
.t5 {{ border-left: 6px solid #8B5CF6; }}
</style>
</head>
<body>
  <div class="frame-corner frame-tl"></div>
  <div class="frame-corner frame-tr"></div>
  <div class="frame-corner frame-bl"></div>
  <div class="frame-corner frame-br"></div>
  <div class="frame-label-top">ENTERPRISE CLOUD ARCHITECTURE // NESFIC-D-36</div>
  <div class="frame-label-right">HYBRID CLOUD & SDC EDGE TOPOLOGY</div>

  <div class="header-container">
    <div>
      <div class="header-badge-row">
        <span class="cat-badge">SOLUTION ARCHITECTURE</span>
        <span class="status-badge"><span class="status-dot"></span>PRODUCTION EDGE HYBRID</span>
      </div>
      <div class="main-title">ENTERPRISE CLUSTER & EDGE HYBRID SOLUTION ARCHITECTURE</div>
      <div class="main-subtitle">5-Tier GovStack Blueprint: From Client Experience to State Data Centre Infrastructure</div>
    </div>
    <div class="header-meta">
      <div class="gov-seal-text">GOVERNMENT OF ASSAM • HYBRID EDGE STACK</div>
      <div class="meta-chips">
        <span class="chip">DOC: AS-D36-FIG3</span>
        <span class="chip">UPTIME: 99.99%</span>
        <span class="chip">EDGE POP: GUWAHATI</span>
      </div>
    </div>
  </div>

  <div class="arch-tiers-stack">
    <!-- Tier 1 -->
    <div class="arch-tier t1">
      <div class="tier-label-box">
        <span class="tier-tag">TIER 1</span>
        <div class="tier-name">PRESENTATION & CLIENT EXPERIENCE</div>
      </div>
      <div class="tier-blocks">
        <div class="arch-block">
          <div class="block-title">
            <span>Bilingual Assistant UI</span>
            <span class="block-badge" style="background:#DBEAFE; color:#1E40AF;">SPA / PWA</span>
          </div>
          <div class="block-desc">Responsive Vanilla ES6+ client with zero framework overhead; instant Assamese/English toggle.</div>
        </div>
        <div class="arch-block">
          <div class="block-title">
            <span>Note-Sheet Drafter</span>
            <span class="block-badge" style="background:#DBEAFE; color:#1E40AF;">MOP ENGINE</span>
          </div>
          <div class="block-desc">2.5-inch left margin Secretariat canvas rendering official docket recitals and sign-off hierarchies.</div>
        </div>
        <div class="arch-block">
          <div class="block-title">
            <span>Document Explorer</span>
            <span class="block-badge" style="background:#DBEAFE; color:#1E40AF;">GRAPH VIEW</span>
          </div>
          <div class="block-desc">Interactive rule browser mapping statutory inter-relationships between Pension, Conduct, and FR/SR.</div>
        </div>
        <div class="arch-block">
          <div class="block-title">
            <span>Admin Control Panel</span>
            <span class="block-badge" style="background:#DBEAFE; color:#1E40AF;">RBAC V2</span>
          </div>
          <div class="block-desc">Live RAG Triad benchmark suite, ingestion management, user roles, and tamper-proof audit viewer.</div>
        </div>
      </div>
    </div>

    <!-- Tier 2 -->
    <div class="arch-tier t2">
      <div class="tier-label-box">
        <span class="tier-tag">TIER 2</span>
        <div class="tier-name">EDGE SECURITY & ROUTING</div>
      </div>
      <div class="tier-blocks">
        <div class="arch-block">
          <div class="block-title">
            <span>Cloudflare Edge Network</span>
            <span class="block-badge" style="background:#CFFAFE; color:#0E7490;">GLOBAL / GHY</span>
          </div>
          <div class="block-desc">Anycast DNS with sub-10ms ingress at Guwahati POP; automated TLS 1.3 encryption and Brotli compression.</div>
        </div>
        <div class="arch-block">
          <div class="block-title">
            <span>State SDC VPN Gateway</span>
            <span class="block-badge" style="background:#CFFAFE; color:#0E7490;">IPSec / mTLS</span>
          </div>
          <div class="block-desc">Secure dedicated tunnel linking edge nodes to Dispur State Data Centre for internal e-Office data sync.</div>
        </div>
        <div class="arch-block">
          <div class="block-title">
            <span>WAF & DDoS Mitigation</span>
            <span class="block-badge" style="background:#CFFAFE; color:#0E7490;">ZERO-TRUST</span>
          </div>
          <div class="block-desc">OWASP Top 10 rule shielding, dynamic rate limiting (100 req/min/IP), and strict geo-fencing (IN-AS).</div>
        </div>
      </div>
    </div>

    <!-- Tier 3 -->
    <div class="arch-tier t3">
      <div class="tier-label-box">
        <span class="tier-tag">TIER 3</span>
        <div class="tier-name">APPLICATION & INFERENCE ENGINE</div>
      </div>
      <div class="tier-blocks">
        <div class="arch-block">
          <div class="block-title">
            <span>Serverless Edge Workers</span>
            <span class="block-badge" style="background:#DCFCE7; color:#15803D;">V8 ISOLATES</span>
          </div>
          <div class="block-desc">Stateless high-concurrency Node.js execution with 0ms cold starts across distributed edge nodes.</div>
        </div>
        <div class="arch-block">
          <div class="block-title">
            <span>Query Transformation</span>
            <span class="block-badge" style="background:#DCFCE7; color:#15803D;">EN / AS</span>
          </div>
          <div class="block-desc">Bilingual tokenization, administrative stop-word removal, and rule keyword boosting (Rule 99, FR 56).</div>
        </div>
        <div class="arch-block">
          <div class="block-title">
            <span>Zero-Hallucination Guardrail</span>
            <span class="block-badge" style="background:#DCFCE7; color:#15803D;">NLI VERIFIER</span>
          </div>
          <div class="block-desc">Strict deterministic cross-examination rejecting any output lacking verbatim statutory grounding.</div>
        </div>
      </div>
    </div>

    <!-- Tier 4 -->
    <div class="arch-tier t4">
      <div class="tier-label-box">
        <span class="tier-tag">TIER 4</span>
        <div class="tier-name">KNOWLEDGE CORE & VECTOR DB</div>
      </div>
      <div class="tier-blocks">
        <div class="arch-block">
          <div class="block-title">
            <span>HNSW Vector Index</span>
            <span class="block-badge" style="background:#FEF3C7; color:#B45309;">768-DIM</span>
          </div>
          <div class="block-desc">Hierarchical Navigable Small World graph for sub-85ms approximate nearest neighbor embedding retrieval.</div>
        </div>
        <div class="arch-block">
          <div class="block-title">
            <span>Lexical BM25 Search</span>
            <span class="block-badge" style="background:#FEF3C7; color:#B45309;">EXACT MATCH</span>
          </div>
          <div class="block-desc">Deterministic keyword scoring ensuring exact clause numbers and statutory legal names rank top.</div>
        </div>
        <div class="arch-block">
          <div class="block-title">
            <span>Statutory Knowledge Store</span>
            <span class="block-badge" style="background:#FEF3C7; color:#B45309;">GAZETTES</span>
          </div>
          <div class="block-desc">Official Gazette corpus, Pension Rules 1969, Conduct Rules 1965, FR & SR, and ASSAC Drone SOPs.</div>
        </div>
      </div>
    </div>

    <!-- Tier 5 -->
    <div class="arch-tier t5">
      <div class="tier-label-box">
        <span class="tier-tag">TIER 5</span>
        <div class="tier-name">GOVERNANCE & MERKLE AUDIT</div>
      </div>
      <div class="tier-blocks">
        <div class="arch-block">
          <div class="block-title">
            <span>Cryptographic Merkle Tree</span>
            <span class="block-badge" style="background:#EDE9FE; color:#6D28D9;">SHA-256</span>
          </div>
          <div class="block-desc">Every query, retrieved clause, and generated draft hashed into an immutable append-only ledger.</div>
        </div>
        <div class="arch-block">
          <div class="block-title">
            <span>5-Tier Enterprise RBAC</span>
            <span class="block-badge" style="background:#EDE9FE; color:#6D28D9;">GOV ROLES</span>
          </div>
          <div class="block-desc">Granular access control: Viewer, Officer, Drafter, Legal Approver, and System Administrator.</div>
        </div>
        <div class="arch-block">
          <div class="block-title">
            <span>SDC On-Premise Air-Gap</span>
            <span class="block-badge" style="background:#EDE9FE; color:#6D28D9;">SOVEREIGN</span>
          </div>
          <div class="block-desc">Full containerized deployment capability for air-gapped sovereign execution at Assam SDC Dispur.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-metrics-bar">
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#10B981;"></div>
      <div>
        <div class="metric-val">Tier IV Ready</div>
        <div class="metric-label">Infrastructure SLA</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#3B82F6;"></div>
      <div>
        <div class="metric-val">&lt;85 ms</div>
        <div class="metric-label">End-to-End Latency</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#F59E0B;"></div>
      <div>
        <div class="metric-val">100%</div>
        <div class="metric-label">Data Sovereignty (IN-AS)</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#8B5CF6;"></div>
      <div>
        <div class="metric-val">TLS 1.3 + mTLS</div>
        <div class="metric-label">Transit Cryptography</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#EC4899;"></div>
      <div>
        <div class="metric-val">AES-256-GCM</div>
        <div class="metric-label">At-Rest Encryption</div>
      </div>
    </div>
  </div>
</body>
</html>"""
    return html

def generate_figure_4():
    """Wireframe 1: Bilingual Knowledge & Rule Assistant UI/UX (16:9 Widescreen)"""
    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{COMMON_CSS}

.ui-frame {{
  background: #FFFFFF;
  border: 2px solid #CBD5E1;
  border-radius: 14px;
  flex: 1;
  display: flex;
  overflow: hidden;
  box-shadow: 0 15px 35px -5px rgba(0,0,0,0.08);
  margin-bottom: 24px;
}}

/* Left Sidebar */
.ui-sidebar {{
  width: 320px;
  background: #0A192F;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
  border-right: 2px solid #1E293B;
  flex-shrink: 0;
}}
.sidebar-brand {{
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid #1E293B;
  margin-bottom: 20px;
}}
.sidebar-logo {{
  width: 38px;
  height: 38px;
  background: #F59E0B;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: #0A192F;
}}
.sidebar-menu {{
  display: flex;
  flex-direction: column;
  gap: 8px;
}}
.menu-item {{
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #94A3B8;
  display: flex;
  align-items: center;
  gap: 10px;
}}
.menu-item.active {{
  background: #1E3A8A;
  color: #FFFFFF;
}}
.sidebar-filters {{
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid #1E293B;
  display: flex;
  flex-direction: column;
  gap: 8px;
}}
.filter-title {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: #64748B;
  text-transform: uppercase;
}}
.filter-pill {{
  font-size: 12.5px;
  color: #CBD5E1;
  display: flex;
  align-items: center;
  gap: 8px;
}}

/* Main Chat Canvas */
.ui-canvas {{
  flex: 1;
  background: #F8FAFC;
  display: flex;
  flex-direction: column;
  padding: 28px 36px;
  overflow: hidden;
}}
.canvas-header {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: 20px;
}}
.user-profile {{
  display: flex;
  align-items: center;
  gap: 10px;
}}
.user-avatar {{
  width: 36px;
  height: 36px;
  background: #DBEAFE;
  color: #1E40AF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}}
.lang-switch {{
  display: flex;
  background: #E2E8F0;
  border-radius: 6px;
  padding: 2px;
}}
.lang-btn {{
  padding: 6px 14px;
  border-radius: 5px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
}}
.lang-btn.active {{
  background: #0A192F;
  color: #FFFFFF;
}}

.chat-thread {{
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}}
.bubble-user {{
  align-self: flex-end;
  background: #0A192F;
  color: #FFFFFF;
  padding: 16px 20px;
  border-radius: 14px 14px 2px 14px;
  max-width: 70%;
  font-size: 15px;
  line-height: 1.45;
}}
.bubble-ai {{
  align-self: flex-start;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  padding: 20px 24px;
  border-radius: 14px 14px 14px 2px;
  max-width: 85%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
}}
.ai-answer {{
  font-size: 15px;
  line-height: 1.5;
  color: #0F172A;
}}
.citation-box {{
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-left: 4px solid #16A34A;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}}
.citation-title {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: #166534;
}}
.citation-text {{
  font-size: 13.5px;
  color: #1F2937;
  font-style: italic;
}}
.assamese-trans {{
  font-size: 14px;
  color: #1E3A8A;
  background: #EFF6FF;
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid #BFDBFE;
}}

/* Right Diagnostics Drawer */
.ui-diagnostics {{
  width: 320px;
  background: #FFFFFF;
  border-left: 2px solid #E2E8F0;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-shrink: 0;
}}
.diag-title {{
  font-size: 16px;
  font-weight: 800;
  color: #0A192F;
  padding-bottom: 10px;
  border-bottom: 1px solid #F1F5F9;
}}
.metric-row {{
  display: flex;
  justify-content: space-between;
  align-items: center;
}}
.m-label {{ font-size: 13px; color: #64748B; font-weight: 600; }}
.m-val {{ font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 700; color: #0A192F; }}
.progress-bar {{
  height: 8px;
  background: #E2E8F0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 4px;
}}
.progress-fill {{
  height: 100%;
  background: #10B981;
  border-radius: 4px;
}}
</style>
</head>
<body>
  <div class="frame-corner frame-tl"></div>
  <div class="frame-corner frame-tr"></div>
  <div class="frame-corner frame-bl"></div>
  <div class="frame-corner frame-br"></div>
  <div class="frame-label-top">USER EXPERIENCE PROTOTYPE // WIREFRAME 01</div>
  <div class="frame-label-right">BILINGUAL DECISION INTERFACE // NESFIC-D-36</div>

  <div class="header-container">
    <div>
      <div class="header-badge-row">
        <span class="cat-badge">UI/UX PROTOTYPE SPECIFICATION</span>
        <span class="status-badge"><span class="status-dot"></span>LIVE CLIENT CANVAS</span>
      </div>
      <div class="main-title">BILINGUAL KNOWLEDGE & RULE ASSISTANT: UI/UX ARCHITECTURE</div>
      <div class="main-subtitle">Dual-Language Querying, Verifiable Statutory Citations & Secretariat Confidence Metrics</div>
    </div>
    <div class="header-meta">
      <div class="gov-seal-text">GOVERNMENT OF ASSAM • DECISION SUPPORT SYSTEM</div>
      <div class="meta-chips">
        <span class="chip">DOC: AS-D36-WF1</span>
        <span class="chip">VIEW: CLIENT DASHBOARD</span>
        <span class="chip">LOCALIZATION: en_IN / as_IN</span>
      </div>
    </div>
  </div>

  <div class="ui-frame">
    <!-- Sidebar -->
    <div class="ui-sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-logo">AS</div>
        <div>
          <div style="font-weight:800; font-size:15px;">ASSAM GOVSTACK</div>
          <div style="font-size:11px; color:#94A3B8;">Decision Support System</div>
        </div>
      </div>
      <div class="sidebar-menu">
        <div class="menu-item active">● Knowledge Assistant</div>
        <div class="menu-item">○ Secretariat Note Drafter</div>
        <div class="menu-item">○ Rules Explorer (Graph)</div>
        <div class="menu-item">○ ASSAC Spatial SOPs</div>
        <div class="menu-item">○ RAG Triad Benchmarks</div>
      </div>
      <div class="sidebar-filters">
        <span class="filter-title">ACTIVE REPOSITORIES</span>
        <div class="filter-pill">☑ Assam Pension Rules 1969</div>
        <div class="filter-pill">☑ Assam Conduct Rules 1965</div>
        <div class="filter-pill">☑ Fundamental Rules & SR</div>
        <div class="filter-pill">☑ Secretariat MOP Standards</div>
        <div class="filter-pill">☑ APPR Procurement 2020</div>
      </div>
    </div>

    <!-- Main Canvas -->
    <div class="ui-canvas">
      <div class="canvas-header">
        <div class="user-profile">
          <div class="user-avatar">RH</div>
          <div>
            <div style="font-weight:700; font-size:14px; color:#0A192F;">Ron Hatibaruah (Sr. Assistant)</div>
            <div style="font-size:12px; color:#64748B;">Pension & Public Grievances Dept • Dispur</div>
          </div>
        </div>
        <div class="lang-switch">
          <div class="lang-btn active">English</div>
          <div class="lang-btn">অসমীয়া</div>
        </div>
      </div>

      <div class="chat-thread">
        <div class="bubble-user">
          Can an employee facing departmental inquiry receive provisional pension, and what is the maximum commuted value permissible under Rule 99?
        </div>

        <div class="bubble-ai">
          <div class="ai-answer">
            Under <strong>Assam Services (Pension) Rules, 1969</strong>, a government servant against whom departmental or judicial proceedings are pending is entitled to <strong>Provisional Pension</strong> under <em>Rule 22</em>, but cannot commute any portion until the final conclusion of proceedings. Upon final exoneration, maximum commutable value is <strong>40%</strong> under <em>Rule 99</em>.
          </div>

          <div class="citation-box">
            <div class="citation-title">STATUTORY CITATION: Assam Services (Pension) Rules, 1969 — Rule 99(1)</div>
            <div class="citation-text">"A Government servant shall be entitled to commute for a lump sum payment any portion, consisting of whole rupees, not exceeding forty per cent of the pension which has been or may be granted to him..."</div>
          </div>

          <div class="assamese-trans">
            <strong>অসমীয়া অনুবাদ:</strong> অসম সেৱা (পেনশন) বিধি, ১৯৬৯ ৰ নিয়ম ৯৯(১) অনুসৰি, এজন চৰকাৰী কৰ্মচাৰীয়ে তেওঁৰ মঞ্জুৰ হোৱা পেঞ্চনৰ সৰ্বাধিক ৪০% লৈকে এককালীন ধন হিচাপে পৰিৱৰ্তন (commute) কৰিবলৈ যোগ্য হ'ব।
          </div>
        </div>
      </div>
    </div>

    <!-- Right Diagnostics -->
    <div class="ui-diagnostics">
      <div class="diag-title">VERIFICATION ENGINE</div>
      <div>
        <div class="metric-row">
          <span class="m-label">Factual Grounding</span>
          <span class="m-val">99.4%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:99.4%;"></div></div>
      </div>
      <div>
        <div class="metric-row">
          <span class="m-label">Context Relevance</span>
          <span class="m-val">0.98 / 1.0</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:98%;"></div></div>
      </div>
      <div>
        <div class="metric-row">
          <span class="m-label">Hallucination Audit</span>
          <span class="m-val" style="color:#16A34A;">0.00% (Passed)</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:100%; background:#10B981;"></div></div>
      </div>
      <div>
        <div class="metric-row">
          <span class="m-label">Query Latency</span>
          <span class="m-val">82 ms</span>
        </div>
      </div>
      <div style="margin-top:auto; display:flex; flex-direction:column; gap:8px;">
        <div style="background:#0A192F; color:#FFFFFF; text-align:center; padding:12px; border-radius:6px; font-weight:700; font-size:13px;">
          Draft Secretariat Note
        </div>
        <div style="background:#F1F5F9; color:#334155; text-align:center; padding:10px; border-radius:6px; font-weight:600; font-size:12px; border:1px solid #CBD5E1;">
          Export Verification Audit PDF
        </div>
      </div>
    </div>
  </div>

  <div class="footer-metrics-bar">
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#10B981;"></div>
      <div>
        <div class="metric-val">Bilingual</div>
        <div class="metric-label">Assamese + English Sync</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#3B82F6;"></div>
      <div>
        <div class="metric-val">1-Click Draft</div>
        <div class="metric-label">To Secretariat Note-Sheet</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#F59E0B;"></div>
      <div>
        <div class="metric-val">Verbatim</div>
        <div class="metric-label">Clause-Level Citations</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#8B5CF6;"></div>
      <div>
        <div class="metric-val">Zero Risk</div>
        <div class="metric-label">Deterministic Filter Guard</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#EC4899;"></div>
      <div>
        <div class="metric-val">Audit Signed</div>
        <div class="metric-label">Cryptographic Hash Log</div>
      </div>
    </div>
  </div>
</body>
</html>"""
    return html

def generate_figure_5():
    """Wireframe 2: Secretariat Note-Sheet Generator (16:9 Widescreen)"""
    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{COMMON_CSS}

.notesheet-canvas {{
  background: #FFFFFF;
  border: 2px solid #CBD5E1;
  border-radius: 14px;
  flex: 1;
  display: flex;
  overflow: hidden;
  box-shadow: 0 15px 35px -5px rgba(0,0,0,0.08);
  margin-bottom: 24px;
}}

/* Left 2.5 Inch Secretariat Margin */
.margin-column {{
  width: 480px;
  background: #FDFBF7;
  border-right: 3px double #94A3B8;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
}}
.margin-badge {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: #92400E;
  background: #FEF3C7;
  border: 1px solid #FCD34D;
  padding: 4px 10px;
  border-radius: 4px;
  align-self: flex-start;
}}
.margin-ref-block {{
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-left: 4px solid #F59E0B;
  padding: 12px 14px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}}
.ref-title {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 800;
  color: #0A192F;
}}
.ref-desc {{
  font-size: 12px;
  color: #64748B;
  line-height: 1.35;
}}
.margin-signature {{
  margin-top: auto;
  border-top: 1px dashed #CBD5E1;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}}

/* Main Note Space */
.notespace-column {{
  flex: 1;
  background: #FFFFFF;
  padding: 36px 48px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}}
.docket-header {{
  border-bottom: 2px solid #0A192F;
  padding-bottom: 14px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}}
.docket-title {{
  font-size: 20px;
  font-weight: 900;
  color: #0A192F;
  letter-spacing: 0.5px;
}}
.docket-meta {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #475569;
  font-weight: 600;
}}

.notes-body {{
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 16px;
  line-height: 1.6;
  color: #1E293B;
  text-align: justify;
}}
.para-num {{
  font-weight: 800;
  color: #0A192F;
  margin-right: 8px;
}}

.approval-blocks-row {{
  margin-top: auto;
  padding-top: 24px;
  border-top: 2px solid #F1F5F9;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}}
.sign-block {{
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}}
.sign-role {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: #64748B;
}}
.sign-name {{
  font-size: 13.5px;
  font-weight: 700;
  color: #0A192F;
}}
.sign-status {{
  font-size: 11px;
  font-weight: 700;
}}
.status-approved {{ color: #16A34A; }}
.status-pending {{ color: #D97706; }}
</style>
</head>
<body>
  <div class="frame-corner frame-tl"></div>
  <div class="frame-corner frame-tr"></div>
  <div class="frame-corner frame-bl"></div>
  <div class="frame-corner frame-br"></div>
  <div class="frame-label-top">SECRETARIAT DRAFTING ENGINE // WIREFRAME 02</div>
  <div class="frame-label-right">MOP & APPR 2020 STANDARD FORMAT</div>

  <div class="header-container">
    <div>
      <div class="header-badge-row">
        <span class="cat-badge">MOP NOTE-SHEET GENERATOR</span>
        <span class="status-badge"><span class="status-dot"></span>2.5" LEFT MARGIN CERTIFIED</span>
      </div>
      <div class="main-title">SECRETARIAT NOTE-SHEET GENERATOR: MOP & APPR COMPLIANCE</div>
      <div class="main-subtitle">Automated Drafting Canvas: Traditional 2.5-Inch Margin, Pre-Filled Recitals & Multi-Tier Approvals</div>
    </div>
    <div class="header-meta">
      <div class="gov-seal-text">GOVERNMENT OF ASSAM • SECRETARIAT DOCKET</div>
      <div class="meta-chips">
        <span class="chip">DOC: AS-D36-WF2</span>
        <span class="chip">FORMAT: GREEN PAPER STANDARD</span>
        <span class="chip">MARGIN: EXACT 2.5 INCH</span>
      </div>
    </div>
  </div>

  <div class="notesheet-canvas">
    <!-- 2.5 Inch Left Margin -->
    <div class="margin-column">
      <span class="margin-badge">MOP 2.5-INCH MARGINAL DOCKET</span>

      <div class="margin-ref-block">
        <div class="ref-title">Ref: P.3/C (Flag A)</div>
        <div class="ref-desc">Formal application of Shri B. Barua, Joint Secretary (Retd.) dated 12/10/2026.</div>
      </div>

      <div class="margin-ref-block">
        <div class="ref-title">Rule 31 Pension Rules</div>
        <div class="ref-desc">Verified 32 years, 4 months qualifying net service without interruption.</div>
      </div>

      <div class="margin-ref-block">
        <div class="ref-title">Rule 99 Commutation</div>
        <div class="ref-desc">Entitled to 40% commutation lump sum based on age factor 8.194.</div>
      </div>

      <div class="margin-ref-block">
        <div class="ref-title">Fin. Dept U.O. No. 442</div>
        <div class="ref-desc">Budget allocation under Head 2071-Pensions cleared for Q3 FY26.</div>
      </div>

      <div class="margin-signature">
        <div style="font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; color:#0A192F;">
          S.O. (P&PG) • 14/11/2026
        </div>
        <div style="font-size:11px; color:#64748B;">Marginal directives entered under MOP Para 32.</div>
      </div>
    </div>

    <!-- Right Notespace -->
    <div class="notespace-column">
      <div class="docket-header">
        <div>
          <div class="docket-title">PENSION & PUBLIC GRIEVANCES DEPARTMENT • DISPUR</div>
          <div style="font-size:13px; color:#64748B; margin-top:2px;">Subject: Sanction of Commuted Pension and DCRG in respect of Shri B. Barua, Retd. JS</div>
        </div>
        <div class="docket-meta">
          FILE NO: PPG(P) 184/2026/12
        </div>
      </div>

      <div class="notes-body">
        <div>
          <span class="para-num">1.</span>
          Placed below for perusal is the superannuation pension docket in respect of <strong>Shri Biren Barua, ACS</strong>, Joint Secretary to the Govt. of Assam (Retd.), who retired on superannuation on 31/10/2026 (A.N.) pursuant to <strong>Fundamental Rule 56(a)</strong>.
        </div>

        <div>
          <span class="para-num">2.</span>
          The service book and vigilance clearance docket have been audited in terms of <strong>Rule 31 of the Assam Services (Pension) Rules, 1969</strong>. The total qualifying service rendered is verified as <strong>32 years, 4 months, and 12 days</strong>. There are no judicial or departmental proceedings pending under <em>Assam Services (Discipline & Appeal) Rules, 1964</em>.
        </div>

        <div>
          <span class="para-num">3.</span>
          The incumbent has exercised the statutory option under <strong>Rule 99 of the Pension Rules</strong> for commutation of <strong>40% of his basic pension</strong>. Calculation reveals basic pension admissible @ 50% of last emoluments (Rs. 1,18,500/-) = Rs. 59,250/- per month. Commuted 40% lump sum calculation: <code>Rs. 23,700 x 12 x 8.194 = Rs. 23,30,374/-</code>.
        </div>

        <div>
          <span class="para-num">4.</span>
          If approved, draft sanction orders flagged 'B' and 'C' for Commuted Value of Pension (CVP) and Death-cum-Retirement Gratuity (DCRG) under <strong>Rule 143</strong> may be signed and issued to the Accountant General (A&E), Assam, Maidamgaon, Guwahati.
        </div>
      </div>

      <div class="approval-blocks-row">
        <div class="sign-block">
          <div class="sign-role">SR. ASSISTANT</div>
          <div class="sign-name">R. Hatibaruah</div>
          <div class="sign-status status-approved">✓ Drafted 14/11</div>
        </div>
        <div class="sign-block">
          <div class="sign-role">SECTION OFFICER</div>
          <div class="sign-name">D. Sarma</div>
          <div class="sign-status status-approved">✓ Verified 15/11</div>
        </div>
        <div class="sign-block">
          <div class="sign-role">DY. SECRETARY</div>
          <div class="sign-name">P. Goswami</div>
          <div class="sign-status status-approved">✓ Recommended 16/11</div>
        </div>
        <div class="sign-block">
          <div class="sign-role">SECRETARY / APPR</div>
          <div class="sign-name">M. K. Das, IAS</div>
          <div class="sign-status status-pending">⏳ Awaiting Signature</div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-metrics-bar">
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#10B981;"></div>
      <div>
        <div class="metric-val">100%</div>
        <div class="metric-label">MOP 2.5" Compliance</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#3B82F6;"></div>
      <div>
        <div class="metric-val">Pre-Audited</div>
        <div class="metric-label">Rule 99 & FR 56 Equations</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#F59E0B;"></div>
      <div>
        <div class="metric-val">4-Tier</div>
        <div class="metric-label">Secretariat Hierarchy</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#8B5CF6;"></div>
      <div>
        <div class="metric-val">e-Office Ready</div>
        <div class="metric-label">Green Note Sheet Export</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#EC4899;"></div>
      <div>
        <div class="metric-val">SHA-256</div>
        <div class="metric-label">Tamper-Proof File Hash</div>
      </div>
    </div>
  </div>
</body>
</html>"""
    return html

def generate_figure_6():
    """Figure 6: Mathematical Formulation & RAG Triad Scoring Architecture (16:9 Widescreen)"""
    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{COMMON_CSS}

.math-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  flex: 1;
  margin-bottom: 24px;
}}

.math-card {{
  background: #FFFFFF;
  border-radius: 16px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
  border: 2px solid #E2E8F0;
}}

.mc-blue {{ border-top: 8px solid #2563EB; }}
.mc-green {{ border-top: 8px solid #10B981; }}
.mc-amber {{ border-top: 8px solid #F59E0B; }}

.mc-header {{
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 16px;
  border-bottom: 2px solid #F1F5F9;
  margin-bottom: 18px;
}}
.mc-badge {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  align-self: flex-start;
}}
.mc-blue .mc-badge {{ background: #DBEAFE; color: #1E40AF; }}
.mc-green .mc-badge {{ background: #DCFCE7; color: #15803D; }}
.mc-amber .mc-badge {{ background: #FEF3C7; color: #B45309; }}

.mc-title {{
  font-size: 22px;
  font-weight: 800;
  color: #0A192F;
}}
.mc-weight {{
  font-size: 14px;
  color: #64748B;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
}}

.formula-box {{
  background: #0A192F;
  color: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 16px;
  border-left: 4px solid #38BDF8;
}}

.math-explanation {{
  font-size: 14.5px;
  color: #334155;
  line-height: 1.55;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}}
.math-param {{
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
}}
.math-param strong {{
  color: #0A192F;
  font-family: 'JetBrains Mono', monospace;
}}

.mc-footer {{
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px dashed #CBD5E1;
  display: flex;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
}}
.mc-blue .mc-footer {{ color: #1E40AF; }}
.mc-green .mc-footer {{ color: #15803D; }}
.mc-amber .mc-footer {{ color: #B45309; }}

.banner-equation {{
  background: #0A192F;
  color: #FFFFFF;
  border-radius: 12px;
  padding: 18px 28px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 8px 20px rgba(10,25,47,0.15);
}}
.banner-eq-text {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 800;
  color: #38BDF8;
}}
</style>
</head>
<body>
  <div class="frame-corner frame-tl"></div>
  <div class="frame-corner frame-tr"></div>
  <div class="frame-corner frame-bl"></div>
  <div class="frame-corner frame-br"></div>
  <div class="frame-label-top">MATHEMATICAL FORMULATION // NESFIC-D-36</div>
  <div class="frame-label-right">DETERMINISTIC EVALUATION BENCHMARK SUITE</div>

  <div class="header-container">
    <div>
      <div class="header-badge-row">
        <span class="cat-badge">ALGORITHMIC DETERMINISM</span>
        <span class="status-badge"><span class="status-dot"></span>RAG TRIAD FORMULATION</span>
      </div>
      <div class="main-title">MATHEMATICAL FORMULATION & RAG TRIAD SCORING ARCHITECTURE</div>
      <div class="main-subtitle">Quantitative Rigor: Context Relevance, Factual Groundedness & Zero-Hallucination Guardrails</div>
    </div>
    <div class="header-meta">
      <div class="gov-seal-text">GOVERNMENT OF ASSAM • METRIC VERIFICATION</div>
      <div class="meta-chips">
        <span class="chip">DOC: AS-D36-FIG6</span>
        <span class="chip">CONFIDENCE: S_query &gt;= 0.95</span>
        <span class="chip">CALIBRATION: AASC-2026</span>
      </div>
    </div>
  </div>

  <div class="banner-equation">
    <div>
      <div style="font-size:12px; color:#94A3B8; font-family:'JetBrains Mono',monospace; letter-spacing:1px; margin-bottom:4px;">COMPOSITE VERIFICATION SCORE FORMULA</div>
      <div class="banner-eq-text">S_query = w1·R(q, c) + w2·G(a, c) + w3·A(a, q) - λ·H(a)</div>
    </div>
    <div style="display:flex; gap:16px; font-family:'JetBrains Mono',monospace; font-size:14px;">
      <span style="color:#60A5FA;">w1 = 0.35</span>
      <span style="color:#34D399;">w2 = 0.40</span>
      <span style="color:#FBBF24;">w3 = 0.25</span>
      <span style="color:#F87171;">λ = 1.0 (Penalty)</span>
    </div>
  </div>

  <div class="math-grid">
    <!-- Pillar 1 -->
    <div class="math-card mc-blue">
      <div class="mc-header">
        <span class="mc-badge">TRIAD PILLAR 1</span>
        <div class="mc-title">CONTEXT RELEVANCE</div>
        <div class="mc-weight">WEIGHT: w1 = 0.35 • THRESHOLD >= 0.88</div>
      </div>
      <div class="formula-box">
        R(q, c_i) = (e_q · e_c_i) / (||e_q|| ||e_c_i||) × II(domain_filter)
      </div>
      <div class="math-explanation">
        <div>Measures semantic alignment between query vector and retrieved statutory gazette chunks.</div>
        <div class="math-param"><strong>e_q, e_c_i:</strong> 768-dimensional normalized dense embeddings.</div>
        <div class="math-param"><strong>II(domain):</strong> Binary indicator enforcing departmental jurisdiction matching.</div>
      </div>
      <div class="mc-footer">
        <span>BENCHMARK: 0.982</span>
        <span>STATUS: EXCELLENT</span>
      </div>
    </div>

    <!-- Pillar 2 -->
    <div class="math-card mc-green">
      <div class="mc-header">
        <span class="mc-badge">TRIAD PILLAR 2</span>
        <div class="mc-title">FACTUAL GROUNDEDNESS</div>
        <div class="mc-weight">WEIGHT: w2 = 0.40 • THRESHOLD >= 0.95</div>
      </div>
      <div class="formula-box">
        G(a, c_i) = |Entities(a) ∩ Statutory(c)| / |Entities(a)| × NLI(c |= a)
      </div>
      <div class="math-explanation">
        <div>Ensures every assertion in the response is logically entailed by the retrieved Assam Gazette rules.</div>
        <div class="math-param"><strong>Entities(a):</strong> Rule numbers, percentages, financial multipliers.</div>
        <div class="math-param"><strong>NLI(c |= a):</strong> Natural language inference premise entailment probability.</div>
      </div>
      <div class="mc-footer">
        <span>BENCHMARK: 0.994</span>
        <span>STATUS: CERTIFIED</span>
      </div>
    </div>

    <!-- Pillar 3 -->
    <div class="math-card mc-amber">
      <div class="mc-header">
        <span class="mc-badge">TRIAD PILLAR 3</span>
        <div class="mc-title">ZERO-HALLUCINATION GUARD</div>
        <div class="mc-weight">WEIGHT: λ = 1.0 • TOLERANCE = 0.00%</div>
      </div>
      <div class="formula-box">
        H(a) = max_s [ II(¬∃ c ∈ C : c |= s) × Severity(s) ]
      </div>
      <div class="math-explanation">
        <div>Deterministic rejection gate. If any generated sentence lacks statutory backing, execution is terminated.</div>
        <div class="math-param"><strong>II(¬∃ c):</strong> Detects ungrounded speculative assertions.</div>
        <div class="math-param"><strong>Fallback:</strong> Automatically outputs verbatim statutory text without commentary.</div>
      </div>
      <div class="mc-footer">
        <span>BENCHMARK: 0.00%</span>
        <span>STATUS: ZERO TOLERANCE</span>
      </div>
    </div>
  </div>

  <div class="footer-metrics-bar">
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#10B981;"></div>
      <div>
        <div class="metric-val">99.4%</div>
        <div class="metric-label">Composite Factual Grounding</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#3B82F6;"></div>
      <div>
        <div class="metric-val">0.00%</div>
        <div class="metric-label">Hallucination Rejection</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#F59E0B;"></div>
      <div>
        <div class="metric-val">0.978</div>
        <div class="metric-label">RAG Triad Harmonic Mean</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#8B5CF6;"></div>
      <div>
        <div class="metric-val">NLI Entailment</div>
        <div class="metric-label">Formal Logic Verification</div>
      </div>
    </div>
    <div class="footer-metric">
      <div class="metric-bullet" style="background:#EC4899;"></div>
      <div>
        <div class="metric-val">Automated</div>
        <div class="metric-label">CI/CD Regression Benchmark</div>
      </div>
    </div>
  </div>
</body>
</html>"""
    return html

def main():
    generators = [
        ("d36_fig_paradigm_shift.png", generate_figure_1),
        ("d36_fig_rules_taxonomy.png", generate_figure_2),
        ("d36_fig_architecture.png", generate_figure_3),
        ("d36_wireframe1_assistant.png", generate_figure_4),
        ("d36_wireframe2_notesheet.png", generate_figure_5),
        ("d36_fig_math_formulation.png", generate_figure_6),
    ]

    print("🚀 Initializing Playwright 16:9 Widescreen Infographic Pipeline (2752x1536)...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # device_scale_factor: 1 for clean 2752x1536 resolution
        page = browser.new_page(viewport={"width": 2752, "height": 1536})

        for filename, gen_func in generators:
            target_path = os.path.join(ASSETS_DIR, filename)
            html_content = gen_func()
            page.set_content(html_content, wait_until="networkidle")
            # Wait brief moment for fonts and layouts to settle
            page.wait_for_timeout(500)
            page.screenshot(path=target_path, full_page=False)
            size_kb = os.path.getsize(target_path) / 1024
            print(f"✅ Generated 16:9 Widescreen Infographic: {filename} ({size_kb:.1f} KB)")

        browser.close()
    print("🎉 All 6 High-Impact 16:9 Widescreen Infographics generated successfully!")

if __name__ == "__main__":
    main()
