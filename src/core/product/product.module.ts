import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {FilesService} from "../files/files.service";

@Module({
  controllers: [ProductController],
  providers: [ProductService,FilesService],
	imports: [],
})
export class ProductModule {}