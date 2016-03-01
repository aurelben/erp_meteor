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
					data = JSON.parse(result[x].split(','));
					split = data['name'].split("_");
					data['client'] = split[0];
					data['proj'] = split[1];
					data['url'] = data['state'].toLowerCase()
					result[x] = data;
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
