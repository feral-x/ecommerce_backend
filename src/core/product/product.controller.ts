import {Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { ProductService } from './product.service';
import {CreateProductDto} from "./dto/product.dto";
import {Auth} from "../../utils/decorators/auth.decorator";
import {Role} from "@prisma/client";
import {Roles} from "../../utils/decorators/Roles.decorator";
import {FilesInterceptor} from "@nestjs/platform-express";
import {ParseJsonBody} from "../../utils/decorators/JsonParse";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
	
	@Post('/create')
	@Auth()
	@Roles('admin')
	@UseInterceptors(FilesInterceptor('images'))
	async createProduct(
		@ParseJsonBody() data: CreateProductDto,
		@UploadedFiles() images: Express.Multer.File[]
	) {
		return await this.productService.createProduct(data, images);
	}
	
	
	@Get('/all')
	async getAllProducts() {
		return await this.productService.getAllProducts();
	}
	
	@Get('/:id')
	async getById(@Param("id") id:string){
		return this.productService.getById(id);
	}
}
