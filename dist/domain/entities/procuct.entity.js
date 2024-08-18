"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const crypto_1 = require("crypto");
class Product {
    constructor(props, uuid) {
        Object.assign(this, props);
        if (!uuid) {
            this.uuid = (0, crypto_1.randomUUID)();
        }
    }
}
exports.Product = Product;
//# sourceMappingURL=procuct.entity.js.map