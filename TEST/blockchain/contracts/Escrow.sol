// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./REToken.sol";
import "./MyRealEstate.sol";

contract Escrow {
    address reTokenAddress;
    address realEstateAddress;
    constructor(address _reToken, address _myRealEstate) {
        reTokenAddress = _reToken;
        realEstateAddress = _myRealEstate;
    }

    function sellProperty(uint256 _nftTokenId, address _seller, address _buyer, uint256 _amount, bytes memory _data) external {
        uint256 propertyPrice = MyRealEstate(realEstateAddress).getPropertyPrice(_nftTokenId);
        address propertyOwner = MyRealEstate(realEstateAddress).getPropertyOwner(_nftTokenId);
        bool isForSale = MyRealEstate(realEstateAddress).isPropertyForSale(_nftTokenId);
        uint256 buyersTokenBalance = MyRealEstate(realEstateAddress).getRETokenBalance(_buyer);

        require(propertyOwner == _seller, 'Seller does not owns the property');
        require(_buyer != address(0), 'ERC1155: address zero is not a valid account');
        require(_buyer != propertyOwner, 'ERC1155: Buyer is already owns the property');
        require(isForSale == true, 'Property is not for Sale');
        require(buyersTokenBalance >= propertyPrice, 'Buyer does not have sufficient balance to buy the property');
        REToken(reTokenAddress).safeTransferFrom(_buyer, _seller, 0, propertyPrice, _data);
        REToken(reTokenAddress).safeTransferFrom(_seller, _buyer, _nftTokenId, _amount, _data);
    }
}