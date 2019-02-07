'use strict';

var config = require('./config.json');

var utils = require('../utils/writer.js');

var util = require('util');

var uuid = require('node-uuid');

var mongoUtils = require('../utils/mongoUtils')

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var argv = require('minimist')(process.argv);
var dbhost = argv.dbhost ? argv.dbhost: config.db_host;


const mongourl = config.db_prot + "://" + dbhost + ":" + config.db_port + "/" + config.db_name;

console.log(mongourl);



/**
 * addressBookCreate
 * 
 *
 * addressBook AddressBook 
 * returns AddressBook
 **/
exports.addressBookCreate = function(req, res, next) {
    //var args = req.swagger.params;
    var addressBook = req.swagger.params['addressBook'].value;
    console.log(uuid.v4()) ; 
	console.log(addressBook);
    //var addressBook = args.addressBook.value;
    
    if (addressBook.id == undefined) {
        addressBook.id = uuid.v4();
    }
    
    // Use connect method to connect to the server
    console.log('connecting....');
	MongoClient.connect("mongodb://localhost:27017/test",{useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        console.log('connected');
        // Get the documents collection
		var db = client.db('test');
        var collection = db.collection('addressBook');
        // Insert some documents
        collection.insertOne(addressBook, function (err, result) {
            console.log("assert") ; 
			//assert.equal(err, null)
        });
		console.log("SAVED DATA"); 
        client.close();
		
		res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(addressBook));
		
    });
	
	//res.setHeader('Content-Type', 'application/json');
    
   // res.setHeader('Location', self);
    //res.end(JSON.stringify(addressBook));
}


/**
 * addressBookFindByFields
 * 
 *
 * offset String 
 * limit String 
 * firstName String  (optional)
 * lastName String  (optional)
 * emailAddress String  (optional)
 * fields String  (optional)
 * returns AddressBook
 **/
exports.addressBookFindByFields = function(offset,limit,firstName,lastName,emailAddress,fields) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "homePhoneNum" : "homePhoneNum",
  "secondPhoneType" : "secondPhoneType",
  "emailAddress" : "emailAddress",
  "thirdPhoneType" : "thirdPhoneType",
  "Id" : "Id",
  "secondPhoneNumber" : "secondPhoneNumber",
  "relatedContact" : "{}",
  "thirdPhoneNumber" : "thirdPhoneNumber"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * addressBookGet
 * 
 *
 * id String 
 * returns AddressBook
 **/
exports.addressBookGet = function(req,res,next) {
 
        var args = req.swagger.params;
   
        MongoClient.connect("mongodb://localhost:27017/test",{useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
		
		var db = client.db('test');
        var collection = db.collection('addressBook');
		
        var addressBookId = String(req.swagger.params.Id.value);
        console.log("ID" + addressBookId );
        const query = {
            id: addressBookId
        }
        
        
        collection.findOne(query, function (err, doc) {
            
            
            try {
            assert.equal(err, null);
            }
            catch (err) {
            
            console.log(err);
            
            res.statusCode = 500;
            var error = { };
            error = { 'code': 'ERR0001' , 'reason' : err , 'message:' : 'provide a different id' };
            res.end(JSON.stringify(error));
             }
            
            if (doc == null) {
                res.statusCode = 404;
                var error = {
                };
                error = {
                    'code':   'ERR0001', 'reason': 'not found', 'message:': 'provide a different id'
                };
                res.end(JSON.stringify(error));
            } else {
                res.setHeader('Content-Type', 'application/json');
                delete doc[ "_id"]
                
                res.end(JSON.stringify(doc));
            }
        })
    })
 
 
 
}


/**
 * addressBookSearch
 * 
 *
 * offset String 
 * limit String 
 * fields String  (optional)
 * search String  (optional)
 * returns List
 **/
exports.addressBookSearch = function(offset,limit,fields,search) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "homePhoneNum" : "homePhoneNum",
  "secondPhoneType" : "secondPhoneType",
  "emailAddress" : "emailAddress",
  "thirdPhoneType" : "thirdPhoneType",
  "Id" : "Id",
  "secondPhoneNumber" : "secondPhoneNumber",
  "relatedContact" : "{}",
  "thirdPhoneNumber" : "thirdPhoneNumber"
}, {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "homePhoneNum" : "homePhoneNum",
  "secondPhoneType" : "secondPhoneType",
  "emailAddress" : "emailAddress",
  "thirdPhoneType" : "thirdPhoneType",
  "Id" : "Id",
  "secondPhoneNumber" : "secondPhoneNumber",
  "relatedContact" : "{}",
  "thirdPhoneNumber" : "thirdPhoneNumber"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * addressBookUpdate
 * 
 *
 * id String 
 * addressBook AddressBook 
 * returns AddressBook
 **/
exports.addressBookUpdate = function(id,addressBook) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "homePhoneNum" : "homePhoneNum",
  "secondPhoneType" : "secondPhoneType",
  "emailAddress" : "emailAddress",
  "thirdPhoneType" : "thirdPhoneType",
  "Id" : "Id",
  "secondPhoneNumber" : "secondPhoneNumber",
  "relatedContact" : "{}",
  "thirdPhoneNumber" : "thirdPhoneNumber"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

