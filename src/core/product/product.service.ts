import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateProductDto} from "./dto/product.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService, private readonly fileService: FilesService ) {}
	
	async createProduct(dto: CreateProductDto, images: Express.Multer.File[]){
		dto.categories = JSON.parse(dto.categories as unknown as string);
		const product = await this.prisma.product.create({
			data: {
				title:  dto.title,
				price:  +dto.price,
				description: dto.description,
				images: await this.fileService.saveProductImages(images),
				categories: {
					connect: dto.categories.map(id => ({id})),
				},
				inventory: {
					create: [
						{
							quantity: +dto.quantity,
							color: dto.color,
						}
					]
				},
			},
			include: {
				inventory: true,
				categories: true,
			}
		})
		
		
		const { inventory, categories, ...rest } = product;
		
		return {
			...rest,
			inventory: inventory.map((i) => {
				return {
					color: i.color,
					quantity: i.quantity,
				}
			}),
			category: categories.map((i) => {
				return {
					id: i.id,
					title: i.title,
					description: i.description,
				}
			}),
		}
		
	}
	
	async getAllProducts() {
		return this.prisma.product.findMany({
			include: {
				categories: true,
			}
		});
	}
}
