"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError {
    constructor(name) {
        this.reason = '[Product not found]:';
        this.message = `this ${name} not found`;
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found.error.js.map