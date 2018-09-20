import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './statusDBTransaction.html';
// import hashDocument from '../../../collections/hashDocument/hashDocument';

// const hashDocumentSub = Meteor.subscribe('hashDocumentChannel');

Template.statusDBTransaction.onCreated(function () {
    this.transactionTable = new ReactiveVar();

});

Template.statusDBTransaction.onRendered(function () {

});

Template.statusDBTransaction.helpers({
    transactions: function () {
        var template = Template.instance()
        console.log(hashDocument.find().fetch());
        template.transactionTable.set(hashDocument.find().fetch());
        return template.transactionTable.get();
    }
})