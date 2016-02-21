


Meteor.publish('todos', function () {
  return Todos.find();
});

Meteor.publish('clientProject', function () {
  return ClientProject.find();
});

Meteor.publish('Prospect', function () {
  return Prospect.find();
});

Meteor.publish('Devis', function () {
  return Devis.find();
});

Meteor.publish('Facture', function () {
  return Facture.find();
});