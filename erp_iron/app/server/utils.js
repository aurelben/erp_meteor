/*****************************************************************************/
/*  Server utils */
/*****************************************************************************/

fs = Npm.require('fs');

var log = (function() {
    var log = "";
    return {
        add: function(msg) { log += "timestamp : "+Date.now()+" user: "+this.user.name+" message: "+msg + "\n"; },
        show: function() { console.log(log); log = ""; } 
    }
})();

function saveToFile(str, file) {
	fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
	  if (err) return console.log(err);
	  console.log('Hello World > helloworld.txt');
	});
}

function createObjFromFile () {
	res = fs.readFileSync('./helloworld.txt', 'utf8');
}

function iterator (item) {
	index = 0;
	this.item = item;
}

iterator.protorype = {
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