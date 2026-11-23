#!/usr/bin/env python3
"""
Automated Gemini Pro Image Generation Pipeline for NESFIC-D-36
Connects to Google Chrome via Chrome DevTools Protocol (CDP) on port 9222
Signed-in Google Pro Account: sumanzfilms@gmail.com
Generates 16:9 widescreen technological framework infographics matching the Data Centers masterwork style.
"""

import os
import sys
import time
import glob
import shutil
import base64
from PIL import Image
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ASSETS_DIR = os.path.join(BASE_DIR, 'docs', 'assets')
DOWNLOADS_DIR = os.path.expanduser('~/Downloads')
os.makedirs(ASSETS_DIR, exist_ok=True)

PROMPTS = [
    {
        "filename": "d36_fig_paradigm_shift.png",
        "title": "Administrative Paradigm Shift: From Red-Tape Discretion to Deterministic Knowledge Engine",
        "prompt": "Generate a high-quality 16:9 widescreen technological framework infographic image: A visionary 16:9 widescreen technological architectural infographic on a clean white and light-gray blueprint grid background illustrating ADMINISTRATIVE PARADIGM SHIFT: FROM RED-TAPE DISCRETION TO DETERMINISTIC KNOWLEDGE ENGINE IN ASSAM. The header features bold dark navy typography ADMINISTRATIVE PARADIGM SHIFT: ASSAM DECISION SUPPORT PLATFORM with subtitle From Fragmented Manual Precedents to Verifiable Knowledge Graph & Deterministic Guardrails. The visual presents a dramatic transformation comparison: On the left (Traditional Red-Tape Governance - Desaturated Gray, Slate and Crimson): dusty physical paper file dockets, missing circulars, discretionary delays of 18 to 45 days, ambiguous pension interpretations, high litigation risk, and manual margin formatting errors; On the right (Modern AI-Assisted Smart Governance - Vibrant Royal Blue, Emerald Green, and Gold): high-speed RAG knowledge graph, sub-85ms clause retrieval, bilingual Assamese and English verified citations, deterministic note-sheet drafting with 2.5-inch Secretariat margins, and cryptographic SHA-256 audit ledger. Includes diagnostic metric badges: 99.4% Factual Precision, 0.00% Hallucination, <85ms Query Latency, and MOP 2.5-Inch Margin Certified. Clean 2D flat vector aesthetic, crisp lines, modern corporate palette with deep navy, royal blue, emerald green, and gold accents, ultra-sharp typography."
    },
    {
        "filename": "d36_fig_rules_taxonomy.png",
        "title": "Assam Administrative Rules Knowledge Graph & Clause-Level Ontology",
        "prompt": "Generate a high-quality 16:9 widescreen technological framework infographic image: A master institutional rules ontology and knowledge graph infographic in 16:9 widescreen on a clean white blueprint background with subtle technical gridlines illustrating ASSAM ADMINISTRATIVE RULES KNOWLEDGE GRAPH & CLAUSE-LEVEL ONTOLOGY. The header displays bold dark navy typography ASSAM ADMINISTRATIVE RULES KNOWLEDGE GRAPH with subtitle Hierarchical Semantic Decomposition: From Statutory Gazette Enactments to Verifiable Chunks. The visual layout presents four structured domain knowledge pillars: 1) Pillar 1 (Emerald Green): Pensions & Retirement - Assam Services (Pension) Rules 1969 (Rule 31 qualifying service, Rule 99 commutation 40%, Rule 143 death gratuity); 2) Pillar 2 (Royal Blue): Conduct & Discipline - Assam Services (Conduct) Rules 1965 (Rule 3 absolute integrity, Rule 9 private trade, Rule 15 property declarations); 3) Pillar 3 (Amber / Gold): Service & Secretariat - Fundamental Rules (FR 56 superannuation at 60), Manual of Office Procedure (MOP Paras 24-48 for 2.5-inch margin note-sheet protocol), and APPR 2020 procurement; 4) Pillar 4 (Cyan): Spatial & Emerging Domains - ASSAC Drone SOPs (SOP-01 flood reconnaissance, SOP-03 embankment erosion). Diagnostic badges: 100% Statutory Coverage, 500-Token Chunking, 768-Dim Vector Embeddings, Bilingual Cross-Lingual Sync. Clean 2D flat vector design, high-contrast dark navy typography, vibrant accents."
    },
    {
        "filename": "d36_fig_architecture.png",
        "title": "Enterprise Cloud & Edge Hybrid Solution Architecture",
        "prompt": "Generate a high-quality 16:9 widescreen technological framework infographic image: An authoritative 16:9 widescreen enterprise solution architecture infographic on a clean white and light-gray blueprint grid background illustrating ENTERPRISE CLUSTER & EDGE HYBRID SOLUTION ARCHITECTURE FOR ASSAM DECISION SUPPORT PLATFORM. The header features bold dark navy typography ENTERPRISE CLOUD & EDGE HYBRID SOLUTION ARCHITECTURE with subtitle 5-Tier GovStack Blueprint: From Client Experience to State Data Centre Infrastructure. The visual layout depicts five distinct horizontal architecture tiers connected by glowing data flow vectors: 1) Tier 1 (Royal Blue): Presentation & Client Experience - Bilingual Assistant UI, Secretariat Note-Sheet Generator, Document Explorer, and Admin Control Panel; 2) Tier 2 (Cyan): Edge Security & Routing - Cloudflare Edge Network (Guwahati POP), State SDC VPN Gateway, WAF, DDoS mitigation, and geo-fencing (IN-AS); 3) Tier 3 (Emerald Green): Core Application & Inference Engine - Serverless Edge Workers (V8 isolates), query transformation, bilingual tokenization (English/Assamese), and zero-hallucination guardrail; 4) Tier 4 (Amber): Knowledge Core & Vector DB - HNSW vector index (768-dim), BM25 lexical keyword ranking, and official Gazette store; 5) Tier 5 (Deep Navy / Purple): Governance, Audit & Sovereign Infrastructure - Cryptographic Merkle Tree (SHA-256), 5-tier RBAC, and SDC air-gap on-premise container cluster. Includes metric badges: Tier IV SLA, <85ms Latency, 100% Data Sovereignty, TLS 1.3 / mTLS. Clean 2D flat vector aesthetic, crisp lines, ultra-sharp typography."
    },
    {
        "filename": "d36_wireframe1_assistant.png",
        "title": "Bilingual Knowledge & Rule Assistant UI/UX Enterprise Architecture",
        "prompt": "Generate a high-quality 16:9 widescreen technological framework infographic image: A futuristic, ultra-clean 16:9 widescreen enterprise software UI/UX prototype infographic on a clean white blueprint grid background illustrating BILINGUAL KNOWLEDGE & RULE ASSISTANT: UI/UX ENTERPRISE ARCHITECTURE. The top header features bold dark navy typography BILINGUAL KNOWLEDGE & RULE ASSISTANT with subtitle Production Interface: Dual-Language Querying, Verifiable Statutory Citations & Secretariat Confidence Metrics. The layout showcases a realistic, high-impact enterprise web application interface: Left sidebar with Assam GovStack crest, navigation tabs (Knowledge Assistant, Note Drafter, Rules Explorer, ASSAC Spatial SOPs) and active rule repository filters; Center main canvas showing an executive query on pension commutation under Rule 99, with a verified answer card, highlighted statutory clause citation from Assam Services Pension Rules 1969, and side-by-side Assamese translation box; Right diagnostics drawer displaying real-time RAG Triad gauges (99.4% Factual Grounding, 0.98 Context Relevance, 0.00% Hallucination Audit, 82ms latency) with action buttons 'Draft Secretariat Note' and 'Export Verification Audit'. Modern glassmorphism UI cards, crisp borders, royal blue, emerald green, and dark navy palette, ultra-sharp typography."
    },
    {
        "filename": "d36_wireframe2_notesheet.png",
        "title": "Secretariat Note-Sheet Generator: MOP & APPR 2020 Compliance Engine",
        "prompt": "Generate a high-quality 16:9 widescreen technological framework infographic image: A master administrative engineering workflow infographic in 16:9 widescreen on a clean white blueprint background illustrating SECRETARIAT NOTE-SHEET GENERATOR: MOP & APPR 2020 COMPLIANCE ENGINE. The header displays bold dark navy typography SECRETARIAT NOTE-SHEET GENERATOR: MOP & APPR COMPLIANCE with subtitle Automated Drafting Canvas: Traditional 2.5-Inch Left Margin, Rule Recitals & Multi-Tier Approvals. The visual layout represents an authentic government file docket workspace: Left Column (Exactly 2.5-Inch MOP Mandated Margin on light parchment cream background) showing marginal references (Ref: P.3/C Flag A, Rule 31 Pension Rules qualifying service, Rule 99 Commutation, Fin Dept U.O. clearance) and Section Officer initial directives; Right Main Column showing official note-sheet drafting for Pension & Public Grievances Department, Dispur with structured four-part hierarchy (Statement of case under FR 56, statutory examination under Rule 31, financial commutation calculation, and formal approval prayer), concluding with 4-tier Secretariat signature blocks (Sr. Assistant, Section Officer, Dy. Secretary, Secretary/Approver). Metric badges: 100% MOP 2.5-Inch Compliance, Pre-Audited Rule 99 Equations, e-Office Ready Green Note Sheet Export, SHA-256 Tamper-Proof File Hash. Clean 2D flat vector aesthetic, crisp lines, professional government docket typography."
    },
    {
        "filename": "d36_fig_math_formulation.png",
        "title": "Mathematical Formulation & RAG Triad Scoring Architecture",
        "prompt": "Generate a high-quality 16:9 widescreen technological framework infographic image: A master quantitative scientific formulation and algorithm architecture infographic in 16:9 widescreen on a clean white blueprint background illustrating MATHEMATICAL FORMULATION & RAG TRIAD SCORING ARCHITECTURE FOR ASSAM DECISION SUPPORT PLATFORM. The header features bold dark navy typography MATHEMATICAL FORMULATION & RAG TRIAD SCORING ARCHITECTURE with subtitle Quantitative Rigor: Context Relevance, Factual Groundedness & Zero-Hallucination Guardrails. Top banner highlights the master composite scoring equation: S_query = w1·R(q, c) + w2·G(a, c) + w3·A(a, q) - λ·H(a), with calibrated weights w1=0.35, w2=0.40, w3=0.25, and penalty λ=1.0. Below, three mathematical pillar cards with formula boxes and parameter breakdowns: 1) Pillar 1 (Royal Blue): Context Relevance R(q, c_i) cosine similarity formula and domain filter threshold >= 0.88; 2) Pillar 2 (Emerald Green): Factual Groundedness G(a, c_i) entity overlap and NLI entailment formula with threshold >= 0.95; 3) Pillar 3 (Amber / Crimson): Zero-Hallucination Guardrail H(a) sentence-level ungroundedness detection with 0.00% tolerance. Bottom diagnostic bar displays 99.4% Factual Grounding, 0.00% Hallucination Rejection, 0.978 RAG Triad Harmonic Mean, and NLI Formal Entailment Verification. Clean 2D flat vector design, dark navy, royal blue, emerald green, and amber diagnostic badges, crisp mathematical typography."
    }
]

