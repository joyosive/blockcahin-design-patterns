// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721Token.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */

contract Creature is ERC721Token {
  constructor(address _proxyRegistryAddress) ERC721Token("JoyToken", "JOY", _proxyRegistryAddress) {  }

  function baseTokenURI() override public pure returns (string memory) {
    return "https://opensea-creatures-api.herokuapp.com/api/creature/";
  }
}
