/* GET Locations page */
module.exports.homelist = function(req, res){
	res.render('locations-list', {
	 title: 'Location List',
	 pageHeader: {
	 	title: 'Loc8r',
	 	strapline: 'Find places to work with wifi near you !!'
	 },
	 locations: [
	 {
	 	name: 'Starcups',
	 	address: '125 High St, Reading, US',
	 	rating: 3,
	 	facilities: ['Hot drinks','Food','Wifi'],
	 	distance: '100m'
	 },
	 {
	 	name: 'Coffee Cups',
	 	address: '323 Main St, Hihligf, US',
	 	rating: 1,
	 	facilities: ['Hot drinks','Drinks','Wifi'],
	 	distance: '222m'
	 }
	 ] 
	});	
};

module.exports.locationInfo = function(req, res){
	res.render('location-info', { title: 'Location Info' });	
};

module.exports.addReview = function(req, res){
	res.render('location-review-form', { title: 'Add Review' });	
};