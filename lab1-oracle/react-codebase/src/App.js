import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";

var abi = [
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
]

var ganacheUrl = "HTTP://127.0.0.1:7545";


function App(){

    async function clickHandler(e){
        e.preventDefault();
        let provider = new Web3(new Web3.providers.HttpProvider(ganacheUrl));
        provider.eth.getAccounts((error, result) => {
            console.log("Address", result);
        });
        //From metamask
        let AddressOwner = "0x6E76fdccaC3886A73F5A8ADDf2D95d627aC05283";
        //From Remix
        let contractAddress = "0x167f03231e54031Cb582d4c3c728f4555a982b3C";
        let contractInstance = new provider.eth.Contract(abi, contractAddress);
        console.log("Contract instance", contractInstance);

        let result = await fetch("http://localhost:3001/");
        let json = await result.json();
        console.log(`Price: ${json.price}`);
        console.log(`Volume: ${json.volume}`);

        //Call the contract to set a stock
        let symbol = "0x6a6f79";
        contractInstance.methods.setStock(symbol, parseInt(json.price), parseInt(json.volume)).send({from: AddressOwner}).on('receipt', () => {
            console.log("set stock values");
        });

        //Call the contract to get the stock price
        contractInstance.methods.getStockPrice(symbol).send({from: AddressOwner}).then(val => {
            console.log("stock price", val);
        });

        //Call the contract to get the stock volume
        contractInstance.methods.getStockVolume(symbol).send({from: AddressOwner}).then(val => {
            console.log("stock volume", val);
        });
    }
    return(
        <div className="App">
            <button onClick={clickHandler}> Click me! </button>
        </div>
    );
}

export default App;