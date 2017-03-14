'use strict';

describe("Unit Tests for displayItems()", function() {
	var myApp = require('../app/displayItems.js');
	var displayItems = myApp.displayItems;
	var itemsKey = 'artissts';
	describe("Test that it accepts only valid arguments", function() {
		it("should return `First argument must not be an array` for []", function() {
			expect(displayItems([], itemsKey)).toEqual("First argument must not be an array");
		});
		
		it("should return `First argument is not an object` for 54", function() {
			expect(displayItems(54, itemsKey)).toEqual("First argument is not an object");
		});
		
		it("should return `First argument is not an object` for a function", function() {
			var cheekPosition = function() {
				return 'On the face';
			}
			expect(displayItems(cheekPosition, itemsKey)).toEqual("First argument is not an object");
		});
		
		it("should return `First argument is not an object` for false", function() {
			expect(displayItems(false, itemsKey)).toEqual("First argument is not an object");
		});
		
		it("should return `First argument is not an object` for undefined", function() {
			expect(displayItems(undefined, itemsKey)).toEqual("First argument is not an object");
		});
		
		it("should return `First argument must not be null` for null", function() {
			expect(displayItems(null, itemsKey)).toEqual("First argument must not be null");
		});
		
		it("should return `First argument must not be an empty object` for {}", function() {
			expect(displayItems({}, itemsKey)).toEqual("First argument must not be an empty object");
		});
	});
});
