// https://dethrone.fyi

/*
* 88888    88888  888888  88  88  88888    8888   8888   88  88888
*  88  88   88       88    88  88  88  88  88  88  88 88  88  88
*  88   88  888      88    88  88  88  88  88  88  88  88 88  888
*  88   88  8888     88    888888  8888    88  88  88   8888  8888
*  88  88   88       88    88  88  88  88  88  88  88    888  88
*  8888     88888    88    88  88  88  88   8888   88     88  88888
*/

pragma solidity ^0.5.8;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Dethrone is ReentrancyGuard {
  address public owner;
  address public token;
  bytes4 public burnHash;

  mapping(address => bytes32) public usernames;
  address public throneOwner;

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
  }

  event Deposit(bytes32 indexed username, uint256 timestamp);

  /** Constructor */
  constructor(address _owner, address _token, bytes4 _burnHash) public {
    owner = _owner;
    token = _token;
    burnHash = _burnHash;
  }

  /** Public */
  function deposit(bytes32 _username) external payable nonReentrant {
    require(msg.value == 0, "ETH value is supposed to be 0 for ERC20 instance");
    _safeErc20Burn(1000000000000000000);
    // 18dp precision = 1?

    usernames[msg.sender] = _username;
    throneOwner = msg.sender;

    emit Deposit(_username, block.timestamp);
  }

  /** Internal */
  function _safeErc20Burn(uint256 _amount) internal {
    (bool success, bytes memory data) = token.call(abi.encodeWithSelector(burnHash, _amount));
    require(success, "not enough allowed tokens");

    if (data.length > 0) {
      require(data.length == 32, "data length should be either 0 or 32 bytes");
      success = abi.decode(data, (bool));
      require(success, "not enough allowed tokens. Token returns false.");
    }
  }

  /** Private */
  function changeOwner(address _newOwner) external onlyOwner {
    owner = _newOwner;
  }

  function changeToken(address _newToken) external onlyOwner {
    token = _newToken;
  }

  function changeBurnHash(bytes4 _newBurnHash) external onlyOwner {
    burnHash = _newBurnHash;
  }
}