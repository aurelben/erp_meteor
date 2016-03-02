/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

fs = Npm.require('fs');
// fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
//   if (err) return console.log(err);
//   console.log('Hello World > helloworld.txt');
// });
// var Singleton = (function () {
//     var instance;
 
//     function createInstance() {
//     	var res;
    	
//     		res = fs.readFileSync('./helloworld.txt', 'utf8');
    		  

//     		console.log("res is:", res);
//     		return res;

//     }
 
//     return {
//         getInstance: function () {
//             if (!instance) {
//                 instance = createInstance();
//             }
//             return instance;
//         }
//     };
// })();


Meteor.methods({
  'singleton': function () {
    // server method logic
    return Singleton.getInstance();
 }    
  
});
