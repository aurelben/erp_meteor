Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});

Router.route('todos', {
  name: 'todos',
  controller: 'TodosController',
  where: 'client'
});

Router.route('client_project', {
  name: 'clientProject',
  controller: 'ClientProjectController',
  where: 'client'
});

Router.route('prospect', {
  name: 'prospect',
  controller: 'ProspectController',
  where: 'client'
});

Router.route('devis', {
  name: 'devis',
  controller: 'DevisController',
  where: 'client'
});

Router.route('facture', {
  name: 'facture',
  controller: 'FactureController',
  where: 'client'
});