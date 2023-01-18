import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidateInputPipe());

  app.enableCors({
    credentials: true,
    exposedHeaders: ['Authorization'],
    origin: (origin, callback) => {
      if (process.env.NODE_ENV == 'production' && origin.includes('http://')) {
        callback(new Error('Not allowed by CORS'));
      } else {
        callback(null, true);
      }
    },
  });

  await app.listen(
    process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  );
}
bootstrap();
