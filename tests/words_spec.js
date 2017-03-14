'use strict';

var myApp = require("../app/words.js");
var words = myApp.words;

describe("Words Counting Functionality", function() {
  describe("Test that function accepts only strings", function() {
    it("should return `Argument is not a string` for []", function() {
      expect(words([])).toEqual('Argument is not a string');
    });

    it("should return `Argument is not a string` for {}", function() {
      expect(words({})).toEqual('Argument is not a string');
    });

    it("should return `Argument is not a string` for 9", function() {
      expect(words(9)).toEqual('Argument is not a string');
    });

    it("should return `Argument is not a string` for Boolean false", function() {
      expect(words(false)).toEqual('Argument is not a string');
    });

    it("should return `Argument is not a string` for a function", function() {
      var sayHi = function() {
        return 'Howdy! Nice to meet you.';
      }
      expect(words(sayHi)).toEqual('Argument is not a string');
    });

    it("should return `Argument is not a string` for NaN", function() {
      expect(words(NaN)).toEqual('Argument is not a string');
    });

    it("should return `Argument is not a string` for NaN", function() {
      expect(words(NaN)).toEqual('Argument is not a string');
    });

    it("should return `Argument is not a string` for null", function() {
      expect(words(null)).toEqual('Argument is not a string');
    });

    it("should return `Argument is not a string` for undefined", function() {
      expect(words(undefined)).toEqual('Argument is not a string');
    });

    it("should return {} for ''", function() {
      expect(words('')).toEqual({});
    });

    it("should return `{one: 1, two: 2, three: 3}` for valid input `one two three two three three", function() {
      expect(words("one two three two three three")).toEqual({one: 1, two: 2, three: 3});
    });
  });

  describe("words()", function() {
    it("counts one word", function() {
      var expectedCounts = { word: 1 };
      expect(words("word")).toEqual(expectedCounts);
    });

    it("counts one of each", function() {
      var expectedCounts = { one: 1, of: 1, each: 1 };
      expect(words("one of each")).toEqual(expectedCounts);
    });

    it("counts multiple occurrences", function() {
      var expectedCounts = { one: 1, fish: 4, two: 1, red: 1, blue: 1 };
      expect(words("one fish two fish red fish blue fish")).toEqual(expectedCounts);
    });

    it("includes punctuation", function() {
      var expectedCounts = { car: 1, ":": 2, carpet: 1, as: 1, java: 1, "javascript!!&@$%^&": 1 };
      expect(words("car : carpet as java : javascript!!&@$%^&")).toEqual(expectedCounts);
    });

    it("includes numbers", function() {
      var expectedCounts = { testing: 2, 1: 1, 2: 1 };
      expect(words("testing 1 2 testing")).toEqual(expectedCounts);
    });

    it("respects case", function() {
      var expectedCounts = { go: 1, Go:1, GO:1 };
      expect(words("go Go GO")).toEqual(expectedCounts);
    });

    it("counts properly international characters", function() {
      var expectedCounts = { "¡Hola!": 1, "¿Qué": 1, "tal?": 1, "Привет!": 1 };
      expect(words("¡Hola! ¿Qué tal? Привет!")).toEqual(expectedCounts);
    });

    it("counts multiline", function() {
      var expectedCounts = { hello: 1, world: 1 };
      expect(words("hello\nworld")).toEqual(expectedCounts);
    });

    it("counts tabs", function() {
      var expectedCounts = { hello: 1, world: 1 };
      expect(words("hello\tworld")).toEqual(expectedCounts);
    });

    it("counts multiple spaces as one", function() {
      var expectedCounts = { hello: 1, world: 1 };
      expect(words("hello  world")).toEqual(expectedCounts);
    });

    it("handles properties that exist on Object's prototype", function() {
      var expectedCounts = { reserved: 1, words : 1, like :1,  prototype: 1, and : 1, toString: 1,  "ok?": 1};
      expect(words("reserved words like prototype and toString ok?")).toEqual(expectedCounts);
    });
  });
});
