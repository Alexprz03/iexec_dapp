// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

abstract contract Oracle {
    function getInt(bytes32) public view virtual returns (int256, uint256);
} 

contract TestOracleStorage {
    int256  storedValue;
    uint256 storedDate;
    event valueChanged(int256 newValue, uint256 newDate);
    address oracleAddress = 0x36dA71ccAd7A67053f0a4d9D5f55b725C9A25A3E;
    bytes32 public _oracleId = 0xd275c4116f1576d1235bda4b420a4167f57ce041a5b0efdace07ce2cd78c5151;

    function getOracleData() public {
        storedValue = 135;
        storedDate = block.timestamp;
        emit valueChanged(storedValue, storedDate);
    }

    function get() public view returns (int256, uint256) {
        return (storedValue, storedDate);
    }
}