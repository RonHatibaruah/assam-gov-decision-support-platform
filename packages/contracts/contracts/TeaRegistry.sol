// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

/**
 * @title TeaRegistry
 * @dev Manages registered stakeholders, Assam tea garden boundaries, and TRA Tocklai GI certifications
 * Part of NESFIC-I-08: End-to-End Digital Traceability across the Assam Tea Value Chain
 */
contract TeaRegistry {
    enum StakeholderRole { None, SmallTeaGrower, LargeEstate, FactoryBLF, LabCertifier, AuctionBroker, Retailer, TRAAdmin }

    struct Stakeholder {
        address account;
        string name;
        StakeholderRole role;
        string district;       // e.g. "Jorhat", "Dibrugarh", "Tinsukia", "Golaghat"
        string teaBoardRegId;   // Tea Board of India Registration ID
        string geoJsonHash;     // IPFS hash of verified plantation polygon
        bool isGIAuthorized;    // Certified under Assam GI (Geographical Indication) Tag
        bool isActive;
        uint256 registeredAt;
    }

    address public traAdmin;
    uint256 public totalStakeholders;

    mapping(address => Stakeholder) public stakeholders;
    mapping(string => address) public regIdToAddress;

    event StakeholderRegistered(address indexed account, string name, StakeholderRole role, string district);
    event GICertificationUpdated(address indexed account, bool isAuthorized, string reason);
    event AdminTransferred(address indexed oldAdmin, address indexed newAdmin);

    modifier onlyAdmin() {
        require(msg.sender == traAdmin, "TeaRegistry: Caller is not TRA Admin");
        _;
    }

    modifier onlyActive(address account) {
        require(stakeholders[account].isActive, "TeaRegistry: Stakeholder is inactive");
        _;
    }

    constructor() {
        traAdmin = msg.sender;
        // Register deployer as primary TRA Tocklai Admin
        stakeholders[msg.sender] = Stakeholder({
            account: msg.sender,
            name: "Tea Research Association (TRA) Tocklai",
            role: StakeholderRole.TRAAdmin,
            district: "Jorhat",
            teaBoardRegId: "TRA-TOCKLAI-HQ",
            geoJsonHash: "QmTRAHQJorhatAssamGISCenter",
            isGIAuthorized: true,
            isActive: true,
            registeredAt: block.timestamp
        });
        totalStakeholders = 1;
    }

    function registerStakeholder(
        address account,
        string calldata name,
        StakeholderRole role,
        string calldata district,
        string calldata teaBoardRegId,
        string calldata geoJsonHash,
        bool isGIAuthorized
    ) external onlyAdmin {
        require(account != address(0), "Invalid address");
        require(stakeholders[account].role == StakeholderRole.None, "Already registered");
        require(regIdToAddress[teaBoardRegId] == address(0), "Reg ID already in use");

        stakeholders[account] = Stakeholder({
            account: account,
            name: name,
            role: role,
            district: district,
            teaBoardRegId: teaBoardRegId,
            geoJsonHash: geoJsonHash,
            isGIAuthorized: isGIAuthorized,
            isActive: true,
            registeredAt: block.timestamp
        });

        regIdToAddress[teaBoardRegId] = account;
        totalStakeholders++;

        emit StakeholderRegistered(account, name, role, district);
    }

    function setGICertification(address account, bool isAuthorized, string calldata reason) external onlyAdmin {
        require(stakeholders[account].isActive, "Stakeholder not found/inactive");
        stakeholders[account].isGIAuthorized = isAuthorized;
        emit GICertificationUpdated(account, isAuthorized, reason);
    }

    function getStakeholder(address account) external view returns (Stakeholder memory) {
        return stakeholders[account];
    }

    function isStakeholderRole(address account, StakeholderRole role) external view returns (bool) {
        return stakeholders[account].isActive && stakeholders[account].role == role;
    }

    function transferAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "Invalid new admin");
        emit AdminTransferred(traAdmin, newAdmin);
        traAdmin = newAdmin;
    }
}
