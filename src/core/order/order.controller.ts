import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import { OrderService } from './order.service';
import {ProductPayloadDto} from "./dto/order.dto";
import {Auth} from "../../utils/decorators/auth.decorator";
import {UserId} from "../../utils/decorators/GetId";
import {Request} from "express";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
	
	
	
	@Auth()
	@Post("/create")
	async createOrder(@Body() dto: ProductPayloadDto[], @UserId() id: string) {
		return await this.orderService.createOrder(dto, id);
	}
	
	@Auth()
	@Get("/get_orders")
	async GetOrders(@UserId() id: string) {
		return this.orderService.getOrders(id);
	}
}
