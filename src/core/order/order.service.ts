import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ProductPayloadDto} from "./dto/order.dto";

@Injectable()
export class OrderService {
	constructor(private readonly prisma: PrismaService) {
	}
	
	async getOrders(id: string) {
		return this.prisma.order.findMany({where: {id: id}});
	}
	
	async createOrder(dto: ProductPayloadDto[], id: string){
		const order = await this.prisma.order.create({
			data: {
				status: 'PENDING',
				user: {
					connect: {id: id}
				},
				orderItem: {
						create: dto.map((item) => ({
							product: { connect: { id: item.id } },
							quantity: item.quantity,
							price: item.price,
						})),
					},
			},
			include: {
				orderItem: true
			}
		})
		
		return order;
	}
}
