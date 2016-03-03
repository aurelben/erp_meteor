/*****************************************************************************/
/*  Server utils */
/*****************************************************************************/
// AUREL __SAVE_OBJ_PATH__ = '/Users/aurel/Documents/etna/etna_erp/erp_iron/app';

fs = Npm.require('fs');
__ROOT_APP_PATH__ = fs.realpathSync('.');
__SAVE_OBJ_PATH__ = '/Users/aurel/Documents/etna/etna_erp/erp_iron/app';


MyLog = (function() { 
	try {
    	var log = fs.readFileSync(__SAVE_OBJ_PATH__+"/log.txt", 'utf8');
	} catch (e){
		console.log(e);
		var log = "";
	}

    return {
        add: function(msg) { 
        	log += "timestamp : "+Date.now()+" user: "+"user.userId()"+" message: "+msg + "\n";
        	saveToFile(log, "/log.txt" );
        },
        show: function() { console.log(log);} 
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
	keys = Object.keys(item);
	this.items = item;
	length = keys.length;
}

Iterator.prototype = {
	first: function() {
        this.reset();
        return this.next();
    },
    next: function() {
    	if (!this.hasNext()) { 
    		return null
    	}
    	elem = this.items[keys[index]]
    	index++;
        return elem;
    },
    hasNext: function() {
        return this.index <= length;
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