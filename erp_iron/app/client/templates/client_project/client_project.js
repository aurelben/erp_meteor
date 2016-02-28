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
		function callback(error, result) {
			
			if (error) {
				console.log(error);
			}
			
			if (result) {
				console.dir(result);
				for (x in result){
					var tmp = JSON.parse(result[x]).name.split("_");
					JSON.parse(result[x]).name = tmp[0];
					JSON.parse(result[x]).proj = tmp[1];
					console.dir(JSON.parse(result[x]).name);
					Session.set("clients", result);
				}
				Session.set("clients", result);
			}
			
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
