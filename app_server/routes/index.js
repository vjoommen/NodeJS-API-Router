var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main.js');

var homepageController = function(req, res){
	ctrlMain.index(req,res);
};

/* GET home page. */
router.get('/', homepageController);

module.exports = router;
