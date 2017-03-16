'use strict';

module.exports = {
  reverseString: function(someString) {
    // Validate input.
    var typeOfArg = typeof someString;
    if (typeOfArg != 'string') {
      return 'Argument is not a string';
    }
    if (someString.length == 0) {
      return null;
    }

    // Deal with a trivial case.
    if (someString.length == 1) {
      return someString;
    }

    var reversed = someString.split('').reverse();
    var reversedString = reversed.join('');
    if (reversedString == someString) {
     return true;
    }

    return reversedString;
  }
}
