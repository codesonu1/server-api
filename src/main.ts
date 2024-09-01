import { NestFactory } from '@nestjs/core';
import { AppModule } from './use-cases/app/app.module';
import { DEV_PORT } from './config/configuration';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: 'http://localhost:5173',
// methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
// preflightContinue: false,
// optionsSuccessStatus: 204,
//   })
//   await app.listen(Number(DEV_PORT.port));
// }
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1")
  app.enableCors({
    origin: ["http://localhost:5173", "https://www.charismafuturepro.com", "http://www.charismafuturepro",],
  })
  await app.listen(Number(DEV_PORT.port));
}
bootstrap(); 
