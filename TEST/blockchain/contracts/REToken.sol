// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract REToken is ERC1155, Ownable {
    constructor() ERC1155("") {
    }

    function mint(address _to, uint256 _tokenId, uint256 _amount, string memory _tokenURI, bytes memory _data) public {
         _mint(_to, _tokenId, _amount, _data);
         _setURI(_tokenURI);
    }
}
