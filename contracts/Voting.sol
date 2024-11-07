// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address owner;
    mapping (address => bool) voters;

    uint256 public votingStart;
    uint256 public votingEnd;

    constructor (string[] memory _candidatesNames, uint256 _durationInMinutes) {
        for (uint256 i =0; i < _candidatesNames.length; i++) {
            candidates.push(Candidate({
                name: _candidatesNames[i],
                voteCount: 0
            }));
            owner = msg.sender;
            votingStart = block.timestamp;
            votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
        }
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate({
            name: _name,
            voteCount: 0
        }));
    }

    function vote(uint _candidateIndex) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");
        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }

    function getAllVotesOfCandiates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= votingStart, "Voting has not started yet.");
        if(block.timestamp > votingEnd){
            return 0;
        }
        return votingEnd - block.timestamp;
    }

}