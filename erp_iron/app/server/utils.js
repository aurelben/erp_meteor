/*****************************************************************************/
/*  Server utils */
/*****************************************************************************/

fs = Npm.require('fs');
__ROOT_APP_PATH__ = fs.realpathSync('.');
__SAVE_OBJ_PATH__ = '/home/benoit/erp/erp_meteor/erp_iron/app';

var log = (function() {
    var log = "";
    return {
        add: function(msg) { log += "timestamp : "+Date.now()+" user: "+this.user.name+" message: "+msg + "\n"; },
        show: function() { console.log(log); log = ""; } 
    }
})();

saveToFile = function (str, file) {
	console.log(__ROOT_APP_PATH__);
	fs.writeFile(__SAVE_OBJ_PATH__+'/'+file, JSON.stringify(str), function (err) {
	  if (err) return console.log(err);
	  console.log("Save: "+str);
	});
}

createObjFromFile = function (file) {
	try {
		res = fs.readFileSync(file, 'utf8');
		return res;
	} catch (e) {
		console.log(e);
	}
	
}

Iterator = function (item) {
	index = 0;
	this.items = item;
}

Iterator.prototype = {
	first: function() {
        this.reset();
        return this.next();
    },
    next: function() {
        return this.items[this.index++];
    },
    hasNext: function() {
        return this.index <= this.items.length;
    },
    reset: function() {
        this.index = 0;
    },
    each: function(callback) {
        for (var item = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    }
}