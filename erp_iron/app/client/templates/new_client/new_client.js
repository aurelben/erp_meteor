/*****************************************************************************/
/* NewClient: Event Handlers */
/*****************************************************************************/
Template.NewClient.events({
	"submit form": function (event, template) {
	event.preventDefault();
    //console.dir(event.target);
    //console.dir(template);
    function callback (error, result) {
    	console.log("new client callback res: "+result);
    	console.log(error);
    	Session.set('q', result);
    };

    Meteor.call('createNewClient', event.target.client_name.value+"_"+event.target.project_name.value, callback)
    //var result = Meteor.apply('createNewClient', [event.target.client_name.value+"_"+event.target.project_name.value], { returnStubValue: true });


    event.target.client_name.value = "";
    event.target.project_name.value = "";
    event.target.email.value = "";
    event.target.state.value = "";
    
    //console.dir(result);
    //alert("OK");
  }
});

/*****************************************************************************/
/* NewClient: Helpers */
/*****************************************************************************/
Template.NewClient.helpers({
});

/*****************************************************************************/
/* NewClient: Lifecycle Hooks */
/*****************************************************************************/
Template.NewClient.onCreated(function () {
});

Template.NewClient.onRendered(function () {
});

Template.NewClient.onDestroyed(function () {
});
