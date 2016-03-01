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

Router.route('prospect/:id', {
  name: 'prospect',
  controller: 'ProspectController',
  where: 'client',
  data: function(){
      Session.set('id',this.params.id)
    }
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

Router.route('new_client', {
  name: 'newClient',
  controller: 'NewClientController',
  where: 'client'
});