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
exports.CreateProductController = void 0;
const common_1 = require("@nestjs/common");
const create_product_use_case_1 = require("./create-product.use-case");
const unexpected_error_1 = require("../../../../infrastructure/errors/shared/unexpected.error");
const missing_param_error_1 = require("../../../../infrastructure/errors/shared/missing-param.error");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let CreateProductController = class CreateProductController {
    constructor(createProductUseCase) {
        this.createProductUseCase = createProductUseCase;
    }
    async handle(input, file) {
        try {
            console.log(file);
            const result = await this.createProductUseCase.execute({
                ...input,
                image: `/uploads/${file.filename}`,
            });
            if (result.value instanceof unexpected_error_1.UnexpectedError)
                throw result.value;
            if (result.value instanceof missing_param_error_1.MissingParamError)
                throw result.value;
            return result.value;
        }
        catch (error) {
            throw new unexpected_error_1.UnexpectedError(error);
        }
    }
};
exports.CreateProductController = CreateProductController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: async (req, file, cb) => {
                const filename = file.originalname
                    .replace(' ', '-')
                    .toLocaleLowerCase();
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CreateProductController.prototype, "handle", null);
exports.CreateProductController = CreateProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [create_product_use_case_1.CreateProductUseCase])
], CreateProductController);
//# sourceMappingURL=create-product.controller.js.map