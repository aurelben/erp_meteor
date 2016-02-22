/*****************************************************************************/
/* ClientProject: Event Handlers */
/*****************************************************************************/
Template.ClientProject.events({
});

/*****************************************************************************/
/* ClientProject: Helpers */
/*****************************************************************************/
Template.ClientProject.helpers({
	getAllClients: function(){
		function callback(error, result, res) {
			
			console.dir(result);
			console.log(error);
			Session.set("clients", result);
		}
		Meteor.call('getAllClients', callback);

		return Session.get("clients");
	}
});

/*****************************************************************************/
/* ClientProject: Lifecycle Hooks */
/*****************************************************************************/
Template.ClientProject.onCreated(function () {
});

Template.ClientProject.onRendered(function () {
	$(document).ready(function(){
	    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	    $('.modal-trigger').leanModal({
	    	dismissible: true // Modal can be dismissed by clicking outside of the modal
	    });
	});
});

Template.ClientProject.onDestroyed(function () {
});
