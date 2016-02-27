/*****************************************************************************/
/* Prospect: Event Handlers */
/*****************************************************************************/
Template.Prospect.events({
});



/*****************************************************************************/
/* Prospect: Helpers */
/*****************************************************************************/
Template.Prospect.helpers({
	getStateFromClients: function(){
		function callback(error, result, res) {
			console.dir(result);
			console.log(error);
			//split = result['name'].split("_");
			//Session.set("clients", result);
			return result;
		}
	Meteor.call('getStateFromClients', callback);
	},
	getAllClients: function(){
		function callback(error, result, res) {
			
			console.dir(result);
			console.log(error);
			//split = result['name'].split("_");

			for (var i = 0; i < result.length; i++) {
				data = JSON.parse(result[i].split(','));
				split = data['name'].split("_");
				data['client'] = split[0];
				data['projet'] = split[1];
				data['url'] = data['state'].toLowerCase()
				result[i] = data;
			}
			Session.set("clients", result);
		}
		Meteor.call('getAllClients', callback);

		return Session.get("clients");
	}

});

/*****************************************************************************/
/* Prospect: Lifecycle Hooks */
/*****************************************************************************/
Template.Prospect.onCreated(function () {
});

Template.Prospect.onRendered(function () {
});

Template.Prospect.onDestroyed(function () {
});
