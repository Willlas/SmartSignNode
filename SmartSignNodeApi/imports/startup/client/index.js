// Import client startup through a single index entry point

import './routes.js';

if (typeof web3 == 'undefined')
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));