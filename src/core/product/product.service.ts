import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateProductDto} from "./dto/product.dto";

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}
	
	async createProduct(dto: CreateProductDto){
		const product = await this.prisma.product.create({
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
			},
			include: {
				inventory: true
			}
		})
		
		const { inventory, ...rest } = product;
		
		return {
			...rest,
			inventory: inventory.map((i) => {
				return {
					color: i.color,
					quantity: i.quantity,
				}
			}),
		}
		
	}
}
