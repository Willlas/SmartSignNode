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
    BlazeLayout.render('App_body', { top: 'top', main: 'statusEth', footer: 'footer' });
  }
});

FlowRouter.route('/statusDbTransaction', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { top: 'top', main: 'statusDBTransaction' });
  }
});

FlowRouter.route('/swagger', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { top: 'top', main: 'swagger' });
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { top: 'top', main: 'App_notFound' });
  },
};
