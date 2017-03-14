'use strict';

module.exports.displayItems = function displayItems(obj, itemsKey) {
  // Validate input.
	if (typeof obj != 'object') {
    return 'First argument is not an object';
	}
  if (obj == null) {
    return 'First argument must not be null';
  }
  if (obj instanceof Array) {
    return 'First argument must not be an array';
  }
  if (Object.keys(obj).length  && obj.constructor == Object) {
    return 'First argument must not be an empty object';
  };

  var statusMessge = '';
  try {    
    var items = obj[itemsKey];

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      // Responses for albums, playlists and tracks don't have followers and popularity.
      var itemDetails = 'Name: ' + item.name + '\n' +
            'Type: ' + item.type + '\n' + 
            'Followers: ' + item.followers.total + '\n' + 
            'Popularity: ' + item.popularity + '\n' +
            'Spotify URL: ' + item.external_urls.spotify + '\n' + 
            '\n';
      console.log(itemDetails);
    }

  }
  catch (e) {
    if (e.message == 'Cannot read property \'length\' of undefined') {
      statusMessge = 'First argument must not be an empty object';      
    }
  }

  return statusMessge;
}
