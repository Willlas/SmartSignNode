// Documented here : https://github.com/kahmali/meteor-restivus#installation
// Just in case
import InputDataDecoder from 'ethereum-input-data-decoder';
import AbiDecoder from 'abi-decoder';
import Web3 from 'web3';
import stringHash from 'string-hash';

// Configuration const. TODO : file
const abi =[{"constant":false,"inputs":[],"name":"deprecate","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tableRegisters","outputs":[{"name":"hashData","type":"int256"},{"name":"index","type":"uint256"},{"name":"codedData","type":"string"},{"name":"csv","type":"string"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_hashData","type":"int256"},{"name":"_codedData","type":"string"},{"name":"_csv","type":"string"},{"name":"_timestamp","type":"uint256"}],"name":"setNewRegister","outputs":[{"name":"","type":"int256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"int256"}],"name":"mappingSignRegister","outputs":[{"name":"hashData","type":"int256"},{"name":"index","type":"uint256"},{"name":"codedData","type":"string"},{"name":"csv","type":"string"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hashData","type":"int256"}],"name":"isRepeated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"hashData","type":"int256"},{"name":"csv","type":"string"}],"name":"getRegister","outputs":[{"name":"","type":"int256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
const contractAddress = '0x1990091F0fD536938D49effd561C8F141Fdc5C87';
const accountAddress = '0x539dfa3584a7fd493c7a0383efcf17d40ee6dbb3';
const gasPrice = '1000000000';

if (Meteor.isServer) {
    
    //
    // Start up
    //

    console.log('Ethereum => Startup : Start');
    
    // Check if there is a provider yet. This is kind stupid because was thought for browser, where you can use metamask as inject, but in backend nvm 
    if (typeof web3 !== 'undefined') {
        console.log('Startup => Default');
        web3 = new Web3(web3.currentProvider);
    } else {
        // The port and direction must be known before all of this, this is my own go etehreeum node
        var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8085'));
        console.log('Startup => Config');
    }
    console.log('Startup => web3 Version : ', web3.version);
    console.log('Startup => web3 Given provider : ', web3.givenProvider);
    console.log('Startup => web3 Current provider : ', web3.currentProvider);

    // Configuer the dealer account, in this case  im going to be the only dealer
    web3.eth.defaultAccount = accountAddress; 
    console.log('Startup => Account : ', web3.eth.defaultAccount);

    // Decoder, this is for decode a transaction input, if you dont want to check the contracts (its free)
    AbiDecoder.addABI(abi);
    const decoder = new InputDataDecoder(abi);
    console.log('Ethereum => Startup : Done');

    //
    // End of Start up
    // 

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
    // Maps to: /api/ethereum/contract
    Api.addRoute('ethereum/contract', { authRequired: false }, {
        post: function () {
            try {
                var contract = new web3.eth.Contract(abi, contractAddress);

                var gasLimit = contract.methods
                    .setNewRegister(stringHash(this.bodyParams.hash),this.bodyParams.hash, this.bodyParams.csv, Date.now())
                    .estimateGas({from: web3.eth.defaultAccount})
                    .await()

                console.log('postContractMethod => gas Limit :', gasLimit);

                var responseRecipe = contract.methods
                    .setNewRegister(stringHash(this.bodyParams.hash), this.bodyParams.hash, this.bodyParams.csv, Date.now())
                    .send({
                        from: web3.eth.defaultAccount, 
                        gas: gasLimit, 
                        gasPrice: gasPrice 
                    }).await();
                var responseData = contract.methods
                    .setNewRegister(stringHash(this.bodyParams.hash),this.bodyParams.hash, this.bodyParams.csv, Date.now())
                    .call({
                        from: web3.eth.defaultAccount, 
                        gas: gasLimit, 
                        gasPrice: gasPrice
                    }).await();

                response = { responseData, responseRecipe }

                console.log('postContractMethod => response :', response);
                return response;
            } catch (err) {
                console.log('postContractMethod => err :', err);
                return err;
            }
        }
    });
}
