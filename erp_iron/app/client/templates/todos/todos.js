/*****************************************************************************/
/* Todos: Event Handlers */
/*****************************************************************************/
Template.Todos.events({
});

/*****************************************************************************/
/* Todos: Helpers */
/*****************************************************************************/
Template.Todos.helpers({

	sing: function (){

		var res;
		function callback(error, result, res) {
			
			console.log(result);
			console.log(error);
			Session.set('q', result);
		}
		Meteor.call('singleton', callback);

		return Session.get("q");
	}

});

/*****************************************************************************/
/* Todos: Lifecycle Hooks */
/*****************************************************************************/
Template.Todos.onCreated(function () {
});

Template.Todos.onRendered(function () {
});

Template.Todos.onDestroyed(function () {
});

