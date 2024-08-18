"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const procuct_entity_1 = require("../../../domain/entities/procuct.entity");
let InMemoryProductsRepository = class InMemoryProductsRepository {
    constructor() {
        this.products = new Map();
    }
    save(product) {
        this.products.set(product.uuid, product);
    }
    findByUuid(uuid) {
        const product = this.products.get(uuid);
        if (!product)
            return null;
        return new procuct_entity_1.Product(product);
    }
    update(product) {
        this.products.set(product.uuid, product);
    }
    delete(uuid) {
        this.products.delete(uuid);
    }
};
exports.InMemoryProductsRepository = InMemoryProductsRepository;
exports.InMemoryProductsRepository = InMemoryProductsRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryProductsRepository);
//# sourceMappingURL=in-memory-products.repository.js.map