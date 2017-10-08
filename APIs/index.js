var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var DURAK_COLLECTION = "durakCollection";

var IZBAN_COLLECTION = "izbanCollection";

var METRO_COLLECTION = "metroCollection";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://localhost:27017', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/durak", function(req, res) {
  db.collection(DURAK_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/durak", function(req, res) {
  db.collection(DURAK_COLLECTION).find({}).toArray(function(err, docs) {
	console.log(docs);
	if(err) {
	  handleError(res, err.message, "Failed to get contacts");
	}
	else if(docs.length == 0) {
	  var newContact = req.body;
	  newContact.createDate = new Date();

	  db.collection(DURAK_COLLECTION).insertOne(newContact, function(err, doc) {
		if (err) {
		  handleError(res, err.message, "Failed to create new contact.");
		} else {
		  res.status(201).json(doc.ops[0]);
		}
	  });
	}
	else {
	  db.collection(DURAK_COLLECTION).update({id: 1}, {$inc: {kisi: parseInt(req.body.kisi)}});
	  res.status(201).json({'OK': 'Added.'});
	}
  });
});

app.delete("/api/durak/:id", function(req, res) {
  db.collection(DURAK_COLLECTION).update({id: parseInt(req.params.id)}, {$inc: {kisi: -1}});
  res.status(201).json({'OK': 'Added.'});
});

app.get("/api/metro", function(req, res) {
  db.collection(METRO_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/metro", function(req, res) {
  db.collection(METRO_COLLECTION).find({}).toArray(function(err, docs) {
	if(err) {
	  handleError(res, err.message, "Failed to get contacts");
	}
	else if(docs.length == 0) {
	  var newContact = req.body;
	  newContact.createDate = new Date();

	  db.collection(METRO_COLLECTION).insertOne(newContact, function(err, doc) {
		if (err) {
		  handleError(res, err.message, "Failed to create new contact.");
		} else {
		  res.status(201).json(doc.ops[0]);
		}
	  });
	}
	else {
	  db.collection(METRO_COLLECTION).update({id: 1}, {$inc: {kisi: req.body.kisi}});
	  res.status(201).json({'OK': 'Added.'});
	}
  });
});

app.delete("/api/metro/:id", function(req, res) {
  db.collection(METRO_COLLECTION).update({id: parseInt(req.params.id)}, {$inc: {kisi: -1}});
  res.status(201).json({'OK': 'Added.'});
});

app.get("/api/izban", function(req, res) {
  db.collection(IZBAN_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/izban", function(req, res) {
  db.collection(IZBAN_COLLECTION).find({}).toArray(function(err, docs) {
	if(err) {
	  handleError(res, err.message, "Failed to get contacts");
	}
	else if(docs.length == 0) {
	  var newContact = req.body;
	  newContact.createDate = new Date();

	  db.collection(IZBAN_COLLECTION).insertOne(newContact, function(err, doc) {
		if (err) {
		  handleError(res, err.message, "Failed to create new contact.");
		} else {
		  res.status(201).json(doc.ops[0]);
		}
	  });
	}
	else {
	  db.collection(IZBAN_COLLECTION).update({id: 1}, {$inc: {kisi: req.body.kisi}});
	  res.status(201).json({'OK': 'Added.'});
	}
  });
});

app.delete("/api/izban/:id", function(req, res) {
  db.collection(IZBAN_COLLECTION).update({id: parseInt(req.params.id)}, {$inc: {kisi: -1}});
  res.status(201).json({'OK': 'Added.'});
});
