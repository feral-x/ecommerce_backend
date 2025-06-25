import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "node:process";
import * as cookieParser from "cookie-parser"
import {ValidationPipe} from "@nestjs/common";
import * as express from 'express';
import {join} from "path";



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
		credentials: true,
		origin: process.env.ORIGIN,
  });
	app.useGlobalPipes(new ValidationPipe());
	app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
