// Documented here : https://github.com/kahmali/meteor-restivus#installation
// Just in case
import InputDataDecoder from 'ethereum-input-data-decoder';
import AbiDecoder from 'abi-decoder';
import Web3 from 'web3';
// const Web3 = require('web3')
// const AbiDecoder = require('abi-decoder');
// const InputDataDecoder = require('ethereum-input-data-decoder');

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

if (Meteor.isServer) {

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

    // web3.eth.defaultAccount = '89f0f1dd760429db7b20e2c508c8f01ebbd9afb1';
    // web3.eth.defaultAccount = '0x36482b2cbd157f0f0a49152ec641f22d375b32c4';
    web3.eth.defaultAccount = '0x539dfa3584a7fd493c7a0383efcf17d40ee6dbb3'; // The one configured on ethereum testnet having all the informacion
    console.log('Startup => Account : ', web3.eth.defaultAccount);

    AbiDecoder.addABI(abi);
    const decoder = new InputDataDecoder(abi);
    console.log('Ethereum => Startup : Done');

    // Global API configuration
    var Api = new Restivus({
        useDefaultAuth: true, // No idea why
        prettyJson: true // No idea why
    });

    // Maps to: /api/ethereum/transaction/:hash
    Api.addRoute('ethereum/transaction/:hash', { authRequired: false }, {
        get: function () {
            try {
                var transaction = web3.eth.getTransaction(this.urlParams.hash).await();
                var response = decoder.decodeData(transaction.input)
                //console.log('getTransaction : ', transaction);
                console.log('getTransaction => decode :', response);
                return response;
            } catch (err) {
                console.log('getTransaction => err', err);
                return err;
            }
        }
    });
    // Maps to: /api/ethereum/transactionStatus/:hash
    Api.addRoute('ethereum/transactionStatus/:hash', { authRequired: false }, {
        get: function () {
            try {
                var transactionStatus = web3.eth.getTransactionReceipt(this.urlParams.hash).await();
                var response = transactionStatus.status;
                console.log('getTransactionStatus => response :', transactionStatus);
                return response;
            } catch (err) {
                console.log('getTransactionStatus => err :', err);
                return err;
            }
        }
    });
    // Maps to: /api/ethereum/contract/:contract/method/:method
    Api.addRoute('ethereum/contract/:contract/method/:method', { authRequired: false }, {
        post: function () {
            try {
                var contract = new web3.eth.Contract(abi, contractAddress);
                console.log('postContractMethod => param test :', this.bodyParams);

                var responseRecipe = contract.methods
                    .setMap(this.bodyParams.hash, this.bodyParams.csv)
                    .send({
                        from: '0x539dfa3584a7fd493c7a0383efcf17d40ee6dbb3', // TODO : Change to cosnt
                        gas: 150000, // TODO : Precalculate
                        gasPrice: '300' // TODO : Precalculate
                    }).await();
                var responseData = contract.methods
                    .setMap(this.bodyParams.hash, this.bodyParams.csv)
                    .call({
                        from: '0x539dfa3584a7fd493c7a0383efcf17d40ee6dbb3', // TODO : Change to cosnt
                        gas: 150000, // TODO : Precalculate
                        gasPrice: '300' // TODO : Precalculate
                    }).await();

                response = {responseData , responseRecipe}

                console.log('postContractMethod => response :', response);
                return response;
            } catch (err) {
                console.log('postContractMethod => err :', err);
                return err;
            }
        }
    });
}
