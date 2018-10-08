import { Meteor } from 'meteor/meteor';
import  SwaggerUI  from 'swagger-ui'
import './swagger.html';

Template.swagger.onCreated(function(){

});
Template.swagger.onRendered(function (){
    SwaggerUI({
        // url: 'http://localhost:3000/api/v1/ethereum/swagger.json',
        url : 'http://10.16.15.235:3000/api/v1/ethereum/swagger.json',
        dom_id: '#swaggerDiv',
        layout: 'BaseLayout'
    }); 
});