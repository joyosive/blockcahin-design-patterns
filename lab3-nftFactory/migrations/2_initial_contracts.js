const Creature = artifacts.require("./Creature.sol");

module.exports = function(deployer, network) {
  // OpenSea proxy registry addresses for rinkeby and mainnet.
  let proxyRegistryAddress = ""
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0x86EAa88890C8e2f43E1b9Ffc4893185186D03A9F";
  } else {
    proxyRegistryAddress = "0xFF48758fcB78Bf3B7b7FA38659A6444f94e07313";
  }

  deployer.deploy(Creature, proxyRegistryAddress, {gas: 5000000});
};
