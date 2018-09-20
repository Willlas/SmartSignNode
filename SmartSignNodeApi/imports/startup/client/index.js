// Import client startup through a single index entry point
import { Meteor } from 'meteor/meteor';

import './routes.js';
import '../../../node_modules/swagger-ui/dist/swagger-ui.css'

import '../../ui/components/hello/hello.js';
import '../../ui/components/info/info.js';
import '../../ui/components/statusEth/statusEth.js';
import '../../ui/components/statusDBTransaction/statusDBTransaction.js'

import '../../collections/hashDocument/hashDocument.js'



if (typeof web3 == 'undefined')
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const hashDocumentSub = Meteor.subscribe('hashDocumentChannel');
console.log(hashDocumentSub);

Tracker.autorun(() => {
    const isReady = hashDocumentSub.ready();
    console.log(`Handler is ${isReady ? 'ready' : 'not ready'} `);
    if (hashDocumentSub.ready())
        console.log(hashDocument.find().fetch());
})
