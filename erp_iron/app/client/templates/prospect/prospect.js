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
			//console.dir(result);
			console.log(result.etape.name);
			if (result.etape.name === 'init Prospect') {
				console.log('ici');
				return Session.set('check',true);
			}
			else
			{
				if (result.etape.name === 'valid prospect')
					Session.set('etape',false);
				else
					Session.set('etape',true);
				return Session.set('check',false);
			}
		}
		var id = Session.get('id');
		Meteor.call('getStateFromClients',id,callback);
	},
	checkstate: function(){
		return Session.get('etape');
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
