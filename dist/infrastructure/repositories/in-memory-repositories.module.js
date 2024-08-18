"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepositoriesModule = void 0;
const common_1 = require("@nestjs/common");
const di_repositories_1 = require("../../domain/di.repositories");
const in_memory_products_repository_1 = require("./products/in-memory-products.repository");
let InMemoryRepositoriesModule = class InMemoryRepositoriesModule {
};
exports.InMemoryRepositoriesModule = InMemoryRepositoriesModule;
exports.InMemoryRepositoriesModule = InMemoryRepositoriesModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: di_repositories_1.PRODUCTS_REPOSITORY,
                useClass: in_memory_products_repository_1.InMemoryProductsRepository,
            },
        ],
        exports: [di_repositories_1.PRODUCTS_REPOSITORY],
    })
], InMemoryRepositoriesModule);
//# sourceMappingURL=in-memory-repositories.module.js.map