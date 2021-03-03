<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-btn @click="oracleUpdate">Deploy Oracle</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Web3 from "web3";

export default {
  name: "App",
  data() {
    return {
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "customerId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "serialNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "mpxn",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "totalUnits",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "lastMeterRead",
              type: "uint256",
            },
          ],
          name: "setMeterReading",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "customerId",
              type: "uint256",
            },
          ],
          name: "getLastMeterRead",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "customerId",
              type: "uint256",
            },
          ],
          name: "getMpxn",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "customerId",
              type: "uint256",
            },
          ],
          name: "getSerialNumber",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "customerId",
              type: "uint256",
            },
          ],
          name: "getTotalUnits",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      ganacheUrl: "http://127.0.0.1:7545",
    };
  },
  methods: {
    async oracleUpdate() {
      let provider = new Web3(new Web3.providers.HttpProvider(this.ganacheUrl));
      provider.eth.getAccounts((error, result) => {
        console.log("Address", result);
      });
      //From metamask
      let AddressOwner = "0x2afAD5799Fd9F9FB2d2b80d5319cBF951232394f";
      //From Remix
      let contractAddress = "0xBCA5A40EaE68a2E4f6b2F67854daDf8A34F0d393";
      let contractInstance = new provider.eth.Contract(this.abi, contractAddress);
      console.log("Contract instance", contractInstance);

      // let result = await fetch("http://localhost:8089/");
      // let json = await result.json();
      // console.log(`Price: ${json.customerId}`);
      // console.log(`Volume: ${json.serialNumber}`);
      // console.log(`Volume: ${json.mpxn}`);
      // console.log(`Volume: ${json.totalUnits}`);
      // console.log(`Volume: ${json.lastMeterRead}`);

      let json = {
        customerId: "1234",
        serialNumber: "1234",
        mpxn: "1234",
        totalUnits: "1234",
        lastMeterRead: "12-12-2021"
      }

      //Call the contract to set a meter reading data
      contractInstance.methods
        .setMeterReading(parseInt(json.customerId), parseInt(json.serialNumber), parseInt(json.mpxn), parseInt(json.totalUnits), parseInt(json.lastMeterRead))
        .send({ from: AddressOwner })
        .on("receipt", () => {
          console.log("Values Updated");
        });

      //Call the contract to get the the meter readings
      contractInstance.methods
        .getSerialNumber(parseInt(json.customerId))
        .send({ from: AddressOwner })
        .then((val) => {
          console.log("Serial Number: ", val);
        });

      //Call the contract to get the stock volume
      contractInstance.methods
        .getMpxn(parseInt(json.customerId))
        .send({ from: AddressOwner })
        .then((val) => {
          console.log("mpxn: ", val);
        });

      //Call the contract to get the stock volume
      contractInstance.methods
        .getTotalUnits(parseInt(json.customerId))
        .send({ from: AddressOwner })
        .then((val) => {
          console.log("Total Units: ", val);
        });

      //Call the contract to get the stock volume
      contractInstance.methods
        .getLastMeterRead(parseInt(json.customerId))
        .send({ from: AddressOwner })
        .then((val) => {
          console.log("Last Meter Update Time: ", val);
        });

    },
  },
};
</script>
