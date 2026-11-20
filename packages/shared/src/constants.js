export const ASSAM_DISTRICTS = [
  "Jorhat",
  "Dibrugarh",
  "Tinsukia",
  "Golaghat",
  "Sivasagar",
  "Sonitpur",
  "Cachar",
];

export const TRA_PPC_PESTICIDE_LIMITS = [
  { chemical: "Emamectin Benzoate", maxPpm: 0.05, unit: "ppm" },
  { chemical: "Quinalphos", maxPpm: 0.01, unit: "ppm" },
  { chemical: "Hexaconazole", maxPpm: 0.10, unit: "ppm" },
  { chemical: "Thiamethoxam", maxPpm: 0.05, unit: "ppm" },
  { chemical: "Propargite", maxPpm: 5.00, unit: "ppm" },
  { chemical: "Azoxystrobin", maxPpm: 0.10, unit: "ppm" },
];

export const SAMPLE_GROWERS = [
  {
    id: "STG-JHT-001",
    name: "Mukund Saikia",
    assameseName: "মুকুন্দ শইকীয়া",
    teaBoardRegNo: "TB-AS-JHT-44012",
    district: "Jorhat",
    estateName: "Borbhetta Smallholding Cluster #4",
    giCertified: true,
    walletAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    polygonCoordinates: [
      { lat: 26.7512, lng: 94.2155 },
      { lat: 26.7535, lng: 94.2182 },
      { lat: 26.7508, lng: 94.2210 },
      { lat: 26.7485, lng: 94.2178 },
    ],
  },
  {
    id: "STG-DIB-002",
    name: "Pronab Gogoi",
    assameseName: "প্ৰণৱ গগৈ",
    teaBoardRegNo: "TB-AS-DIB-18920",
    district: "Dibrugarh",
    estateName: "Moran Small Tea Growers Co-Op",
    giCertified: true,
    walletAddress: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    polygonCoordinates: [
      { lat: 27.2845, lng: 94.9211 },
      { lat: 27.2882, lng: 94.9256 },
      { lat: 27.2851, lng: 94.9302 },
      { lat: 27.2818, lng: 94.9248 },
    ],
  },
  {
    id: "EST-TIN-003",
    name: "Doom Dooma Heritage Estate",
    teaBoardRegNo: "TB-AS-TIN-00108",
    district: "Tinsukia",
    estateName: "Doom Dooma Division North",
    giCertified: true,
    walletAddress: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    polygonCoordinates: [
      { lat: 27.5688, lng: 95.5712 },
      { lat: 27.5745, lng: 95.5789 },
      { lat: 27.5692, lng: 95.5862 },
      { lat: 27.5634, lng: 95.5791 },
    ],
  },
];
