import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidateInputPipe());

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    exposedHeaders: ['Authorization'],
    origin: process.env.FRONTEND_URL,
  });

  await app.listen(
    process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  );
}
bootstrap();
