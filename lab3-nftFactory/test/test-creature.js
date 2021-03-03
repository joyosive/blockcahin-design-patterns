const BigNumber = require("bignumber.js");
const truffleAssert = require("truffle-assertions");
const Creature = artifacts.require("Creature");

const zeroAddr = "0x0000000000000000000000000000000000000000";

const helpAreBNsEqual = (_left, _right) => {
  return new BigNumber(_left).isEqualTo(new BigNumber(_right));
};

contract("Creature", accounts => {

  describe("Initial Deployment", () => {
    it("should deploy and assert a truthy instance", async () => {
      const instance = await Creature.deployed();
      assert.isTrue(instance ? true : false);
    });

    it("should name()", async () => {
      const instance = await Creature.deployed();

      const nameExpected = "JoyToken";
      const name = await instance.name.call({ from: accounts[0] });
      assert.equal(name, nameExpected, `name '${name}' not expected '${nameExpected}'`);
    });

    it("should symbol()", async () => {
      const instance = await Creature.deployed();

      const symbolExpected = "Joy";
      const symbol = await instance.symbol.call({ from: accounts[0] });
      assert.equal(symbol, symbolExpected, `symbol '${symbol}' not expected '${symbolExpected}'`);
    });
  });

  describe("Initial Functionality", () => {
    it("should baseTokenURI()", async () => {
      const instance = await Creature.deployed();

      const baseURIExpected = "https://opensea-creatures-api.herokuapp.com/api/creature/";
      const baseURI = await instance.baseTokenURI.call({ from: accounts[0] })
      assert.equal(baseURI, baseURIExpected, `baseTokenURI '${baseURI}' not expected '${baseURIExpected}'`);
    });
  });

  describe("Reverts", () => {
    it("should 'Contract: err'", async () => {
      const instance = await Creature.deployed();
    });
  });
});
