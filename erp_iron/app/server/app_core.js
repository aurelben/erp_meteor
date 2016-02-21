/*****************************************************************************/
/*  Define client class */
/*****************************************************************************/
var ClientProject = function (name, date) {
    this.currentState = new Prospect(this);
    this.name = name;
    
    if(!date){
      this.createDate = Date.now();
    } else {
      this.createDate = date;
    }
  
    this.setState = function (state) {
        this.currentState = state;
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
};

/*****************************************************************************/
/*  define state classe */
/*****************************************************************************/

var ClientState = function (client) {
    this.client = client;
    this.handlers = [];
    
    this.setEtape = function (etape) {
      this.currentEtape = this.factory.createEtape(etape);
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
      item.getClient().getState().unsubscribe(stateObs);
      item.getClient().setState(new Devis(item.getClient()));
      item.getClient().getState().subscribe(stateObs);
    }

    if(item.getEtape().getName() === "valid Devis" && item.getEtape().getValid() === true){
      console.log("--------------go to next client state facture");
      item.getClient().getState().unsubscribe(stateObs);
      item.getClient().setState(new Facture(item.getClient()));
      item.getClient().getState().subscribe(stateObs);
    }
    
    console.log("fired: " + item.getEtape().getName()); 
};

/*****************************************************************************/
/*  define each client state */
/*****************************************************************************/

var Prospect = function (client) {
    this.client = client;
    this.factory = new FactoryProspect();
    this.getName = function (){
      return ("Prospect");
    };
    
};

Prospect.prototype = new ClientState();


var Devis = function (client) {
    this.client = client;
    this.factory = new FactoryDevis();
    this.getName = function (){
      return ("Devis");
    };
    
};

Devis.prototype = new ClientState();

var Facture = function (client) {
    this.client = client;
    this.factory = new FactoryFacture();
    this.getName = function (){
      return ("Facture");
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

  this.getName = function () {
    return "init Prospect";
  };

  this.setValid = function(opt) {
    this.isvalid = opt;
  };

  this.getValid = function () {
    return (this.isvalid);
  };
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

  var state = client.getState();
  
  state.subscribe(stateObs);
  state.setEtape("confirm");
  state.fire(state);
  var etape = state.getEtape();
  //console.log(etape.getName());
  
  
  state.setEtape("valid");
  etape = state.getEtape();
  etape.setValid(true);
  state.fire(state);


  state = client.getState();
  state.setEtape("valid");
  etape = state.getEtape();
  etape.setValid(true);
  state.fire(state);
  console.log("IS SWITCHED OR NOT"+client.getState().getName());
  var res = etape.getName();
  
//   setTimeout(function() {
//   console.log("time out\n\n\n");
 
//   }, 2000);
  var client2 = new ClientProject("alexMAJ");
  console.log("client 1 name: %s", client.getName());
  console.log("client 1 creation date: %d", client.getCreationDate());
  console.log("client 1 state is:"+ client.getState().getName());
  
  // console.log("client 2 name: %s", client2.getName());
  // console.log("client 2 creation date: %d", client2.getCreationDate());
  
  
  
  console.log("client 1 status etape " + res+"\n");
  
  return ("END ____---------_________------- Return");
}
