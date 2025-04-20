import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de server Control liga y torneos')
    .setDescription('Documentación de la API y servicios en NestJS [NodeJS]')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1, // No mostrar modelos (esquemas)
      filter: true,
      displayRequestDuration: true,
    },
    customSiteTitle: 'Control de ligas y torneos API Docs',
  });

  const confiService = app.get(ConfigService);

  const port = confiService.get<string>('PORT');

  console.log(`Corriendo en el puerto ${port}`);

  await app.listen(port);
}
bootstrap();
