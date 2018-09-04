import { Meteor } from 'meteor/meteor';
import './statusEth.html';
import InputDataDecoder from 'ethereum-input-data-decoder';
import AbiDecoder from 'abi-decoder';
import Web3 from 'web3';

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
const contractAddress = '0xDc23DC9B9E662839D4Cd11A0Be1a3a3ccD537Da3';

Template.statusEth.onCreated(function () {
    
    console.log('Ethereum => Startup : Start');

    if (typeof web3 !== 'undefined') {
        console.log('Startup => Default');
        web3 = new Web3(web3.currentProvider);
    } else {
        // var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/3bbfffa6b6784103b0837affc974e4c0'));
        // var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/3bbfffa6b6784103b0837affc974e4c0'));
        // var web3 = new Web3(new Web3.providers.HttpProvider('http://ropsten.infura.io/v3/3bbfffa6b6784103b0837affc974e4c0'));
        var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8085'));
        console.log('Startup => Config');
    }
    // console.log('Startup => web3 Conneced : ', web3.isConnected());
    console.log('Startup => web3 Version : ', web3.version);
    console.log('Startup => web3 Given provider : ', web3.givenProvider);
    console.log('Startup => web3 Current provider : ', web3.currentProvider);
    web3.eth.getAccounts()
        .then(function (response) {
            console.log('Startup => web3 Accounts : ', response);
        })
        .catch(function (err) {
            console.log('Startup => web3 Accounts err : ', err);
        });


    // web3.eth.defaultAccount = '89f0f1dd760429db7b20e2c508c8f01ebbd9afb1';
    // web3.eth.defaultAccount = '0x36482b2cbd157f0f0a49152ec641f22d375b32c4';
    // web3.eth.defaultAccount = '0x885F5C73C4094A2161921744794D47Da6c846Ed9';
    web3.eth.defaultAccount = '0x539dfa3584a7fd493c7a0383efcf17d40ee6dbb3';
    // web3.eth.defaultAccount = '0x9332aA1ec4E4F624f28f83e91F5959374D39F4BA';

    // var account = web3.eth.accounts.create();
    // var account = web3.eth.accounts.privateKeyToAccount('0x5ab5cf01360ef0b6df115adda62d03bc4dd83183f3cb502bd8cefd7163b86ecb');
    // console.log('Startup => New Account : ', account);
    web3.eth.net.getId()
        .then(console.log);

    console.log('Startup => Account : ', web3.eth.defaultAccount);
    // web3.eth.personal.unlockAccount("0x539dfa3584a7fd493c7a0383efcf17d40ee6dbb3", "camarada", 300)
    // .then(function (response) {
    //     console.log('unlock => response :', response)
    // })
    // .catch(function (err) {
    //     console.log('unlock => err :', err)
    // });


    AbiDecoder.addABI(abi);
    const decoder = new InputDataDecoder(abi);
    console.log('Ethereum => Startup : Done');

    // var contract = new web3.eth.Contract(abi, contractAddress);
    // //var response = 
    // contract.methods
    //     .setMap('1', '1')
    //     .send({
    //         // from: '0x36482b2cbd157f0f0a49152ec641f22d375b32c4',
    //         // from: '0xa03894A98d307F1b062B6D489863d4B65A2F936E',
    //         // from: '0x9332aA1ec4E4F624f28f83e91F5959374D39F4BA',
    //         // from: '0xc7A92579AB90C8208D3838F4039AdC633A36B404',
    //         from : '0x539dfa3584a7fd493c7a0383efcf17d40ee6dbb3',
    //         gas: 150000,
    //         gasPrice: '300'
    //     })
    //     .then(function (response) {
    //         console.log('postContractMethod => response :', response)
    //     })
    //     .catch(function (err) {
    //         console.log('postContractMethod => err :', err)
    //     });


});

Template.statusEth.helpers({
    currentBlock() {
    },
    account() {
    },
    net() {
    },
    accountAddress() {
    }
});

// EthAccounts.find().fetch()[0]