import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@prisma/client";
import * as argon2 from 'argon2';
import {CreateUserDto} from "./dto/user.dto";

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {
	}
	
	
	async GetById(id: string) {
		return this.prisma.user.findUnique(
			{
				where: {
					id: id
				},
				include: {
					orders: true,
					reviews: true,
				}
			}
		);
	}
	
	async GetByEmail(email: string) {
		const user = this.prisma.user.findUnique(
			{
				where: {
					email: email,
				},
				include: {
					orders: true,
					reviews: true,
				},
			}
		);
		return user;
	}
	
	async create(dto: CreateUserDto) {
		return this.prisma.user.create({
			data: {
				email: dto.email,
				password: await argon2.hash(dto.password)
			}
		})
	}
	
	
	async GetAllUsers(){
		const users = await this.prisma.user.findMany({
			omit: {
				password: true
			}
		})
		
		return users;
	}
	
	
	async toggleFavorite(productId: string) {
	
	}
}
