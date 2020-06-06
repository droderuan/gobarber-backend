"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = require("bcryptjs");
var BCryptProvider = /** @class */ (function () {
    function BCryptProvider() {
    }
    BCryptProvider.prototype.generateHash = function (payload) {
        return bcryptjs_1.hash(payload, 8);
    };
    BCryptProvider.prototype.compareHash = function (payload, hashed) {
        return bcryptjs_1.compare(payload, hashed);
    };
    return BCryptProvider;
}());
exports.default = BCryptProvider;
