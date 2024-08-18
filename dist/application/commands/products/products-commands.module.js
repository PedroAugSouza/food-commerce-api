"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsCommandsModule = void 0;
const common_1 = require("@nestjs/common");
const create_product_use_case_1 = require("./create/create-product.use-case");
const create_product_controller_1 = require("./create/create-product.controller");
let ProductsCommandsModule = class ProductsCommandsModule {
};
exports.ProductsCommandsModule = ProductsCommandsModule;
exports.ProductsCommandsModule = ProductsCommandsModule = __decorate([
    (0, common_1.Module)({
        providers: [create_product_use_case_1.CreateProductUseCase],
        controllers: [create_product_controller_1.CreateProductController],
    })
], ProductsCommandsModule);
//# sourceMappingURL=products-commands.module.js.map