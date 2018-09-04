import { Meteor } from 'meteor/meteor';
import './statusEth.html';
import Web3 from 'web3';
// const decodeConstructorArgs = require('canoe-solidity');
const abiDecoder = require('abi-decoder');
const InputDataDecoder = require('ethereum-input-data-decoder');

var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/3bbfffa6b6784103b0837affc974e4c0'));

var ethAddress;
const abi =
    [{
        "constant": false, "inputs": [], "name": "changeStatus", "outputs":
            [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "function"
    },
    {
        "constant": false, "inputs": [{ "name": "_hash", "type": "string" }, { "name": "_csv", "type": "string" }],
        "name": "setMap", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" },
        { "name": "", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "function"
    },
    { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];


    
abiDecoder.addABI(abi);
const address = '0xDc23DC9B9E662839D4Cd11A0Be1a3a3ccD537Da3';

const decoder = new InputDataDecoder(abi);

//web3.eth.defaultAccount = EthAccounts.find().fetch()[0].address;
 const contract = web3.eth.contract(abi).at(address);


Template.statusEth.onCreated(function () {
    EthBlocks.init();
    EthAccounts.init();


    var tx = contract.setMap('1', '1', function (error, transactionHash) {
        if (!error)
            console.log(transactionHash);
    });
    web3.eth.getTransaction('0x7facba3e3ca1a64ad73db776f7f82623fe833274340915a66cc5e33e1565f991', function (err, result) {
        if (!err) {
        console.log('getTransaction : ',result);
        console.log('getTransaction => decoder :', decoder.decodeData(result.input))
        //console.log('getTransaction => input :', web3.toAscii(result.input));
    }
    });
    // web3.eth.getStorageAt('0xDc23DC9B9E662839D4Cd11A0Be1a3a3ccD537Da3', 0, function (err, result) {
    //     if (!err) {
    //         console.log('getStorageAt : ', result);
    //         //console.log(abiDecoder.decodeMethod(result));
    //     }
    // });
    // console.log('Contract :', contract); // Just seeing my contract
    // console.log('Tx : ', tx)
    web3.eth.getTransactionReceipt('0x7facba3e3ca1a64ad73db776f7f82623fe833274340915a66cc5e33e1565f991', function (err, result) {
        if (!err) {
        console.log('getTransactionReceipt : ',result);
        console.log('getTransactionReceipt => status : ', web3.toDecimal(result.status)); //1 done //0 not
        //console.log('getTransaction => input :', web3.toAscii(result.input));
    }
    });
});

Template.statusEth.helpers({
    currentBlock() {
        return EthBlocks.latest.number;
    },
    account() {
        return EthAccounts.find().fetch();
    },
    net() {
    },
    accountAddress() {
        return ethAddress;
    }
});

// EthAccounts.find().fetch()[0]