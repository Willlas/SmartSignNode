import './ethereum';
import swagger from './swagger';


if (Meteor.isServer) {
    // Global API configuration
    var APIV1 = new Restivus({
        useDefaultAuth: true, // No idea why
        prettyJson: true, // No idea why
        version: 'v1'
    });
    // Maps to: /api/ethereum/transaction/:hash
    APIV1.addRoute('ethereum/transaction/:hash', { authRequired: false }, {
        get: function () {
            return Meteor.call('getTransaction', this.urlParams.hash);
        }
    });
    // Maps to: /api/ethereum/allTransaction/:csv
    APIV1.addRoute('ethereum/allTransactions/:csv', { authRequired: false }, {
        get: function () {
            return Meteor.call('getAllTransactions', this.urlParams.csv);
        }
    });
    // Maps to: /api/ethereum/transactionStatus/:hash
    APIV1.addRoute('ethereum/transactionStatus/:hash', { authRequired: false }, {
        get: function () {
            return Meteor.call('getTransactionStatus', this.urlParams.hash);
        }
    });
    // Maps to: /api/ethereum/contract/method/:method
    APIV1.addRoute('ethereum/contract/method/:method', { authRequired: false }, {
        post: function () {
            switch (this.urlParams.method) {
                case 'setNewRegister':
                    var params = {
                        _codedData: this.bodyParams.codedData,
                        _csv: this.bodyParams.csv
                    };
                    return Meteor.call('postContractMethodSetNewRegister', params);
                case 'mappingSignRegister':
                    return Meteor.call('postContractMethodMappingSignRegister', this.bodyParams.hashData);
                case 'mappingSignRegisterByCodedData':
                    return Meteor.call('postContractMethodMappingSignRegisterByCodedData', this.bodyParams.codedData);
                case 'mappingSignRegisterByCsv':
                    return Meteor.call('postContractMethodMappingSignRegisterByCsv', this.bodyParams.csv);
                default:
                    return this.urlParams.method + 'is not a valid method of the API';
            }
        }
    });
    APIV1.addRoute('ethereum/swagger.json', { authRequired: false }, {
        get: function () {
            return swagger.swagger;
        }
    });
    // This is for an example we ahve generate by hand
    APIV1.swagger = { //TODO documentation
        meta: {
            swagger: "2.0",
            info: {
                version: "1.0.0",
                title: "SmartSign API",
                description: "My REST API",
                termsOfService: "https://example.com/terms/",
                contact: {
                    name: "SmartSign"
                },
                license: {
                    name: "MIT"
                }
            }

        },
        definitions: {
            // Schema definitions for $refs, check spec http://swagger.io/specification/
            // Required for body parameters
        },
        params: {
            // Parameter object definitions to be used in endpoint configurations
            // Path and body parameter types supported in v0.2.0 
        },
        tags: {
            // Swagger UI tag variables to be used in endpoint grouping
        }
    }
    // Generates swagger.json to /api/v1/swagger.json
    APIV1.addSwagger('swagger.json');
}
