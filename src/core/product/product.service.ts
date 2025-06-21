import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateProductDto} from "./dto/product.dto";

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}
	
	async createProduct(dto: CreateProductDto){
		return this.prisma.product.create({
			data: {
				title:  dto.title,
				price:  dto.price,
				description: dto.description,
				inventory: {
					create: [
						{
							quantity: dto.quantity,
							color: dto.color,
						}
					]
				},
			}
		})
	}
}
