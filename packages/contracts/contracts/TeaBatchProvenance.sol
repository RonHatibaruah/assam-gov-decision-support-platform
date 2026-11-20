// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "./TeaRegistry.sol";

/**
 * @title TeaBatchProvenance
 * @dev End-to-End Cryptographic Traceability Ledger for Assam Tea
 * Solves NESFIC-I-08: From Small Tea Grower (STG) bush to global consumer cup
 */
contract TeaBatchProvenance {
    enum Stage {
        Plucked,
        CollectionWeighed,
        FactoryProcessed,
        LabCertified,
        AuctionTransferred,
        RetailPackaged
    }

    enum ProcessingType { CTC, Orthodox, Green, SpecialtyWhite, OrganicHandcrafted }

    struct PluckingRecord {
        address grower;
        string gardenName;
        string sectionId;
        string gpsCoordinates;   // "26.7509,94.2037" (Latitude, Longitude)
        uint256 weightKg;        // in grams or 0.1 kg (e.g. 2500 for 250.0 kg)
        uint256 pluckingTime;
    }

    struct ProcessingRecord {
        address factory;
        ProcessingType procType;
        string grade;            // e.g., "BOP", "BP", "OF", "TGFOP1"
        uint256 madeTeaWeightKg;
        uint256 witheringLossPct;
        uint256 dryingTempC;
        uint256 completedTime;
    }

    struct LabCertification {
        address certifier;
        string labName;
        string ipfsCertificateHash; // IPFS CID of NABL accredited report
        bool isPesticideMRLCompliant;
        uint256 moistureContentPpm; // e.g. 350 for 3.5%
        uint256 certifiedTime;
    }

    struct TeaBatch {
        string batchId;           // Human readable e.g. "ASM-2026-CTC-001"
        Stage currentStage;
        PluckingRecord plucking;
        ProcessingRecord processing;
        LabCertification labCert;
        string auctionLotNo;      // GTAC Lot #
        address currentCustodian;
        string serializedQrHash;  // Hash of unique package serial tokens
        bytes32 merkleRoot;       // Cryptographic state root
        uint256 createdAt;
        uint256 updatedAt;
    }

    TeaRegistry public registry;
    uint256 public totalBatches;

    mapping(string => TeaBatch) private batches;
    mapping(bytes32 => string) private qrHashToBatchId;
    string[] public batchIds;

    // Periodic state-root anchors for bulk STG plucking records
    struct MerkleAnchor {
        bytes32 rootHash;
        uint256 batchCount;
        uint256 timestamp;
        address submitter;
    }
    MerkleAnchor[] public anchoredRoots;

    event BatchPlucked(string indexed batchId, address indexed grower, uint256 weightKg, string gpsCoordinates);
    event BatchWeighedAtCollection(string indexed batchId, uint256 verifiedWeightKg, address collector);
    event BatchProcessed(string indexed batchId, address indexed factory, ProcessingType procType, string grade, uint256 madeTeaWeightKg);
    event BatchLabCertified(string indexed batchId, address indexed certifier, bool isMRLCompliant, string ipfsHash);
    event CustodyTransferred(string indexed batchId, address indexed from, address indexed to, string details);
    event BatchPackagedWithQR(string indexed batchId, bytes32 indexed qrHash, string serializedToken);
    event MerkleRootAnchored(bytes32 indexed rootHash, uint256 batchCount, uint256 indexed index);

    modifier onlyRegistered() {
        TeaRegistry.Stakeholder memory s = registry.getStakeholder(msg.sender);
        require(s.isActive, "Caller is not an active registered stakeholder");
        _;
    }

    constructor(address _registryAddress) {
        require(_registryAddress != address(0), "Invalid registry");
        registry = TeaRegistry(_registryAddress);
    }

    /**
     * @notice Step 1: Small Tea Grower or Estate plucks fresh green leaf
     */
    function recordPlucking(
        string calldata batchId,
        string calldata gardenName,
        string calldata sectionId,
        string calldata gpsCoordinates,
        uint256 weightKg
    ) external onlyRegistered {
        require(bytes(batches[batchId].batchId).length == 0, "Batch ID already exists");
        require(weightKg > 0, "Weight must be > 0");

        TeaBatch storage b = batches[batchId];
        b.batchId = batchId;
        b.currentStage = Stage.Plucked;
        b.plucking = PluckingRecord({
            grower: msg.sender,
            gardenName: gardenName,
            sectionId: sectionId,
            gpsCoordinates: gpsCoordinates,
            weightKg: weightKg,
            pluckingTime: block.timestamp
        });
        b.currentCustodian = msg.sender;
        b.createdAt = block.timestamp;
        b.updatedAt = block.timestamp;

        batchIds.push(batchId);
        totalBatches++;

        emit BatchPlucked(batchId, msg.sender, weightKg, gpsCoordinates);
    }

    /**
     * @notice Step 2: Collection center weighs green leaves on digital weighbridge
     */
    function recordCollectionWeighbridge(
        string calldata batchId,
        uint256 verifiedWeightKg
    ) external onlyRegistered {
        TeaBatch storage b = batches[batchId];
        require(bytes(b.batchId).length > 0, "Batch not found");
        require(b.currentStage == Stage.Plucked, "Invalid stage transition");

        b.plucking.weightKg = verifiedWeightKg;
        b.currentStage = Stage.CollectionWeighed;
        b.currentCustodian = msg.sender;
        b.updatedAt = block.timestamp;

        emit BatchWeighedAtCollection(batchId, verifiedWeightKg, msg.sender);
    }

    /**
     * @notice Step 3: Factory processes green leaves into Made Tea (CTC or Orthodox)
     */
    function recordProcessing(
        string calldata batchId,
        ProcessingType procType,
        string calldata grade,
        uint256 madeTeaWeightKg,
        uint256 witheringLossPct,
        uint256 dryingTempC
    ) external onlyRegistered {
        TeaBatch storage b = batches[batchId];
        require(bytes(b.batchId).length > 0, "Batch not found");
        require(b.currentStage == Stage.CollectionWeighed || b.currentStage == Stage.Plucked, "Must be weighed first");

        b.processing = ProcessingRecord({
            factory: msg.sender,
            procType: procType,
            grade: grade,
            madeTeaWeightKg: madeTeaWeightKg,
            witheringLossPct: witheringLossPct,
            dryingTempC: dryingTempC,
            completedTime: block.timestamp
        });
        b.currentStage = Stage.FactoryProcessed;
        b.currentCustodian = msg.sender;
        b.updatedAt = block.timestamp;

        emit BatchProcessed(batchId, msg.sender, procType, grade, madeTeaWeightKg);
    }

    /**
     * @notice Step 4: Accredited lab submits pesticide MRL & quality attestation
     */
    function recordLabCertification(
        string calldata batchId,
        string calldata labName,
        string calldata ipfsCertificateHash,
        bool isPesticideMRLCompliant,
        uint256 moistureContentPpm
    ) external onlyRegistered {
        TeaBatch storage b = batches[batchId];
        require(bytes(b.batchId).length > 0, "Batch not found");
        require(b.currentStage == Stage.FactoryProcessed, "Must be processed first");

        b.labCert = LabCertification({
            certifier: msg.sender,
            labName: labName,
            ipfsCertificateHash: ipfsCertificateHash,
            isPesticideMRLCompliant: isPesticideMRLCompliant,
            moistureContentPpm: moistureContentPpm,
            certifiedTime: block.timestamp
        });
        b.currentStage = Stage.LabCertified;
        b.updatedAt = block.timestamp;

        emit BatchLabCertified(batchId, msg.sender, isPesticideMRLCompliant, ipfsCertificateHash);
    }

    /**
     * @notice Step 5: GTAC Auction lot assignment and custody handover
     */
    function recordAuctionTransfer(
        string calldata batchId,
        string calldata auctionLotNo,
        address newCustodian
    ) external onlyRegistered {
        TeaBatch storage b = batches[batchId];
        require(bytes(b.batchId).length > 0, "Batch not found");
        require(b.currentCustodian == msg.sender, "Caller not current custodian");

        b.auctionLotNo = auctionLotNo;
        b.currentCustodian = newCustodian;
        b.currentStage = Stage.AuctionTransferred;
        b.updatedAt = block.timestamp;

        emit CustodyTransferred(batchId, msg.sender, newCustodian, auctionLotNo);
    }

    /**
     * @notice Step 6: Retail packaging and serialized QR minting
     */
    function recordPackaging(
        string calldata batchId,
        bytes32 qrHash,
        string calldata serializedToken
    ) external onlyRegistered {
        TeaBatch storage b = batches[batchId];
        require(bytes(b.batchId).length > 0, "Batch not found");
        require(qrHashToBatchId[qrHash] == bytes32(0), "QR Hash collision");

        b.serializedQrHash = serializedToken;
        qrHashToBatchId[qrHash] = batchId;
        b.currentStage = Stage.RetailPackaged;
        b.updatedAt = block.timestamp;

        emit BatchPackagedWithQR(batchId, qrHash, serializedToken);
    }

    /**
     * @notice Anchor Merkle Root for off-chain batch aggregation
     */
    function anchorMerkleRoot(bytes32 rootHash, uint256 batchCount) external onlyRegistered {
        require(rootHash != bytes32(0), "Invalid root hash");
        anchoredRoots.push(MerkleAnchor({
            rootHash: rootHash,
            batchCount: batchCount,
            timestamp: block.timestamp,
            submitter: msg.sender
        }));

        emit MerkleRootAnchored(rootHash, batchCount, anchoredRoots.length - 1);
    }

    /**
     * @notice Consumer lookup: Instant verification of entire provenance story
     */
    function getBatch(string calldata batchId) external view returns (TeaBatch memory) {
        require(bytes(batches[batchId].batchId).length > 0, "Batch not found");
        return batches[batchId];
    }

    function getBatchByQrHash(bytes32 qrHash) external view returns (TeaBatch memory) {
        string memory bId = qrHashToBatchId[qrHash];
        require(bytes(bId).length > 0, "QR Code not registered");
        return batches[bId];
    }

    function getAnchoredRootsCount() external view returns (uint256) {
        return anchoredRoots.length;
    }
}
