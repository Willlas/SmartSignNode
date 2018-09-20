    
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
        label: "contractAddress"
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

if (Meteor.isServer) {
    Meteor.publish('hashDocumentChannel', () => {
        return hashDocument.find();
    });
}

Meteor.methods({
    'hashDocument.insert'(text) {
        check(text, String);
    }
});

export default hashDocument;



// export const hashDocument = new Mongo.Collection('hashDocument');