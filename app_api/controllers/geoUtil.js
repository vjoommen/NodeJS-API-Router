var earthRadius = 6371; // km, miles is 3959

module.exports = {

  getDistanceFromRads : function(rads) {
    return parseFloat(rads * earthRadius);
  },

  getRadsFromDistance : function(distance) {
    return parseFloat(distance / earthRadius);
  }

}