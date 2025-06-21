import {Body, Controller, Post} from '@nestjs/common';
import { ProductService } from './product.service';
import {CreateProductDto} from "./dto/product.dto";
import {Auth} from "../../utils/decorators/auth.decorator";
import {Role} from "@prisma/client";
import {Roles} from "../../utils/decorators/Roles.decorator";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
	
	@Post('/create')
	@Auth()
	@Roles('admin')
	async createProduct(@Body() createProductDto: CreateProductDto) {
		return await this.productService.createProduct(createProductDto);
	}
}
