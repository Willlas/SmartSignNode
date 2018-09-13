import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// deprecated 
smartContract = new Mongo.Collection('smartContract');

smartContract.schema = new SimpleSchema({
    transactionAddress: {
        type: String,
        label: "TransactionAddress"
    },
    contractAddress: {
        type: String,
        label: "ContractAddress"
    },
    csv: {
        type: String,
        label: "csv"
    }
});

export default smartContract;

if(Meteor.isServer){
    Meteor.publish('smartContract', function smartContractPublication(){
        return smartContract.find();
    });
}

Meteor.methods({
    'smartContract.insert'(text){
        check(text, String);
    }
});
// export const smartContract = new Mongo.Collection('smartContract');
