import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

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

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
