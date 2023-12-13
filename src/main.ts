import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable application versioning
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  // Set global prefix for url
  app.setGlobalPrefix('/api');

  // Setup Swagger for documentation.
  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      validateCustomDecorators: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port, () => {
    console.log(`Application running at ${port}`);
  });
}
bootstrap();
