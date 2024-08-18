"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedError = void 0;
class UnexpectedError {
    constructor(message) {
        this.reason = '[Unexpected Error]:';
        this.message = 'An unexpected error occurred';
        console.error(message);
    }
}
exports.UnexpectedError = UnexpectedError;
//# sourceMappingURL=unexpected.error.js.map