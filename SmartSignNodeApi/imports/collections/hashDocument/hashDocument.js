import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

hashDocument = new Mongo.Collection('hashDocument');

hashDocument.schema = new SimpleSchema({
    hashData: {
        type: String,
        label: "hashData"
    },
    codedData: {
        type: String,
        label: "codedData"
    },
    contractAddress: {
        type: String,
        label:"contractAddress"
    },
    transactionAddress: {
        type: String,
        label: "TransactionAddress"
    },
    csv: {
        type: String,
        label: "csv"
    }
});

export default hashDocument;

if(Meteor.isServer){
    Meteor.publish('hashDocument', function hashDocumentPublication(){
        return hashDocument.find();
    });
}

Meteor.methods({
    'hashDocument.insert'(text){
        check(text, String);
    }
});

// export const hashDocument = new Mongo.Collection('hashDocument');