import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const angularDistPath = join(
    __dirname,
    '..',
    '..',
    'client',
    'dist',
    'client',
    'browser',
  );

  app.useStaticAssets(angularDistPath);
  app.setBaseViewsDir(angularDistPath);

  const expressApp = app.getHttpAdapter().getInstance();

  // Only serve index.html for non-API routes
  expressApp.use(/^(?!\/api).*/, (req: Request, res: Response) => {
    res.sendFile(join(angularDistPath, 'index.html'));
  });

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:3000',
      'https://apartment-expense-tracker.onrender.com/',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 3000);

  await ConfigModule.forRoot({ isGlobal: true });
}
bootstrap();
