// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Escrow {
    enum EscrowStatus {
        Created,
        Locked,
        ReleaseRequested,
        Dispute,
        Refunded,
        Released
    }
    struct Deal {
        address buyer;
        address seller;
        address arbitrator;
        uint256 amount;
        EscrowStatus status;
    }
    
    uint256 public dealCounter;
    mapping(uint256 => Deal) public deals;

    // EVENTS (very important for viem)
    event DealCreated(uint256 dealId, address buyer, address seller, uint256 amount);
    event FundsLocked(uint256 dealId);
    event ReleaseRequested(uint256 dealId);
    event FundsReleased(uint256 dealId);
    event Refunded(uint256 dealId);
    event DisputeOpened(uint256 dealId);
    event DisputeResolved(uint256 dealId, bool releasedToSeller);

    modifier onlyBuyer(uint256 id) {
        require(msg.sender == deals[id].buyer, "Not buyer");
        _;
    }

    modifier onlySeller(uint256 id) {
        require(msg.sender == deals[id].seller, "Not seller");
        _;
    }

    modifier onlyArbitrator(uint256 id) {
        require(msg.sender == deals[id].arbitrator, "Not arbitrator");
        _;
    }

    modifier inStatus(uint256 id, EscrowStatus status) {
        require(deals[id].status == status, "Invalid status");
        _;
    }

    /// CREATE DEAL
    function createDeal(address seller, address arbitrator) external returns (uint256) {
        require(seller != address(0) && arbitrator != address(0), "Invalid address");

        dealCounter++;

        deals[dealCounter] = Deal({
            buyer: msg.sender,
            seller: seller,
            arbitrator: arbitrator,
            amount: 0,
            status: EscrowStatus.Created
        });

        emit DealCreated(dealCounter, msg.sender, seller, 0);

        return dealCounter;
    }

    /// LOCK FUNDS
    function lockFunds(uint256 id)
        external
        payable
        onlyBuyer(id)
        inStatus(id, EscrowStatus.Created)
    {
        require(msg.value > 0, "No funds");

        deals[id].amount = msg.value;
        deals[id].status = EscrowStatus.Locked;

        emit FundsLocked(id);
    }

    /// SELLER REQUEST RELEASE
    function requestRelease(uint256 id)
        external
        onlySeller(id)
        inStatus(id, EscrowStatus.Locked)
    {
        deals[id].status = EscrowStatus.ReleaseRequested;
        emit ReleaseRequested(id);
    }

    /// BUYER RELEASE FUNDS
    function releaseFunds(uint256 id)
        external
        onlyBuyer(id)
        inStatus(id, EscrowStatus.ReleaseRequested)
    {
        Deal storage d = deals[id];

        d.status = EscrowStatus.Released;

        payable(d.seller).transfer(d.amount);

        emit FundsReleased(id);
    }

    /// BUYER REFUND (before release)
    function refund(uint256 id)
        external
        onlyBuyer(id)
        inStatus(id, EscrowStatus.Locked)
    {
        Deal storage d = deals[id];

        d.status = EscrowStatus.Refunded;

        payable(d.buyer).transfer(d.amount);

        emit Refunded(id);
    }

    /// OPEN DISPUTE
    function openDispute(uint256 id)
        external
    {
        require(
            msg.sender == deals[id].buyer || msg.sender == deals[id].seller,
            "Not authorized"
        );

        require(
            deals[id].status == EscrowStatus.Locked ||
            deals[id].status == EscrowStatus.ReleaseRequested,
            "Cannot dispute"
        );

        deals[id].status = EscrowStatus.Dispute;

        emit DisputeOpened(id);
    }

    /// ARBITRATOR RESOLVE
    function resolveDispute(uint256 id, bool releaseToSeller)
        external
        onlyArbitrator(id)
        inStatus(id, EscrowStatus.Dispute)
    {
        Deal storage d = deals[id];

        if (releaseToSeller) {
            d.status = EscrowStatus.Released;
            payable(d.seller).transfer(d.amount);
        } else {
            d.status = EscrowStatus.Refunded;
            payable(d.buyer).transfer(d.amount);
        }

        emit DisputeResolved(id, releaseToSeller);
    }
}
