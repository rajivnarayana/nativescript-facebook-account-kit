var FacebookAccountKit = require("nativescript-facebook-account-kit").FacebookAccountKit;
var facebookAccountKit = new FacebookAccountKit();

describe("greet function", function() {
    it("exists", function() {
        expect(facebookAccountKit.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(facebookAccountKit.greet()).toEqual("Hello, NS");
    });
});