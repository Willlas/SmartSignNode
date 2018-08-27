import { Meteor } from 'meteor/meteor';
import './statusEth.html';
import { HTTP } from 'meteor/http'

const blockcypherToken = 'afb59984aa514615bfaa3ab166fcad37';
const blockcypherPrivateToken = '0a4ec0959b872afeeebc6c7f53bf736da87edf1dc31425426eee2b2b42f8b274' // private token

const contract = 'pragma solidity ^0.4.8;\r\ncontract SmartSignFactum {\r\n\r\n    address owner;\r\n    bool deprecated;\r\n\r\n    mapping(string => bool) map;\r\n    string [] mapped;\r\n\r\n    struct entry{\r\n        string hash;\r\n        string csv;\r\n        uint dateOfProcess;\r\n    }\r\n    \r\n    entry [] table;\r\n\r\n    function SmartSignFactum() internal {\r\n        owner = msg.sender;\r\n        deprecated = false;\r\n    }\r\n\r\n    function isOwner(address _owner) internal returns (bool){\r\n        return owner == _owner;\r\n    }\r\n    \r\n\r\n    function isMapped(string _map) internal returns (bool){\r\n        return map[_map];\r\n    }\r\n\r\n    function setMap(string _hash, string _csv) returns(string, string, string){\r\n        if(deprecated){\r\n            return (\"Error : This version is deprecated\", \"0\", \"0\");\r\n        } else {\r\n            if( isOwner(msg.sender) ){\r\n                if( false ){\r\n    \r\n                    return (\"Error : Repeated value\", \"0\", \"0\");\r\n    \r\n                } else {\r\n    \r\n                    entry memory newEntry ;\r\n                    newEntry.hash = _hash;\r\n                    newEntry.csv = _csv;\r\n                    newEntry.dateOfProcess = now;\r\n    \r\n                    table.push(newEntry);\r\n                    \r\n                    map[_hash] = true;\r\n                    mapped.push(_hash);\r\n                    \r\n    \r\n                    return (\"Success : Correct push\", _hash, _csv);\r\n                }\r\n            } else {\r\n                return (\"Error : Not the owner\", \"0\", \"0\");\r\n            }\r\n        }\r\n    }\r\n    \r\n    function changeStatus() returns(string){\r\n        if( isOwner(msg.sender) ){\r\n            if(deprecated){\r\n                deprecated = false;\r\n                return \"Success : Not deprecated\";\r\n            } else {\r\n               deprecated = true; \r\n               return \"Success : Deprecated\";\r\n            }\r\n        } else {\r\n           return \"Error : Not the owner\"; \r\n        }\r\n    }\r\n\r\n}';

Template.statusEth.onCreated(function () {

    fetch('https://api.blockcypher.com/v1/beth/test')
        .then(result => {
            return result.json();
        })
        .then(response => {
            console.log('fetch : result => ', response);
        });

    HTTP.post('https://api.blockcypher.com/v1/beth/test/contracts?token=' + blockcypherToken, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        },
        data: {
            solidity: contract,
            //publish: ['SmartSignFactum'],
            private: blockcypherPrivateToken,
            gas_limit: 500000,
            name: 'SmartSignFactum',
            //address: '89f0f1dd760429db7b20e2c508c8f01ebbd9afb1'
        }
    }, function (err, result) {
        if (!err)
            console.log('post-contract : result => ', result);

    }); // hecho 
});

// Template.statusEth.rendered(function () {

// });

Template.statusEth.helpers({
    net() {
        // var response;
        // HTTP.get('https://api.blockcypher.com/v1/beth/test', (err, result) => {
        //     if (!err) {
        //         console.log('net : result => ', result);
        //         response = result.data.name;
        //     } else {
        //         console.log('net : err => ', err);
        //         response = 'None';
        //     }
        //     return response;
        // });
    },
    accountAddress() {
        // var response;
        // HTTP.post('https://api.blockcypher.com/v1/beth/test/addrs?token=' + blockcypherToken, (err, result) => {
        //     if (!err) {
        //         console.log('accountAddress : result => ', result);
        //         response = result.data.address;
        //     } else {
        //         console.log('accountAddress : err => ', err);
        //     }
        //     return response;
        // });
    }
});