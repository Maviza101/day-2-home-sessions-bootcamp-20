#!/usr/bin/env node

'use strict';

var displayItems = require('../app/displayItems.js').displayItems;

var unirest = require('unirest');
var SEARCH_TYPE = 'artist';
unirest.get('https://api.spotify.com/v1/search?q=bowie&type=' + SEARCH_TYPE)
	.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
	.end(function (response) {
    var searchTypeKey = SEARCH_TYPE + 's';
    console.log(displayItems(response.body, searchTypeKey));
});
