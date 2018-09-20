import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './statusEth.html';

Template.statusEth.onCreated(function () {
    this.accountAddress = new ReactiveVar();
    this.contractAddress = new ReactiveVar();
    this.provider = new ReactiveVar();
    this.transaction = new ReactiveVar();
    this.transactionUrl = new ReactiveVar();
});

Template.statusEth.helpers({
    accountAddress: function () {
        var template = Template.instance();
        Meteor.call('getAccountAddress', (err, result) => {
            if (err) {
                console.log('getAccountAddress => err :', err);
            } else {
                console.log('getAccountAddress => result :', result);
                template.accountAddress.set(result);
            }
        });
        return template.accountAddress.get();
    },
    contractAddress: function () {
        var template = Template.instance();
        Meteor.call('getContractAddress', (err, result) => {
            if (err) {
                console.log('getContractAddress => err :', err);
            } else {
                console.log('getContractAddress => result :', result);
                template.contractAddress.set(result);
            }
        });
        return template.contractAddress.get();
    },
    provider: function () {
        var template = Template.instance()
        Meteor.call('getProvider', (err, result) => {
            if (err) {
                console.log('getProvider => err :', err);
            } else {
                console.log('getProvider => result :', result);
                template.provider.set(result.host);
            }
        });
        return template.provider.get();
    },
    transaction: function () {
        return Template.instance().transaction.get();
    },
    transactionUrl: function () {
        return Template.instance().transactionUrl.get();
    }
});

Template.statusEth.events({
    'submit .transaction-Form'(event) {
        event.preventDefault();
        var template = Template.instance();
        var transactionAddress = event.target.transaction.value;
        Meteor.call('getTransaction', transactionAddress, (err, result) => {
            if (err) {
                console.log('getTransaction => err :', err);
            } else {
                console.log('getTransaction => result :', result);
                template.transaction.set(result.inputs);
                template.transactionUrl.set(transactionAddress);
            }
        });
        event.target.transaction.value = '';
    }
});