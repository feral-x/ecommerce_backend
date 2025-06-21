import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateProductDto} from "./dto/product.dto";

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}
	
	async createProduct(dto: CreateProductDto){
		return this.prisma.product.create({
			data: {
				...dto
			}
		})
	}
}
