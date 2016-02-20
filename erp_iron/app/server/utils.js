/*****************************************************************************/
/*  Server utils */
/*****************************************************************************/

fs = Npm.require('fs');

function saveToFile(str, file) {
	fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
	  if (err) return console.log(err);
	  console.log('Hello World > helloworld.txt');
	});
}

function createObjFromFile () {
	res = fs.readFileSync('./helloworld.txt', 'utf8');
}