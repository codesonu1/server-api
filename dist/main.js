"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./use-cases/app/app.module");
const configuration_1 = require("./config/configuration");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("/api/v1");
    app.enableCors({
        origin: ["http://localhost:5173", "https://www.charismafuturepro.com", "http://www.charismafuturepro",],
    });
    await app.listen(Number(configuration_1.DEV_PORT.port));
}
bootstrap();
//# sourceMappingURL=main.js.map