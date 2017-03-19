#!/usr/bin/env node

'use strict';

var displayItems = require('./displayItems').displayItems;
var program = require('commander');
var unirest = require('unirest');

var SEARCH_TYPE = 'artist';
var term = '';
var itemsPerQuery = 10;
// To the user, the logical option is 1-based page numbers. But the API requires 0-based page numbers.
var pageNum = 0;

try {
  // TODO: Find a way to bypass commander's auto usage of the current file's name at the 
  // start of the usage text below.
  program
    .usage('\n\n\n $ search-spotify-artists <nameOfArtist> [options] \n\n ' +
        'This is a simple console app that can be used to search for artists on \n' + 
        'Spotify. It requires one argument: the name of the artist you are searching \n' + 
        'for. If the name has more than one word in it e.g Trip Lee, you need to \n' + 
        'enclose it in a pair of single quotes (\'\') or double quotes (""). You may \n' + 
        'also use any of the options listed below to modify your search.'
        )
    .arguments('<nameOfArtist>')
    .option('-r, --items-per-page <perPage>', 'The number of search results you want to \n' + 
        'see per request. Default is ' + itemsPerQuery + '.'
        )
    .option('-p, --paginate <pageNumber>', 'The page number of the results you \n' + 
        'want to see. The results of a search are often many, so they are placed \n' + 
        'in \'pages\' of 5 or more results. Default is 1.'
        )
    .action(function(nameOfArtist) {
      if (nameOfArtist == '' || nameOfArtist == undefined) {
        console.log('Error. No search term given.\n');
        return;
      }
      else {
        term = nameOfArtist;
      }

      var tempItemsPerQuery = Number.parseInt(program.itemsPerPage);
      if (tempItemsPerQuery > 0 && tempItemsPerQuery < 51) {
        itemsPerQuery = tempItemsPerQuery;
      }
      else {
        console.log('No valid results per page supplied. Using default...\n');
      }

      var tempPageNumber = Number.parseInt(program.paginate);
      if (tempPageNumber > 0 && tempPageNumber < 100001) {
        pageNum = tempPageNumber - 1;
      }
      else {
        console.log('No valid page number supplied. Using default...');
      }
    })
    .on('--help', function() {
      console.log('  Examples:\n');
      console.log('    $ search-spotify-artists lecrae \n');
      console.log('    $ search-spotify-artists lecrae -r 6 \n');
      console.log('    $ search-spotify-artists "trip lee" -p 2 \n');
      console.log('    $ search-spotify-artists \'andy mineo\' -r 6 -p 2 \n');
    })
    .parse(process.argv);
}
catch (e) {
  console.log('Invalid arguments. Please correct them and try again. \n' + 
      'You can also type "search-spotify-artists --help" for more info.\n'
      );
  return;
}

var urlToQuery = 'https://api.spotify.com/v1/search?' + 
    'q=' + term + 
    '&type=' + SEARCH_TYPE + 
    '&limit=' + itemsPerQuery + 
    '&offset=' + pageNum;
unirest.get(urlToQuery)
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
        'requests in a short while. Please retry after' + (180).toString + 'seconds.\n');
    }
    else if (Math.trunc(response.status / 100 ) == 4) {
      console.log('The request was unsuccessful due to an invalid command. Please correct it and try again. \n' + 
        'You can also type "search-spotify-artists --help" for more info.\n');
    }
    else {
      console.log('The request was not successful. Please check your network connection and try again. \n\n' + 
        'You can also type "search-spotify-artists --help" for more info.\n');
    }
});
