import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './statusEth.html';

Template.statusEth.onCreated(function () {
    this.transaction = new ReactiveVar();
    this.transactionUrl = new ReactiveVar();
});

Template.statusEth.helpers({
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