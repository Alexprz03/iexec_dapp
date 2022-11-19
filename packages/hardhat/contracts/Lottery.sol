//SPDX-License-Identifier: MIT 

pragma solidity >=0.7.0 <0.9.0;

interface IERC721 {
  function safeMint(address to, uint256 tokenId) external;
}

interface iSimpleOracleStorage {
  function getOracleData() external;
  function get() external view returns (int256, uint256);
}

contract Lottery {
  address public admin;
  address[] public players;

  enum STATE { OPEN, CLOSED }
  STATE public state = STATE.CLOSED;
  uint256 public participationFees;
  uint256 public nbNFT;

  IERC721 collection;
  iSimpleOracleStorage randomOracle;

  event Winner(address indexed _address, uint256 indexed _tokenId, uint256 _timestamp);

  constructor(address _collectionAddress, address _randomOracle){
    collection = IERC721(_collectionAddress);
    admin = msg.sender;
    participationFees = 0.001 ether;
    nbNFT = 1;
    randomOracle = iSimpleOracleStorage(_randomOracle);
  }
  
  modifier onlyAdmin(){
    require(msg.sender == admin);
    _;
  }

  function getBalance() public view returns (uint) {
      return address(this).balance;
  }

  function withdrawLiquidity(address payable _address) public onlyAdmin{
      _address.transfer(address(this).balance);
  }

  function setAdmin(address _admin) public onlyAdmin{
      admin = _admin;
  }

  function setNewLottery(address _newCollection, uint256 _newNbNFT) public onlyAdmin {
    require(state == STATE.CLOSED, "the lottery is already open");
    collection = IERC721(_newCollection);
    nbNFT = _newNbNFT;
  }

  function start() public onlyAdmin{
    require(state == STATE.CLOSED, "the lottery is already open");
    state = STATE.OPEN;
  }

  function endLottery() public onlyAdmin{
    require(state == STATE.OPEN, "the lottery is not open");
    require(players.length > 0, "Lottery should have at least one participant.");
    state = STATE.CLOSED;

    for(uint256 i = 1; i <= nbNFT; i++) {
      uint256 index = _randomNumber() % players.length;
      collection.safeMint(players[index], i);
      emit Winner(players[index], i, block.timestamp);    
    }
  }

  function enter() public payable{
      require(msg.value >= participationFees);
      require(state ==STATE.OPEN, "the lottery is not open");
      players.push(msg.sender);
  }

  function _randomNumber() private returns (uint256) {
    randomOracle.getOracleData();
    (int256 getRandom, uint256 date) = randomOracle.get();
    uint randomNumber = uint(keccak256(abi.encodePacked(getRandom,date)));
    return randomNumber;
  }
}