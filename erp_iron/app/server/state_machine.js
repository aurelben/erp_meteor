var ClientProject = function (name, date) {
    currentState = new Prospect(this);
    this.name = name;
    
    if(!date){
      this.createDate = Date.now();
    } else {
      this.createDate = date;
    }
  
    this.setState = function (state) {
        currentState = state;
        currentState.save();
    };
  
    this.getState = function (){
      return currentState;
    };
  
    this.setName = function(name){
      this.name = name;
    };
  
    this.getName = function (){
      return this.name;
    };
  
    this.getCreationDate = function () {
      return this.createDate;
    };
  
    this.save = function () {
        console.log("I'am saving the prospect object");
    };
};

var Prospect = function (client) {
    this.client = client;
    this.factory = new FactoryProspect();
    
    this.setEtape = function (etape) {
      this.currentEtape = this.factory.createEtape(etape);
    }; 
  
    this.getEtape = function () {
      return this.currentEtape;  
    };
  
    this.save = function () {
        console.log("I'am saving the prospect object");
    };
};



function FactoryProspect() {
    this.createEtape = function (type) {
        var etape;
 
        if (type === "init") {
            etape = new InitialProspect();
        } else if (type === "valid") {
            etape = new ContactValidProspect();
        } else if (type === "confirm") {
            etape = new ConfirmNeedProspect();
        } 
        
        etape.type = type;
 
        etape.getType = function () {
            return etape.type;
        };
 
        return etape;
    };
}

function InitialProspect (){
  console.log("init");
  
  this.getName = function () {
    console.log("in getName on init prospect");
    return "init prospect";
  };
}

function ContactValidProspect (){
  console.log("valid");
  
  this.getName = function () {
    console.log("in getName on valid prospect");
    return "valid Prospect";
  };
}

function ConfirmNeedProspect (){
  console.log("confirm");
  
  this.getName = function () {
    console.log("in getName on confirm prospect");
    return "confirm Prospect";
  };
}

function run() {
  var client = new ClientProject("alex");
  
  var prospect = client.getState();
  
  prospect.setEtape("confirm");
  var status = prospect.getEtape();
  console.log(status.getName());
  
  
  prospect.setEtape("valid");
  status = prospect.getEtape();
  var res = status.getName();
  
  setTimeout(function() {
  console.log("time out\n\n\n");
 
  }, 2000);
  var client2 = new ClientProject("alexMAJ");
  console.log("client 1 name: %s", client.getName());
  console.log("client 1 creation date: %d", client.getCreationDate());
  
  console.log("client 2 name: %s", client2.getName());
  console.log("client 2 creation date: %d", client2.getCreationDate());
  
  
  
  console.log("client 1 status etape %s \n", res);
  
  return ("END ____---------_________------- Return");
}

Meteor.methods({
 //  	'testState': function () {
 //    	// server method logic
 //    	console.info("inst testState");
 //    	run();
 //    	return "ok";
	// }
});