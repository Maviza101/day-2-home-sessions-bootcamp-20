'use strict';

describe("Produce the reverse order of a word: ", function() {
  var myApp = require("../app/reverseString.js");
  var reverseString = myApp.reverseString;

  describe("Check that function accepts only strings", function() {
    it("should return `Argument is not a string` for 31", function() {
      expect(reverseString(31)).toEqual('Argument is not a string');
    });

    it("should return `Argument is not a string` for true", function() {
      expect(reverseString(true)).toEqual('Argument is not a string');
    });
    
    it("should return `Argument is not a string` for []", function() {
      expect(reverseString([])).toEqual('Argument is not a string');
    });
    
    it("should return `Argument is not a string` for {}", function() {
      expect(reverseString({})).toEqual('Argument is not a string');
    });
    
    it("should return `Argument is not a string` for null", function() {
      expect(reverseString(null)).toEqual('Argument is not a string');
    });
    
    it("should return `Argument is not a string` for undefined", function() {
      expect(reverseString(undefined)).toEqual('Argument is not a string');
    });
    
    it("should return `Argument is not a string` for a function", function() {
      var sawLion = function() {
        return "Run!!!";
      }
      expect(reverseString(sawLion)).toEqual('Argument is not a string');
    });
    
    it("should return `Argument is not a string` for regex /[a-z]/", function() {
      expect(reverseString(/[a-z]/)).toEqual('Argument is not a string');
    });
  });

  describe("Case for an empty string", function() {
    it("should return null for empty string", function() {
      expect(reverseString('')).toEqual(null);
    });
  });

  describe("Case for palindromes", function() {
    it("should return true for `anna`", function() {
      expect(reverseString('anna')).toEqual(true);
    });

    it("should return true for `NaN`", function() {
      expect(reverseString('NaN')).toEqual(true);
    });

    it("should return true for `civic`", function() {
      expect(reverseString('civic')).toEqual(true);
    });

    it("should return true for `this way yaw sith`", function() {
      expect(reverseString('this way yaw siht')).toEqual(true);
    });
  });

  describe("Case for normal words", function() {
    it("should return `a` for `a`", function() {
      expect(reverseString('a')).toEqual('a');
    });

    it("should return `skoob` for `books`", function() {
      expect(reverseString('books')).toEqual('skoob');
    });

    it("should return `nomolos` for `solomon`", function() {
      expect(reverseString('solomon')).toEqual('nomolos');
    });

    it("should return `lonatub-2,1-orolhc` for `chloro-1,2-butanol`", function() {
      expect(reverseString('chloro-1,2-butanol')).toEqual('lonatub-2,1-orolhc');
    });

    it("should return `csim` for `misc`", function() {
      expect(reverseString('misc')).toEqual('csim');
    });
  });
});
