'use strict';

module.exports.displayItems = function(obj, itemsKey) {
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
  if (Object.keys(obj).length == 0) {
    return 'First argument must not be an empty object';
  }
  if (itemsKey == undefined) {
    return 'Second argument must be defined';
  }
  if (typeof itemsKey != 'string') {
    return 'Second argument must be a string';
  }

  var statusMessge = 'ff';
  var items = obj[itemsKey].items;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    // Responses for albums, playlists and tracks don't have followers and popularity.
    var itemDetails = 'Name: ' + item.name + '\n' +
          'Followers: ' + item.followers.total + '\n' + 
          'Popularity: ' + item.popularity + '\n' +
          'Spotify URL: ' + item.external_urls.spotify + '\n' + 
          '\n';
    console.log(itemDetails);
  }
}
