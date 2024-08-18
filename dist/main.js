"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const application_module_1 = require("./application/application.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(application_module_1.ApplicationModule, {
        cors: true,
    });
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map