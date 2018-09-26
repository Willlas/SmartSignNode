import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

import './body.html';
import '../../css/menu.css';
import '../../css/footer.css';

Template.footer.onCreated(function() {
    this.accountAddress = new ReactiveVar();
    this.contractAddress = new ReactiveVar();
    this.provider = new ReactiveVar();
});

Template.footer.helpers({
    accountAddress: function() {
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
    contractAddress: function() {
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
    provider: function() {
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
    }
});