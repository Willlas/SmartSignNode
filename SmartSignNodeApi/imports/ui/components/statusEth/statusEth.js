import { Meteor } from 'meteor/meteor';
import './statusEth.html';
import stringHash from 'string-hash';

Template.statusEth.onCreated(function () {
console.log(stringHash('a'));
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