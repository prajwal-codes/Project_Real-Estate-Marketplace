// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./REToken.sol";
import "./Escrow.sol";
//TODO: Burnable

/**
 * @title This is RealEstate Smart Contract.
 * @author Team Code Warriors.
 * @notice This contract is used to Buy/Sell RealEsate on blockchian.
 */
contract MyRealEstate {

    constructor(address _reTokenAddress) {
        _tokenIdCounter._value = 1;
        reTokenAddresss = _reTokenAddress;
        escrow = new Escrow(_reTokenAddress, address(this));
    }
    /**
     * @notice This structure is used to store properties which are avaiable for sale and their selling price.
     * 
     */
    struct PropertyForSale {
        uint256 price;
        bool isForSale;
    }
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;
    address reTokenAddresss;
    Escrow escrow;

    mapping(uint256 => PropertyForSale) public propertiesForSale;
    mapping(uint256 => address) private owners;

    event RNFTTokenMinted(uint256 id, string tokenURI, address owner);
    event ERC20TokenMinted(uint256 id, string tokenURI, address owner, uint256 amount);
    event PropertyListedForSale(uint256 nftTokenId, uint256 price, bool isForSale);
    event ERC20TokensTransferred(uint256 tokenId, uint256 amount, address buyer, string UPITxId);
    event PropertyTransferred(uint256 tokenId, address seller, address buyer, uint256 amount);

    function createNFTToken(address _to, string memory _tokenURI) public {
        // uint256 tokenId = 
        REToken(reTokenAddresss).mint(_to, _tokenIdCounter.current(), 1, _tokenURI, "");
        owners[_tokenIdCounter.current()] = _to;
        emit RNFTTokenMinted(_tokenIdCounter.current(), _tokenURI, _to);
        _tokenIdCounter.increment();
    }
    function PurchaseERC20Tokens(uint256 _amount, address _to, string memory _tokenURI, string memory _upiTxId) public {
        //TODO: setTokenURI in contstructor or in a separateFunction;
        require(_to != address(0), 'ERC1155: address zero is not a valid account');
        REToken(reTokenAddresss).mint(_to, 0, _amount, _tokenURI, "");
        emit ERC20TokenMinted(0, _tokenURI, _to, _amount);
        emit ERC20TokensTransferred(0, _amount, _to, _upiTxId);
    }
    function listPropertyForSale(uint256 _nftTokenId, uint256 _price, bool _isForSale) public {
        require(ERC1155(reTokenAddresss).balanceOf(msg.sender, _nftTokenId) == 1, 'Caller does not owns the property token');
        propertiesForSale[_nftTokenId].price = _price;
        propertiesForSale[_nftTokenId].isForSale = _isForSale;
        // REToken(reTokenAddresss).setApprovalForAll(address(escrow), true);
        emit PropertyListedForSale(_nftTokenId, _price, _isForSale);
    }
    function isPropertyForSale(uint256 _nftTokenId) public view returns (bool){
        return propertiesForSale[_nftTokenId].isForSale;
    }
    function getPropertyPrice(uint256 _nftTokenId) public view returns (uint256){
        return propertiesForSale[_nftTokenId].price;
    }
    function purchaseProperty(uint256 _nftTokenId) public {
        address _seller = owners[_nftTokenId];
        uint256 amount = propertiesForSale[_nftTokenId].price;
        // REToken(reTokenAddresss).setApprovalForAll(address(escrow), true);
        escrow.sellProperty(_nftTokenId, _seller, msg.sender,1, "");
        owners[_nftTokenId] = msg.sender;
        propertiesForSale[_nftTokenId].price = 100;
        propertiesForSale[_nftTokenId].isForSale = false;
        // REToken(reTokenAddresss).setApprovalForAll(address(escrow), false);
        emit PropertyTransferred(_nftTokenId, _seller, msg.sender, amount);
    }
    function getEscrowContractAddress() public view returns (address) {
        return address(escrow);
    }
    function getPropertyOwner(uint256 _nftTokenId) public view returns (address){
        return owners[_nftTokenId];
    }
    function getRETokenBalance(address account) public view returns (uint256){
        return ERC1155(reTokenAddresss).balanceOf(account, 0);
    }

    function getRETokenBalance() public view returns (uint256){
        return ERC1155(reTokenAddresss).balanceOf(msg.sender, 0);
    }
}
