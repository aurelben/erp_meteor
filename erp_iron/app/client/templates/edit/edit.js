/*****************************************************************************/
/* NewClient: Event Handlers */
/*****************************************************************************/
Template.Edit.events({
	"submit form": function (event, template) {
		console.log('ici');
		event.preventDefault();
	    //console.dir(event.target);
	    //console.dir(template);
	    function callback (error, result) {
	    	console.log("new client callback res: "+result);
	    	console.log(error);
	    	Session.set('q', result);
	    };
	    console.log(event.target.state.value);
	    Meteor.call('createNewClient', event.target.client_name.value+"_"+event.target.project_name.value, event.target.state.value, event.target.etape.value, event.target.valid.value,  callback)
	    //var result = Meteor.apply('createNewClient', [event.target.client_name.value+"_"+event.target.project_name.value], { returnStubValue: true });


	    event.target.client_name.value = "";
	    event.target.project_name.value = "";
	    event.target.email.value = "";
	    event.target.state.value = "";
	    event.target.etape.value = "";
	    event.target.valid.value = "";
	   // Router.go('clientProject');

    //console.dir(result);
    //alert("OK");
},

"change form": function (event, template) {
	  	//event.preventDefault();
	  	console.dir(event.target.value);
	      //console.dir(template);
	      if (event.target.value !== "") {
	      	//event.target.classList.remove("hide");
	      	document.getElementById('etape').className = "browser-default";
	      }
	      // else {
	      // 	//document.getElementById('etape').className = "browser-default hide";
	      // }

	      // if (event.target.etape.value !== "") {
	      // 	document.getElementById('valid').className = "";
	      // }else {
	      // 	document.getElementById('valid').className = "hide";
	      // }

	  }
	});

/*****************************************************************************/
/* NewClient: Helpers */
/*****************************************************************************/
Template.Edit.helpers({
	getClient: function () {
		function callback(error, result) {
		console.log('result == ',result);
			if (error) {return console.log(error)}

				if (result) {
					console.log(result);
					for (var i = 0; i < result.length; i++) {
						data = JSON.parse(result[i].split(','));
						split = data['name'].split("_");
						data['client'] = split[0];
						data['projet'] = split[1];
						data['url'] = data['state'].toLowerCase()
						result[i] = data;
					}
				}	

			}
			Meteor.call('getClient',Session.get('id') ,callback);
		}
	});

/*****************************************************************************/
/* NewClient: Lifecycle Hooks */
/*****************************************************************************/
Template.Edit.onCreated(function () {
});

Template.Edit.onRendered(function () {
});

Template.Edit.onDestroyed(function () {
});
