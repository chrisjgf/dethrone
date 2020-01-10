// https://dethrone.fyi

/*
* 8888    88888  888888  88  88  88888    8888   8888   88  88888
* 88 88   88       88    88  88  88  88  88  88  88 88  88  88
* 88  88  888      88    88  88  88  88  88  88  88  88 88  888
* 88  88  8888     88    888888  8888    88  88  88   8888  8888
* 88 88   88       88    88  88  88  88  88  88  88    888  88
* 8888    88888    88    88  88  88  88   8888   88     88  88888
*/

pragma solidity ^0.5.8;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Dethrone is ReentrancyGuard {
  address public owner;
  mapping(bytes32 => bool) public usernames;

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
  }

  event Deposit(bytes32 indexed username, uint256 timestamp);

  /** Constructor */
  constructor(address _owner) public {
    owner = _owner;
  }

  /** Public */
  function deposit(bytes32 _commitment) external payable nonReentrant {
    require(msg.value == 0, "ETH value is supposed to be 0 for ERC20 instance");
    _safeErc20TransferFrom(msg.sender, address(this), denomination);

    emit Deposit(_commitment, block.timestamp);
  }

  /** Internal */
  function _safeErc20TransferFrom(address _from, address _to, uint256 _amount) internal {
    (bool success, bytes memory data) = token.call(abi.encodeWithSelector(/* functionHashHere */, _from, _to, _amount));
    require(success, "not enough allowed tokens");

    // if contract returns some data lets make sure that is `true` according to standard
    if (data.length > 0) {
      require(data.length == 32, "data length should be either 0 or 32 bytes");
      success = abi.decode(data, (bool));
      require(success, "not enough allowed tokens. Token returns false.");
    }
  }

  function _safeErc20Transfer(address _to, uint256 _amount) internal {
    (bool success, bytes memory data) = token.call(abi.encodeWithSelector(/* functionHashHere */, _to, _amount));
    require(success, "not enough tokens");

    // if contract returns some data lets make sure that is `true` according to standard
    if (data.length > 0) {
      require(data.length == 32, "data length should be either 0 or 32 bytes");
      success = abi.decode(data, (bool));
      require(success, "not enough tokens. Token returns false.");
    }
  }

  /** Private */
  function changeOwner(address _newOwner) external onlyOwner {
    owner = _newOwner;
  }
}