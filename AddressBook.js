'use strict';

var utils = require('../utils/writer.js');
var AddressBook = require('../service/AddressBookService');

module.exports.addressBookCreate = function addressBookCreate (req, res, next) {
  var addressBook = req.swagger.params['addressBook'].value;
  AddressBook.addressBookCreate(req,res,next);
    /*.then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });*/
	
};

module.exports.addressBookFindByFields = function addressBookFindByFields (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var firstName = req.swagger.params['firstName'].value;
  var lastName = req.swagger.params['lastName'].value;
  var emailAddress = req.swagger.params['emailAddress'].value;
  var fields = req.swagger.params['fields'].value;
  AddressBook.addressBookFindByFields(offset,limit,firstName,lastName,emailAddress,fields)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addressBookGet = function addressBookGet (req, res, next) {
  var id = req.swagger.params['Id'].value;
  AddressBook.addressBookGet(req,res,next);
 
};

module.exports.addressBookSearch = function addressBookSearch (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var fields = req.swagger.params['fields'].value;
  var search = req.swagger.params['search'].value;
  AddressBook.addressBookSearch(offset,limit,fields,search)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addressBookUpdate = function addressBookUpdate (req, res, next) {
  var id = req.swagger.params['Id'].value;
  var addressBook = req.swagger.params['addressBook'].value;
  AddressBook.addressBookUpdate(id,addressBook)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
