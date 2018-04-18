var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');


var homepageController = function(req, res){
	ctrlMain.index(req,res);
};

/* GET home page. */
//router.get('/', homepageController);

/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* Others pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