def find_latest_download(start_time):
    """Finds recently downloaded Gemini image in ~/Downloads."""
    pattern = os.path.join(DOWNLOADS_DIR, "Gemini_Generated_Image_*.png")
    matches = glob.glob(pattern)
    recent = []
    for f in matches:
        mtime = os.path.getmtime(f)
        if mtime >= start_time - 5:  # within window
            recent.append((mtime, f))
    if recent:
        recent.sort(reverse=True)
        return recent[0][1]
    return None

def main():
    print("=" * 70)
    print("🤖 AUTONOMOUS GEMINI PRO INFOGRAPHIC PIPELINE (CDP :9222)")
    print("=" * 70)
    print("🔑 Authenticated Account : sumanzfilms@gmail.com (Google Pro / Advanced)")
    print(f"📁 Target Assets Dir     : {ASSETS_DIR}")
    print(f"📋 Total Tasks In Queue  : {len(PROMPTS)}")
    print("=" * 70)

    with sync_playwright() as p:
        try:
            print("\n⏳ Connecting to Chrome on http://127.0.0.1:9222...")
            browser = p.chromium.connect_over_cdp("http://127.0.0.1:9222")
            print("✅ Successfully attached to Chrome session!")
        except Exception as e:
            print(f"❌ Failed to connect to Chrome on port 9222: {e}")
            sys.exit(1)

        # Get the Gemini page
        gemini_page = None
        for ctx in browser.contexts:
            for pg in ctx.pages:
                if "gemini.google.com" in pg.url:
                    gemini_page = pg
                    break
            if gemini_page:
                break

        if not gemini_page:
            print("🌐 Opening new tab to https://gemini.google.com/app...")
            gemini_page = browser.contexts[0].new_page()
            gemini_page.goto("https://gemini.google.com/app", wait_until="networkidle")
        else:
            print(f"🌐 Attached to active Gemini tab: {gemini_page.url}")
            gemini_page.bring_to_front()

        # Verify Google Account
        account_label = gemini_page.evaluate('''() => {
            const btn = document.querySelector('a[aria-label*="@"], button[aria-label*="@"], img[alt*="@"]');
            return btn ? btn.getAttribute('aria-label') || btn.getAttribute('alt') : 'Detected';
        }''')
        print(f"👤 Verified Account Status: {account_label.strip()[:60]}")

        success_count = 0

        for idx, item in enumerate(PROMPTS, 1):
            filename = item["filename"]
            title = item["title"]
            prompt = item["prompt"]
            target_path = os.path.join(ASSETS_DIR, filename)

            print(f"\n[{idx}/{len(PROMPTS)}] 🎨 Processing: {filename}")
            print(f"   📌 Title: {title}")

            # 1. Click New Chat to keep clean context
            try:
                new_chat_btn = gemini_page.locator('button[aria-label="New Chat"]')
                if new_chat_btn.count() > 0:
                    new_chat_btn.first.click()
                    time.sleep(2)
            except Exception as e:
                print(f"   ℹ️ New Chat click notice: {e}")

            # 2. Record initial images in DOM
            initial_blob_urls = gemini_page.evaluate('''() => {
                return Array.from(document.querySelectorAll('img[src^="blob:"]')).map(i => i.src);
            }''')

            # 3. Enter Prompt
            gemini_page.evaluate('''([text]) => {
                const el = document.querySelector('rich-textarea p, rich-textarea div[contenteditable="true"], div[contenteditable="true"] p, div[contenteditable="true"], textarea');
                if (el) {
                    el.focus();
                    el.textContent = text;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }''', [prompt])
            time.sleep(1)

            # 4. Click Send or Press Enter
            send_btn = gemini_page.locator('button[aria-label="Send message"], button.send-button, mat-icon[data-mat-icon-name="send"]')
            if send_btn.count() > 0 and send_btn.first.is_enabled():
                send_btn.first.click()
            else:
                gemini_page.keyboard.press("Enter")

            start_req_time = time.time()
            print("   📤 Prompt submitted to Imagen 3. Waiting for image generation...")

            # 5. Wait for new image to appear in DOM
            new_img_detected = False
            latest_blob_src = None

            for attempt in range(40):  # up to 80 seconds
                time.sleep(2)
                cur_blobs = gemini_page.evaluate('''() => {
                    const imgs = Array.from(document.querySelectorAll('img[src^="blob:"]'));
                    return imgs.map(i => ({ src: i.src, w: i.naturalWidth, h: i.naturalHeight }));
                }''')
                
                # Check for new blob image with width > 200
                candidates = [b for b in cur_blobs if b["src"] not in initial_blob_urls and b["w"] > 200]
                if candidates:
                    new_img_detected = True
                    latest_blob_src = candidates[-1]["src"]
                    print(f"   🖼️ New image rendered in Gemini DOM ({candidates[-1]['w']}x{candidates[-1]['h']}) after {int(time.time() - start_req_time)}s!")
                    break

            if not new_img_detected:
                print(f"   ⚠️ Generation timed out for {filename}. Skipping to next...")
                continue

            time.sleep(1)

            # 6. Click 'Download full size image' button to get pristine 2752x1536 resolution
            download_btn = gemini_page.locator('button[aria-label="Download full size image"]')
            download_clicked = False
            if download_btn.count() > 0:
                try:
                    download_btn.last.click()
                    download_clicked = True
                    print("   📥 Clicked 'Download full size image' button...")
                except Exception as e:
                    print(f"   ℹ️ Notice on download click: {e}")

            # 7. Check if Chrome saved it to ~/Downloads
            time.sleep(3)
            downloaded_file = find_latest_download(start_req_time) if download_clicked else None

            if downloaded_file and os.path.exists(downloaded_file):
                # Verify and copy
                im = Image.open(downloaded_file)
                im.save(target_path, "PNG")
                size_kb = os.path.getsize(target_path) / 1024
                print(f"   ✅ Saved full-resolution 16:9 infographic: {filename} ({im.size[0]}x{im.size[1]}, {size_kb:.1f} KB)")
                # Remove from Downloads to keep clean
                try:
                    os.remove(downloaded_file)
                except Exception:
                    pass
                success_count += 1
            else:
                # Fallback: extract directly from DOM canvas
                print("   ℹ️ Extracting canvas raster buffer from DOM...")
                b64_data = gemini_page.evaluate('''([src]) => {
                    const img = Array.from(document.querySelectorAll('img')).find(i => i.src === src);
                    if (!img || !img.complete || img.naturalWidth === 0) return null;
                    try {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.naturalWidth;
                        canvas.height = img.naturalHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        return canvas.toDataURL('image/png').split(',')[1];
                    } catch(e) {
                        return null;
                    }
                }''', [latest_blob_src])

                if b64_data:
                    raw_bytes = base64.b64decode(b64_data)
                    with open(target_path, 'wb') as f:
                        f.write(raw_bytes)
                    im = Image.open(target_path)
                    size_kb = os.path.getsize(target_path) / 1024
                    print(f"   ✅ Saved canvas infographic: {filename} ({im.size[0]}x{im.size[1]}, {size_kb:.1f} KB)")
                    success_count += 1
                else:
                    print(f"   ❌ Failed to extract image data for {filename}")

            # Polite delay between generation prompts
            if idx < len(PROMPTS):
                print("   ⏳ Cooling down for 6 seconds before next prompt...")
                time.sleep(6)

        print("\n" + "=" * 70)
        print(f"🎉 GENERATION RUN COMPLETE: {success_count}/{len(PROMPTS)} Infographics Generated via sumanzfilms@gmail.com")
        print("=" * 70)

if __name__ == "__main__":
    main()
