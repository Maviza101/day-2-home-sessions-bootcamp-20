'use strict';

describe("Unit Tests for displayItems()", function() {
	var myApp = require('../app/displayItems.js');
	var displayItems = myApp.displayItems;
	describe("Test that it accepts only valid arguments", function() {
		it("should return `Argument is not an object` for []", function() {
			expect(displayItems([])).toEqual("Argument is not an object");
		});
		
		it("should return `Argument is not an object` for 54", function() {
			expect(displayItems([])).toEqual("Argument is not an object");
		});
		
		it("should return `Argument is not an object` for a function", function() {
			var cheekPosition = function() {
				return 'On the face';
			}
			expect(displayItems(cheekPosition)).toEqual("Argument is not an object");
		});
		
		it("should return `Argument is not an object` for false", function() {
			expect(displayItems(false)).toEqual("Argument is not an object");
		});
		
		it("should return `Argument is not an object` for undefined", function() {
			expect(displayItems(undefined)).toEqual("Argument is not an object");
		});
		
		it("should return `Argument must not be null` for null", function() {
			expect(displayItems([])).toEqual("Argument must not be null");
		});
		
		it("should return `Object argument must not be empty` for []", function() {
			expect(displayItems([])).toEqual("Object argument must not be empty");
		});
	});
});
