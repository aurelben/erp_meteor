Meteor.startup(function () {
	var res = createObjFromFile(__SAVE_OBJ_PATH__+"/"+"save.json");
	
	try	{
		var tmp = JSON.parse(res);
	} catch (e) {
		var tmp = null;
	}
	
	for (var x in tmp) {
		console.log(tmp[x]);
		var tmp_client = new ClientProject(tmp[x].name, tmp[x].state, null, null);
		tmp_client.dehydrate(tmp[x]);
	}

});
