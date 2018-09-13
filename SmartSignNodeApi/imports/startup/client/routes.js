import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/components/swagger/swagger.js'
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  }
});

FlowRouter.route('/home', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'hello'});
  }
});

FlowRouter.route('/swagger', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'swagger'});
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
