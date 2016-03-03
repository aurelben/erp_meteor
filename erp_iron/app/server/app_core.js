/*****************************************************************************/
/*  Define client class */
/*****************************************************************************/
var ShortId = Npm.require('shortid');



ClientProject = function (name, state, date, id) {
    console.log(state);
    if (!state) {
      this.currentState = new Prospect(this);
    }else {
      this.currentState = eval("new "+state+"(this)");
    }
    
    this.currentState.subscribe(stateObs);
    this.name = name;
    this.id = ShortId.generate();

    if (!id) {
      this.id = ShortId.generate();
    } else {
      this.id = id;
    }
    
    if(!date){
      this.createDate = Date.now();
    } else {
      this.createDate = date;
    }
    
    /**
     * save object on objects array
     */
    ClientProject.objects.push(this);
    //caretaker.add(this.id, this.hydrate());
    //
    this.getId = function () {
      return this.id;
    };
  
    this.setState = function (state) {
        this.currentState.unsubscribe(stateObs);
        
        this.currentState = state;
        
        this.currentState.subscribe(stateObs);
        this.currentState.save();
        //caretaker.add(this.id, this.hydrate());
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
      res.state = this.currentState.getName();

      return (res);
    };

    /**
     * @return {Obj contain curent object property}
     */
    this.setAllProp = function (memento){
      var m = JSON.parse(memento);
      this.name = m.name;
      this.id = m.id;
      this.createDate = m.createDate;
      // ** m.state is a state object need to rebuild it
      //this.state = m.state;

      return (this);
    };

    
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
/*  Define menento pattern */
/*****************************************************************************/



  ClientProject.prototype .hydrate =  function () {
    var tmp = this.getAllProp();
    var tmpState = this.getState();
    tmp.stateObj = tmpState.getAllProp();
    memento = JSON.stringify(tmp);

    return memento;
  };

  ClientProject.prototype.dehydrate = function (memento) {
    console.dir(memento);
    var m = JSON.parse(memento);
    console.log("dehydrate memento recived object");
    console.dir(m);
    this.setAllProp(memento);
    console.dir(m.stateObj);
    this.currentState.setAllProp(m.stateObj);
  };
  


var CareTaker = function () {
  this.mementos = {};

  this.add = function (key, memento) {
    this.mementos[key] = memento;
    saveToFile(this.mementos, "save.json");
  },

  this.get = function (key) {
    return this.mementos[key];
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
    this.fire(this);
    
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
        console.log("*********I'am saving the state object**********");
    };

    this.getId = function () {
      return this.id;
    }

    this.getAllProp = function (){
      var res = {};
      res.name = this.name;
      res.id = this.id;
      res.createDate = this.createDate;
      res.etape = this.currentEtape.getAllProp();

      return (res);
    }

    /**
     * @return {Obj contain curent object property}
     */
    this.setAllProp = function (memento){
      console.log("\nSTATE setAllProp\n");
      //console.dir(memento);
      var m = memento;
      console.dir(m.etape.name);
      this.name = m.name;
      this.id = m.id;
      this.createDate = m.createDate;
      this.setEtape(m.etape.name.split(" ")[0]);
      // ** m.state is a state object need to rebuild it
      //this.state = m.state;

      return (this);
    };
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
        var scope = thisObj || global;
        
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
          } else {
            console.log("ERROR etape "+type+" not authorized \n");
            //return;
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
caretaker = new CareTaker();

function run(caretaker) {
  var client = new ClientProject("alex");
  caretaker.add(client.getId(), client.hydrate());
  
  //client.getState().subscribe(stateObs);
  client.getState().setEtape("confirm");
  caretaker.add(client.getId(), client.hydrate());
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
  caretaker.add(client2.getId(), client2.hydrate());
  console.dir(caretaker.get(client2.getId()));
  client2.dehydrate(caretaker.get(client2.getId()));

  console.log("client 1 name: %s", client.getName());
  console.log("client 1 creation date: %d", client.getCreationDate());
  console.log("client 1 state is:"+ client.getState().getName());

  console.dir(caretaker.get(client2.getId()));
  
  // console.log("client 2 name: %s", client2.getName());
  // console.log("client 2 creation date: %d", client2.getCreationDate());
  
  return ("END ________---------_________------- Return");
}



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
    getAllClients: function () {
        // server method logic
        var res = []
        
        for (client in ClientProject.objects) {
          //console.log(simpleStringify(ClientProject.objects[client].getAllProp()));
          res.push(JSON.stringify(ClientProject.objects[client].getAllProp()));
        }
        return res;
    },

    getStateFromClients: function (clientId) {
        // server method logic
        for (client in ClientProject.objects) {
          if (ClientProject.objects[client].getId() === clientId) {
            var res = ClientProject.objects[client].getState().getAllProp();
          }
          return (res);
        }
      },

      getEtapeFromState: function (stateId) {
        // server method logic
        for (client in ClientProject.objects) {
          if (ClientProject.objects[client].getState().getId() === stateId) {
            var res = ClientProject.objects[client].getState().getEtape().getAllProp();
          }
          return (res);
      }
    },


    createNewClient: function (name, state, etape, valid) {
      console.log("createNewClient method arg name: "+name);
      var res = new ClientProject(name, state, null);
      caretaker.add(res.getId(), res.hydrate());
      console.log(simpleStringify(res));
      return (simpleStringify(res.getAllProp()));
    },

    updateClient: function (clientId, name, state, etape, valid) {
      var iter = new Iterator(ClientProject.objects);
            iter.each(function(client){
        if (client.getId() === clientId) {
          client.setName(name);
          client.setState(state);
          console.log(client);
          /*marche niquel pour le name*/
        }
      });
    },

    getClient: function (clientId) {
      var iter = new Iterator(ClientProject.objects);
      
      iter.each(function(client){
        if (client.getId() === clientId) {
          console.log(client.getAllProp());
          return (client.getAllProp());
        }
        //log.add("error client id not found");
        //log.show();
      });
    },

    'testState': function () {
      // server method logic
      console.info("in testState");
      run(caretaker);
      return "ok";
  },
});


