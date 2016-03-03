Meteor.startup(function () {
	var res = createObjFromFile(__SAVE_OBJ_PATH__+"/"+"save.json");
	console.log(res);
	try	{
	var tmp = JSON.parse(res);
	} catch (e) {
		var tmp = null;
	}
	// iterator = new Iterator(tmp);
	
	// console.log("is iterable "+tmp[0]);
	// iterator.each(function(client){

	//   console.log(client);
	//   //log.add("error client id not found");
	//   //log.show();
	// });
	
	for (var x in tmp) {
		console.log(tmp[x]);
		var tmp_client = new ClientProject(tmp[x].state);
		tmp_client.dehydrate(tmp[x]);
	}
	
	//console.dir(res);
});
