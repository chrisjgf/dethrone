contract TokenContract():
    def burnFrom(_from: address, _value: uint256) -> bool: modifying

Transfer: event({_from: indexed(address), _to: indexed(address)})

owner: public(address)
token: public(address)
throne: public(address)
users: public(map(address, bytes32))
fee: public(uint256)

@public
def __init__(_token: address):
    self.owner = msg.sender
    self.token = _token

@private
def _transferThrone(_username: bytes32, _sender: address):
    current: address = self.throne
    self.throne = _sender
    self.users[_sender] = _username
    log.Transfer(current, self.throne)

# Must call allow() on token contract prior
@public
@payable
def claim(_username: bytes32):
    assert msg.value == 0, "ETH value must be 0"
    success: bool = TokenContract(self.token).burnFrom(msg.sender, self.fee) # amount to be hardcoded
    assert success, "not enough allowed tokens"
    self._transferThrone(_username, msg.sender)

# Owner
@public
def changeToken(_token: address):
    assert msg.sender == self.owner, "not owner"
    self.token = _token

@public
def changeOwner(_owner: address):
    assert msg.sender == self.owner, "not owner"
    self.owner = _owner

@public
def changeClaimFee(_fee: uint256):
    assert msg.sender == self.owner, "not owner"
    self.fee = _fee
