/**
 * NESFIC-D-36: Trusted Government Knowledge, Rules & Document Assistant
 * Core Constants & Taxonomies
 * Sponsoring Stakeholders:
 * - Assam Administrative Staff College (AASC)
 * - Administrative Reforms and Training Department (ARTD)
 * - Department of Science, Technology and Climate Change (STCCD)
 * - Pension & Public Grievances Department (P&PGD)
 * - Assam State Space Application Centre (ASSAC)
 */

export const CHALLENGE_INFO = {
  code: "NESFIC-D-36",
  title: "Trusted Government Knowledge, Rules & Document Assistant",
  category: "Generative AI & Language Tools / Governance & Administration",
  authority: "Assam Innovation & Startup Foundation (AISF), DIIS, Govt. of Assam",
  portalUrl: "https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-36",
  geoRegion: "IN-AS",
  geoPlace: "Guwahati, Dispur, Assam, India",
  coordinates: {
    lat: 26.1445,
    lng: 91.7362,
  },
};

export const DEPARTMENTS = [
  {
    id: "AASC",
    name: "Assam Administrative Staff College",
    nameAs: "অসম প্ৰশাসনিক পদাধিকাৰী মহাবিদ্যালয়",
    category: "Training & Civil Service Capacity Building",
    mandate: "Civil service induction, executive leadership, administrative ethics, and state service rules training.",
    icon: "🏛️",
  },
  {
    id: "ARTD",
    name: "Administrative Reforms & Training Department",
    nameAs: "প্ৰশাসনিক সংস্কাৰ আৰু প্ৰশিক্ষণ বিভাগ",
    category: "Administrative Policy & Service Rules",
    mandate: "Manual of Office Procedure (MOP), APAR guidelines, Right to Public Services, and Secretariat governance.",
    icon: "📜",
  },
  {
    id: "PPGD",
    name: "Pension & Public Grievances Department",
    nameAs: "পেঞ্চন আৰু ৰাজহুৱা ওজৰ-আপত্তি বিভাগ",
    category: "Retiral Benefits & Redressal",
    mandate: "Assam Services (Pension) Rules 1969, family pension sanctioning, commutation, DCRG limits, and grievance redressal.",
    icon: "⚖️",
  },
  {
    id: "STCCD",
    name: "Department of Science, Technology and Climate Change",
    nameAs: "বিজ্ঞান, প্ৰযুক্তি আৰু জলবায়ু পৰিৱৰ্তন বিভাগ",
    category: "Scientific Policy & Emerging Tech",
    mandate: "State R&D incubation, technical innovation oversight, and inter-departmental tech governance.",
    icon: "🔬",
  },
  {
    id: "ASSAC",
    name: "Assam State Space Application Centre",
    nameAs: "অসম ৰাজ্যিক মহাকাশ প্ৰয়োগ কেন্দ্ৰ",
    category: "Geospatial & Remote Sensing Infrastructure",
    mandate: "Satellite GIS mapping, drone survey standard operating procedures, land-use zoning, and geospatial data sharing.",
    icon: "🛰️",
  },
  {
    id: "FINANCE",
    name: "Finance Department, Government of Assam",
    nameAs: "বিত্ত বিভাগ, অসম চৰকাৰ",
    category: "Fiscal Governance & Procurement",
    mandate: "Assam Public Procurement Rules 2020, Delegation of Financial Powers, GeM portal norms, and fiscal audits.",
    icon: "💼",
  },
];

export const RULE_CATEGORIES = [
  {
    id: "PENSION_RULES",
    name: "Assam Services (Pension) Rules, 1969",
    nameAs: "অসম সেৱা (পেঞ্চন) নিয়মাবলী, ১৯৬৯",
    department: "PPGD",
    primaryActs: ["Assam Services (Pension) Rules 1969", "Commutation of Pension Regulations"],
    status: "ACTIVE",
  },
  {
    id: "CONDUCT_RULES",
    name: "Assam Services (Conduct) Rules, 1965",
    nameAs: "অসম সেৱা (আচৰণ) নিয়মাবলী, ১৯৬৫",
    department: "ARTD",
    primaryActs: ["Assam Services (Conduct) Rules 1965"],
    status: "ACTIVE",
  },
  {
    id: "FR_SR",
    name: "Fundamental Rules & Subsidiary Rules (FR & SR)",
    nameAs: "মৌলিক নিয়ম আৰু সহায়ক নিয়মাবলী",
    department: "ARTD",
    primaryActs: ["FR 56 (Superannuation)", "SR 118 (Joining Time)", "Assam Leave Rules 1934"],
    status: "ACTIVE",
  },
  {
    id: "MOP_SECRETARIAT",
    name: "Manual of Office Procedure (MOP)",
    nameAs: "কাৰ্যালয় পদ্ধতি পুথি",
    department: "ARTD",
    primaryActs: ["Assam Secretariat Manual of Office Procedure"],
    status: "ACTIVE",
  },
  {
    id: "PROCUREMENT_RULES",
    name: "Assam Public Procurement Rules, 2020",
    nameAs: "অসম ৰাজহুৱা ক্ৰয় নিয়মাবলী, ২০২০",
    department: "FINANCE",
    primaryActs: ["Assam Public Procurement Act 2017", "APPR 2020"],
    status: "ACTIVE",
  },
  {
    id: "GEOSPATIAL_POLICY",
    name: "ASSAC Geospatial & Drone Data Guidelines, 2024",
    nameAs: "মহাকাশ প্ৰয়োগ আৰু ড্ৰোন তথ্য নীতি",
    department: "ASSAC",
    primaryActs: ["National Geospatial Policy Compliance (Assam Cadre)"],
    status: "ACTIVE",
  },
];

export const RBAC_ROLES = {
  VIEWER: {
    level: 1,
    title: "General Officer / Citizen Review",
    permissions: ["query:read", "documents:read"],
  },
  SECTION_OFFICER: {
    level: 2,
    title: "Section Officer / Superintendent",
    permissions: ["query:read", "documents:read", "draft:notesheet", "draft:om"],
  },
  DEPT_SANCTIONING: {
    level: 3,
    title: "Sanctioning Authority / Under Secretary",
    permissions: ["query:read", "documents:read", "draft:notesheet", "draft:om", "audit:view"],
  },
  AASC_TRAINER: {
    level: 4,
    title: "AASC Master Trainer & Faculty",
    permissions: ["query:read", "documents:read", "draft:all", "benchmark:run", "audit:view"],
  },
  GOV_ADMIN: {
    level: 5,
    title: "State System Administrator",
    permissions: ["query:read", "documents:manage", "draft:all", "audit:manage", "benchmark:run", "rbac:manage"],
  },
};

export const RAG_METRICS_BENCHMARK = {
  minCitationCoverage: 0.95, // 95%+ of claims must have direct clause citation
  minGroundednessScore: 0.92,
  hallucinationThreshold: 0.05, // Reject if ungrounded probability > 5%
  maxRetrievalLatencyMs: 400,
};
