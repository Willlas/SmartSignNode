// Documented here : https://github.com/kahmali/meteor-restivus#installation
// Just in case
import InputDataDecoder from 'ethereum-input-data-decoder';
import AbiDecoder from 'abi-decoder';
import Web3 from 'web3';
import stringHash from 'string-hash';

// Configuration const. TODO : file
const abi = [{ "constant": false, "inputs": [], "name": "deprecate", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "tableRegisters", "outputs": [{ "name": "hashData", "type": "int256" }, { "name": "index", "type": "uint256" }, { "name": "codedData", "type": "string" }, { "name": "csv", "type": "string" }, { "name": "timestamp", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_hashData", "type": "int256" }, { "name": "_codedData", "type": "string" }, { "name": "_csv", "type": "string" }, { "name": "_timestamp", "type": "uint256" }], "name": "setNewRegister", "outputs": [{ "name": "", "type": "int256" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "int256" }], "name": "mappingSignRegister", "outputs": [{ "name": "hashData", "type": "int256" }, { "name": "index", "type": "uint256" }, { "name": "codedData", "type": "string" }, { "name": "csv", "type": "string" }, { "name": "timestamp", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "hashData", "type": "int256" }], "name": "isRepeated", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "hashData", "type": "int256" }, { "name": "csv", "type": "string" }], "name": "getRegister", "outputs": [{ "name": "", "type": "int256" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];
const contractAddress = '0x1990091F0fD536938D49effd561C8F141Fdc5C87';
const accountAddress = '0x539dfa3584a7fd493c7a0383efcf17d40ee6dbb3';
const gasPrice = '3000000000';


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

    const contract = new web3.eth.Contract(abi, contractAddress);
    console.log('Ethereum => Startup : Done');

    // 
    // End of Start up
    // 

    Meteor.methods({
        'getAccountAddress'() {
            try {
                console.log('getAccountAddress => result :', web3.eth.defaultAccount);
                return web3.eth.defaultAccount;
            } catch (err) {
                console.log('getAccountAddress => err :', err);
            }
        },
        'getContractAddress'() {
            try {
                var response = contractAddress;
                console.log('getContractAddress => result :', response);
                return response;
            } catch (err) {
                console.log('getContractAddress => result :', err);
            }
        },
        'getProvider'() {
            try {
                console.log('getProvider => result :', web3.eth.currentProvider);
                return web3.eth.currentProvider;
            } catch (err) {
                console.log('getProvider => err :', err);
            }
        },
        'getTransaction'(txAddress) {
            try {
                var transaction = web3.eth.getTransaction(txAddress).await();
                var result = decoder.decodeData(transaction.input)
                console.log('getTransaction : ', transaction);
                console.log('getTransaction => decode :', result);
                var response = result;

                result.inputs.forEach((element, index) => {
                    if (web3.utils.isBN(element)) response.inputs[index] = element.toString();
                    if (index == 3) response.inputs[index] = new Date(parseInt(element)).toISOString();;
                });
                return response;
            } catch (err) {
                console.log('getTransaction => err', err);
                return err;
            }
        },
        'getAllTransactions'(csv) {
            try {
                var result = [];
                var transactions = hashDocument.find({ csv: csv }).fetch();
                transactions.forEach(element => {
                    result.push(Meteor.call('getTransaction', element.transactionAddress).inputs);
                });
                // console.log('getAllTransactions => result :', result);
                console.log('getAllTransactions => transactions :', result);
                return result;
            } catch (err) {
                console.log('getAllTransactions => err :', err);
            }
        },
        'getTransactionStatus'(txAddress) {
            try {
                var transactionStatus = web3.eth.getTransactionReceipt(txAddress).await();
                var result = transactionStatus.status;
                console.log('getTransactionStatus => result :', transactionStatus);
                return result;
            } catch (err) {
                console.log('getTransactionStatus => err :', err);
                return err;
            }
        },
        'postContractMethodSetNewRegister'({ _codedData, _csv }) {
            try {
                var gasLimit = contract.methods
                    .setNewRegister(stringHash(_codedData), _codedData, _csv, Date.now())
                    .estimateGas({ from: web3.eth.defaultAccount })
                    .await()

                console.log('postContractMethod => gas Limit :', gasLimit);
                console.log(stringHash(_codedData), _codedData, _csv, Date.now());
                var resultData = contract.methods
                    .setNewRegister(stringHash(_codedData), _codedData, _csv, Date.now())
                    .call({
                        from: web3.eth.defaultAccount,
                        gas: gasLimit,
                        gasPrice: gasPrice
                    }).await();
                var resultRecipe = contract.methods
                    .setNewRegister(stringHash(_codedData), _codedData, _csv, Date.now())
                    .send({
                        from: web3.eth.defaultAccount,
                        gas: gasLimit,
                        gasPrice: gasPrice
                    }).await();


                result = { resultData, resultRecipe };
                if (hashDocument.find({ codedData: resultData[1] }).fetch().length == 0 & resultData[1] != 'Repeated') {
                    console.log('Contract Address not found');
                    var data = {
                        hashData: resultData[0],
                        codedData: resultData[1],
                        contractAddress: contractAddress,
                        transactionAddress: resultRecipe.transactionHash,
                        csv: resultData[2]
                    }
                    if (hashDocument.schema.validate(data) == null) hashDocument.insert(data);
                }
                console.log('postContractMethodSetNewRegister => result :', result);
                return result;
            } catch (err) {
                console.log('postContractMethodSetNewRegister => err :', err);
                return err;
            }
        },
        'postContractMethodMappingSignRegister'(hashData) {
            try {
                contract.address = hashDocument.find({ hashData: hashData }).fetch()[0].contractAddress;
                var gasLimit = contract.methods
                    .mappingSignRegister(hashData)
                    .estimateGas({ from: web3.eth.defaultAccount })
                    .await();
                var result = contract.methods
                    .mappingSignRegister(hashData)
                    .call({
                        from: web3.eth.defaultAccount,
                        gas: gasLimit,
                        gasPrice: gasPrice
                    }).await();
                console.log('postContractMethodMappingSignRegister => result :', result);
                return {
                    csv: result.csv,
                    codedData: result.codedData,
                    hashData: result.hashData,
                    index: result.index,
                    timestamp: result.timestamp
                };
            } catch (err) {
                console.log('postContractMethodMappingSignRegister => err :', err);
                return err;
            }
        },
        'postContractMethodMappingSignRegisterByCodedData'(codedData) {
            try {
                var hashData = hashDocument.find({ codedData: codedData }).fetch()[0].hashData;
                var result = Meteor.call('postContractMethodMappingSignRegister', hashData);

                console.log('postContractMethodMappingSignRegisterByCodedData => result :', result);
                return result;
            } catch (err) {
                console.log('postContractMethodMappingSignRegisterByCodedData => result :', err);
                return err
            }
        },
        'postContractMethodMappingSignRegisterByCsv'(csv) {
            try {
                var result = [];
                var transactions = hashDocument.find({ csv: csv }).fetch();
                transactions.forEach(element => {
                    result.push(Meteor.call('postContractMethodMappingSignRegister', element.hashData));
                });
                console.log('postContractMethodMappingSignRegisterByCsv => result :', result);
                return result;
            } catch (err) {
                console.log('postContractMethodMappingSignRegisterByCsv => err :', err)
                return err;
            }
        }
    });
}