var express = require('express');
var router = express.Router();
const Web3 = require('web3');
var Tx = require('ethereumjs-tx');
//Remix
var contractAddr = '0xad153c5e12dB58a47f2454691b26582A430803fB';

//ABI of the contract 
var abi =
[
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "volume",
				"type": "uint256"
			}
		],
		"name": "setStock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockVolume",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
 
function init() {
  console.log("start"); 
 var TxObj = Tx.Transaction;
 //Ganache 
 const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
 web3.eth.getAccounts(console.log);
 let contractInstance = new web3.eth.Contract(abi, contractAddr);
 console.log("contractInstance");

 //MetaMask
 const account = '0x86EAa88890C8e2f43E1b9Ffc4893185186D03A9F';
 //MetaMask
 const privateKey = Buffer.from('76f954d4792d66b403b76a969a3557bcd52bcb6cbd6bae3dd97fea7d752c0c53', 'hex');
 
 //Call function setStock() of the contract Stock.sol
 const _data = contractInstance.methods.setStock('0x40', 10, 1).encodeABI();
 console.log(_data);
 var rawTx = {};
 web3.eth.getTransactionCount(account).then(nonce => {
 rawTx = {
 nonce: nonce,
 gasPrice: '0x20000000000',
 gasLimit: '0x41409',
 to: contractAddr,
 value: 0,
 data: _data
 }
 
 //Sign the transaction
 var tx = new TxObj(rawTx);
 tx.sign(privateKey);
 var serializedTx = tx.serialize();
 
 //Send signed transaction
 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
 .on('receipt', console.log);
 
 });
}

/* GET home page. */
router.get('/', function (req, res, next) {
  init();
  res.render('index', { title: 'Express' });
});

module.exports = router;
