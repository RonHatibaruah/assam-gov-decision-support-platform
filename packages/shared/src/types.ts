/**
 * Types & Domain Interfaces for NESFIC-I-08:
 * End-to-End Digital Traceability across the Assam Tea Value Chain
 */

export enum StakeholderRole {
  None = 0,
  SmallTeaGrower = 1,
  LargeEstate = 2,
  FactoryBLF = 3,
  LabCertifier = 4,
  AuctionBroker = 5,
  Retailer = 6,
  TRAAdmin = 7,
}

export enum BatchStage {
  Plucked = "PLUCKED",
  CollectionWeighed = "COLLECTION_WEIGHED",
  FactoryProcessed = "FACTORY_PROCESSED",
  LabCertified = "LAB_CERTIFIED",
  AuctionTransferred = "AUCTION_TRANSFERRED",
  RetailPackaged = "RETAIL_PACKAGED",
}

export enum ProcessingType {
  CTC = "CTC",
  Orthodox = "ORTHODOX",
  Green = "GREEN",
  SpecialtyWhite = "SPECIALTY_WHITE",
  OrganicHandcrafted = "ORGANIC_HANDCRAFTED",
}

export interface GPSCoordinate {
  lat: number;
  lng: number;
  elevationMeters?: number;
  timestamp?: string;
}

export interface STGProfile {
  id: string;
  name: string;
  assameseName?: string;
  teaBoardRegNo: string;
  district: "Jorhat" | "Dibrugarh" | "Tinsukia" | "Golaghat" | "Sonitpur" | "Sivasagar";
  estateName: string;
  polygonCoordinates: GPSCoordinate[];
  giCertified: boolean;
  walletAddress: string;
}

export interface PluckingRecord {
  growerId: string;
  growerName: string;
  gardenName: string;
  sectionId: string;
  gps: GPSCoordinate;
  estimatedWeightKg: number;
  verifiedWeightKg?: number;
  pluckingTime: string;
  weighbridgeId?: string;
}

export interface FactoryProcessingRecord {
  factoryId: string;
  factoryName: string;
  procType: ProcessingType;
  grade: string; // e.g. "BOP", "BP", "OF", "TGFOP1"
  intakeWeightKg: number;
  madeTeaWeightKg: number;
  witheringLossPct: number;
  fermentationDurationHrs: number;
  dryingTempC: number;
  completedTime: string;
}

export interface LabTestReport {
  certifierId: string;
  labName: string;
  accreditationNo: string; // NABL TC-XXXX
  ipfsHash: string;
  testDate: string;
  pesticideMRLStatus: "COMPLIANT" | "NON_COMPLIANT";
  parameters: {
    chemical: string;
    foundPpm: number;
    maxPermissibleLimitPpm: number;
    pass: boolean;
  }[];
  moisturePercentage: number;
  fssaiStandardMet: boolean;
}

export interface TeaBatch {
  id: string; // e.g. "ASM-2026-CTC-001"
  stage: BatchStage;
  plucking: PluckingRecord;
  processing?: FactoryProcessingRecord;
  labTest?: LabTestReport;
  auctionLotNo?: string;
  custodian: string;
  serializedQrCode: string;
  merkleLeafHash?: string;
  blockchainTxHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IoTTelemetry {
  sensorId: string;
  factoryId: string;
  chamber: "WITHERING_TROUGH" | "FERMENTATION_ROOM" | "DRYING_CHAMBER";
  temperatureCelsius: number;
  humidityPercentage: number;
  leafMoisturePercentage?: number;
  timestamp: string;
}
