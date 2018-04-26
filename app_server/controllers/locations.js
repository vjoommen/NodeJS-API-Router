/* GET Locations page */
module.exports.homelist = function(req, res){
	renderHomepage(req, res);	
};

module.exports.locationInfo = function(req, res){
	res.render('location-info', { title: 'Location Info' });	
};

module.exports.addReview = function(req, res){
	res.render('location-review-form', { title: 'Add Review' });	
};

var renderHomepage = function(req, res, responseBody){
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
   });
};
