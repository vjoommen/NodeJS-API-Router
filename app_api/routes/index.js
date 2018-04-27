var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlDb2 = require('../controllers/db2Test');

//locations
router.get('/locations', ctrlLocations.locationList); // get the list of locations
router.post('/locations', ctrlLocations.locationsCreate); // create a new location
router.get('/locations/:locationid', ctrlLocations.locationsReadOne); // get one location detail
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne); // Update existing location detail
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne); // Delete location

//reviews
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate); // create new review
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne); // get one review
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne); // update one review
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne); // delete one review

//order
router.get('/orders', ctrlDb2.getOrderList); // get the list of orders from DB2

module.exports = router;
