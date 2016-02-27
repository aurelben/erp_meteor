/*****************************************************************************/
/*  Define client class */
/*****************************************************************************/
var ShortId = Npm.require('shortid');

var ClientProject = function (name, state, date) {
    console.log(state);
    if (!state) {
      this.currentState = new Prospect(this);
    }else {
      this.currentState = eval("new "+state+"(this)");
    }
    
    this.currentState.subscribe(stateObs);
    this.name = name;
    this.id = ShortId.generate();
    
    if(!date){
      this.createDate = Date.now();
    } else {
      this.createDate = date;
    }

    ClientProject.objects.push(this);
  
    this.setState = function (state) {
        this.currentState.unsubscribe(stateObs);
        
        this.currentState = state;
        
        this.currentState.subscribe(stateObs);
        this.currentState.save();
    };
  
    this.getState = function (){
      return this.currentState;
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

    /**
     * @return {Obj contain curent object property}
     */
    this.getAllProp = function (){
      var res = {};
      res.name = this.name;
      res.id = this.id;
      res.createDate = this.createDate;
      console.log(this.currentState);
      res.state = this.currentState.getName();

      return (res);
    }
};


/**
 * [store all client object create for easy retrive it]
 * @type {Array}
 */
ClientProject.objects = [];

ClientProject.prototype.removeObj = function() {
  for (var i=0; i<ClientProject.objects.length; i++) {
    if (ClientProject.objects[i] == this) {
      ClientProject.objects.splice(i,1);
    }
  }
};


/*****************************************************************************/
/*  define state classe */
/*****************************************************************************/

var ClientState = function (client) {
    this.client = client;
    this.handlers = [];
    this.id = ShortId.generate();
    this.factory = new FactoryProspect();
    this.currentEtape = this.factory.createEtape("init");
    
    this.setEtape = function (etape) {
      this.currentEtape = this.factory.createEtape(etape);
      this.fire(this);
    };

    this.validEtape = function (opt) {
      this.currentEtape.setValid(opt);
      this.fire(this);
    }; 
  
    this.getEtape = function () {
      return (this.currentEtape);  
    };

    this.getClient = function () {
      return (this.client);
    };
  
    this.save = function () {
        console.log("I'am saving the state object");
    };

    this.getId = function () {
      return this.id;
    }

    this.getAllProp = function (){
      var res = {};
      res.name = this.name;
      res.id = this.id;
      res.createDate = this.createDate;
      console.log(this.currentEtape);
      res.etape = this.currentEtape.getAllProp();

      return (res);
    }
};


/*****************************************************************************/
/*  define state observer methode */
/*****************************************************************************/

ClientState.prototype = {
 
    subscribe: function(fn) {
        this.handlers.push(fn);
    },
 
    unsubscribe: function(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },
 
    fire: function(o, thisObj) {
        var scope = thisObj || window;
        
        this.handlers.forEach(function(item) {
            item.call(scope, o);
        });
    }
};

/*****************************************************************************/
/*  define state observer*/
/*****************************************************************************/

var stateObs = function(item) {
    if(item.getEtape().getName() === "valid Prospect" && item.getEtape().getValid() === true){
      console.log("--------------go to next client state devis");
      item.getClient().setState(new Devis(item.getClient()));
    }

    if(item.getEtape().getName() === "valid Devis" && item.getEtape().getValid() === true){
      console.log("--------------go to next client state facture");
      item.getClient().setState(new Facture(item.getClient()));
    }
    
    console.log("fired: " + item.getEtape().getName()); 
};

/*****************************************************************************/
/*  define each client state */
/*****************************************************************************/

var Prospect = function (client) {
    this.client = client;
    this.factory = new FactoryProspect();
    this.name = "Prospect";
    this.getName = function (){
      return (this.name);
    };
    
};

Prospect.prototype = new ClientState();


var Devis = function (client) {
    this.client = client;
    this.factory = new FactoryDevis();
    this.name = "Devis";
    this.getName = function (){
      return (this.name);
    };
    
};

Devis.prototype = new ClientState();

var Facture = function (client) {
    this.client = client;
    this.factory = new FactoryFacture();
    this.name = "Facture";
    this.getName = function (){
      return (this.name);
    };
    
};

Facture.prototype = new ClientState();


/*****************************************************************************/
/*  define class factory for set state etape */
/*****************************************************************************/

function FactoryProspect() {
  this.authorizedEtape = {
    "init":InitialProspect,
    "valid": ContactValidProspect,
    "confirm": ConfirmNeedProspect
  };
    this.createEtape = function (type) {
        var etape;
        
        for (var x in this.authorizedEtape) {
          if(type === x) {
            etape = new this.authorizedEtape[x]();
            break;
          }
        }
        etape.type = type;
 
        etape.getType = function () {
            return etape.type;
        };
 
        return etape;
    };
}

/*****************************************************************************/
/*  define etape factory for others state */
/*****************************************************************************/

function FactoryDevis () {
    this.authorizedEtape = {
    "init":InitialDevis,
    "valid": ContactValidDevis,
    "confirm": ConfirmNeedDevis
  };
}

FactoryDevis.prototype = new FactoryProspect();

function FactoryFacture () {
    this.authorizedEtape = {
    "init":InitialProspect,
    "valid": ContactValidProspect,
    "confirm": ConfirmNeedProspect
  };
}

FactoryFacture.prototype = new FactoryProspect();

/*****************************************************************************/
/*  define class prospect state etape */
/*****************************************************************************/

function InitialProspect (){
  console.log("init prospect");
  this.isvalid = false;
  this.id = ShortId.generate();
  this.name = "init Prospect";

  this.getName = function () {
    return this.name;
  };

  this.setValid = function(opt) {
    this.isvalid = opt;
  };

  this.getValid = function () {
    return (this.isvalid);
  };

  this.getId = function () {
    return this.id;
  };

  this.getAllProp= function (){
      var res = {};
      res.name = this.name;
      res.id = this.id;
      //res.createDate = this.createDate;
      //res.etape = this.currentState.getAllProp();

      return (res);
    }
}

function ContactValidProspect (){
  console.log("valid prospect");
  
  this.getName = function () {
    return "valid Prospect";
  };

}

ContactValidProspect.prototype = new InitialProspect();

function ConfirmNeedProspect (){
  console.log("confirm prospect");
  
  this.getName = function () {
    return "confirm Prospect";
  };

}

ConfirmNeedProspect.prototype = new InitialProspect();

/*****************************************************************************/
/*  define class Devis state etape */
/*****************************************************************************/

function InitialDevis (){
  console.log("init devis");
  this.isvalid = false;

  this.getName = function () {
    return "init Devis";
  };

  this.setValid = function(opt) {
    this.isvalid = opt;
  };

  this.getValid = function () {
    return (this.isvalid);
  };
}

function ContactValidDevis (){
  console.log("valid devis");
  
  this.getName = function () {
    return "valid Devis";
  };

}

ContactValidDevis.prototype = new InitialDevis();

function ConfirmNeedDevis (){
  console.log("confirm devis");
  
  this.getName = function () {
    return "confirm Devis";
  };

}

ConfirmNeedDevis.prototype = new InitialDevis();

/*****************************************************************************/
/*  define class Facture state etape */
/*****************************************************************************/

function InitialFacture (){
  console.log("init facture");
  this.isvalid = false;

  this.getName = function () {
    return "init Facture";
  };

  this.setValid = function(opt) {
    this.isvalid = opt;
  };

  this.getValid = function () {
    return (this.isvalid);
  };
}

function ContactValidFacture (){
  console.log("valid facture");
  
  this.getName = function () {
    return "valid Facture";
  };

}

ContactValidFacture.prototype = new InitialFacture();

function ConfirmNeedFacture (){
  console.log("confirm facture");
  
  this.getName = function () {
    return "confirm Facture";
  };

}

ConfirmNeedFacture.prototype = new InitialFacture();

/*****************************************************************************/
/* Unit test */
/*****************************************************************************/

function run() {
  var client = new ClientProject("alex");

  
  //client.getState().subscribe(stateObs);
  client.getState().setEtape("confirm");
  client.getState().fire(client.getState());
  
  
  client.getState().setEtape("valid");
  
  client.getState().validEtape(true);
  //client.getState().fire(client.getState());


  client.getState().setEtape("valid");
  client.getState().validEtape(true);
  //client.getState().fire(client.getState());
  console.log("IS SWITCHED OR NOT"+client.getState().getName());
  console.assert(client.getState().getName() === "Facture", "SWITCHED status from devis to facture");
  
//   setTimeout(function() {
//   console.log("time out\n\n\n");
 
//   }, 2000);
  var client2 = new ClientProject("alexMAJ");


  console.log("client 1 name: %s", client.getName());
  console.log("client 1 creation date: %d", client.getCreationDate());
  console.log("client 1 state is:"+ client.getState().getName());
  
  // console.log("client 2 name: %s", client2.getName());
  // console.log("client 2 creation date: %d", client2.getCreationDate());
  
  
  return ("END ____---------_________------- Return");
}

var Future = Npm.require( 'fibers/future' );


function simpleStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};

function facto(opt) {
  return new ClientProject(opt);
};

Meteor.methods({
    'getAllClients': function () {
      // server method logic
      var res = []
      
      for (client in ClientProject.objects) {
        console.log(simpleStringify(ClientProject.objects[client].getAllProp()));
        res.push(simpleStringify(ClientProject.objects[client].getAllProp()));
      }
      return res;
    },

    'getStateFromClients': function (clientId) {
      // server method logic
      for (client in ClientProject.objects) {
        if (ClientProject.objects[client].getId() === clientId) {
          var res = ClientProject.objects[client].getState().getAllProp();
        }
        return (res);
      }
    },


    createNewClient: function (name, state) {
      console.log("createNewClient method arg name: "+name);
      var res = new ClientProject(name, state, null);
      console.log(simpleStringify(res));
      return (simpleStringify(res.getAllProp()));
    }  
});


