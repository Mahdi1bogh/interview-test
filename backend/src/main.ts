/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // hello world  s

  app.enableCors({
    origin: ['https://interview-test-seven.vercel.app', 'http://localhost:3000'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  });

  await app.listen(5005); 
}
bootstrap();