"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductUseCase = void 0;
const common_1 = require("@nestjs/common");
const di_repositories_1 = require("../../../../domain/di.repositories");
const procuct_entity_1 = require("../../../../domain/entities/procuct.entity");
const missing_param_error_1 = require("../../../../infrastructure/errors/shared/missing-param.error");
const unexpected_error_1 = require("../../../../infrastructure/errors/shared/unexpected.error");
const either_1 = require("../../../../infrastructure/utils/either/either");
let CreateProductUseCase = class CreateProductUseCase {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async execute(input) {
        try {
            if (!input.name)
                return new either_1.Left(new missing_param_error_1.MissingParamError('Name'));
            if (!input.price)
                return new either_1.Left(new missing_param_error_1.MissingParamError('Price'));
            if (!input.category)
                return new either_1.Left(new missing_param_error_1.MissingParamError('Category'));
            if (!input.image)
                return new either_1.Left(new missing_param_error_1.MissingParamError('Image'));
            if (!input.description)
                return new either_1.Left(new missing_param_error_1.MissingParamError('Description'));
            const product = new procuct_entity_1.Product({
                ...input,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            await this.productsRepository.save(product);
            return new either_1.Right(undefined);
        }
        catch (error) {
            return new either_1.Left(new unexpected_error_1.UnexpectedError(error));
        }
    }
};
exports.CreateProductUseCase = CreateProductUseCase;
exports.CreateProductUseCase = CreateProductUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(di_repositories_1.PRODUCTS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateProductUseCase);
//# sourceMappingURL=create-product.use-case.js.map