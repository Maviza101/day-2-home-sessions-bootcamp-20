#!/usr/bin/env node

'use strict';

var SEARCH_TYPE = 'artist';
var term = '';
var itemsPerQuery = 10;
// To the user, the logical option is 1-based page numbers. But the API requires 0-based page numbers.
var pageNum = 0;

var displayItems = require('../spotify-artists/displayItems.js').displayItems;
var program = require('commander');
try {
  program
    .arguments('<searchTerm>')
    .option('-p, --per-page [perPage]', 'Number of search results you want to see per page. Default is ' + itemsPerQuery + '.')
    .option('-n, --page-number [pageNumber]', 'Page number of results you want to see. Default is 1.')
    .action(function(searchTerm) {
      if (searchTerm == '' || searchTerm == undefined) {
        console.log('Error. No search term given.');
        return;
      }
      else {
        term = searchTerm;
      }

      var tempItemsPerQuery = Number.parseInt(program.perPage);
      if (tempItemsPerQuery > 0 && tempItemsPerQuery < 51) {
        itemsPerQuery = tempItemsPerQuery;
      }
      else {
        console.log('No valid results per page supplied. Using default...');
      }

      var tempPageNumber = Number.parseInt(program.pageNumber);
      if (tempPageNumber > 0 && tempPageNumber < 100001) {
        pageNum = tempPageNumber - 1;
      }
      else {
        console.log('No valid page number supplied. Using default...');
      }
    })
    .parse(process.argv);
}
catch (e) {
  console.log('Invalid arguments. Please correct them and try again. \n' + 
    'You can also type "spotify-artists --help" for more info.');
  return;
}

var unirest = require('unirest');
unirest.get(
    'https://api.spotify.com/v1/search?' + 
    'q=' + term + 
    '&type=' + SEARCH_TYPE + 
    '&limit=' + itemsPerQuery + 
    '&offset=' + pageNum
  )
	.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
	.end(function (response) {
    // Result will contain 'artists', not 'artist'.
    var searchTypeKey = SEARCH_TYPE + 's';

    // For this particular endpoint, 200 is the only 'success' status code.
    if (response.status == 200) {
      // Note: if all goes well, displayItems() returns nothing. It handles item display itself.
      displayItems(response.body, searchTypeKey); 
    }
    else if (response.status == 429) {
      console.log('The request was not successful because you\'ve made too many ' + 
        'requests in a short while. Please retry after' + (180).toString + 'seconds.');
    }
    else if (Math.trunc(response.status / 100 ) == 4) {
      console.log('The request was unsuccessful due to an invalid command. Please correct it and try again. \n' + 
        'You can also type "spotify-artists --help" for more info.');
    }
    else {
      console.log('The request was not successful. Please check your network connection and try again. \n\n' + 
        'You can also type "spotify-artists --help" for more info.');
    }
});
