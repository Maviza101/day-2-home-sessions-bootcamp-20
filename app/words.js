'use strict';

module.exports = {
  words: function(someString) {
    var typeOfArg = typeof someString;
    if (typeOfArg != 'string') {
      return 'Argument is not a string';
    }

    var wordCounts = {};
    if (someString.length == 0) {
      return wordCounts;
    }
   // Match ANY whitespace char.
    var components = someString.split(/\s+/);
    for (var i = 0; i < components.length; i++) {
      var item = components[i];
      if (item == '') {
        continue;
      }
      if (wordCounts[item] == undefined) {
        wordCounts[item] = 1;
      }
      // This takes care of reserved words, e.g toString
      else if (typeof wordCounts[item] != 'number') {
        wordCounts[item] = 1;
      }
      else {
        wordCounts[item]++;
      }
    }
    
    return wordCounts;
  }
}
