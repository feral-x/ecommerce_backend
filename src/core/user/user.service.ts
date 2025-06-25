import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
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
	
	
	
	async GetProfile(userId: string) {
		return this.prisma.user.findUnique({
				where: {id: userId},
				include: {
					orders: true,
				},
				omit: {
					password: true
				}
		});
	}
	
	
	async toggleFavorite(productId: string, userId: string) {
		const user =  await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				wishList: true,
			}
		})
		if(!user) throw new UnauthorizedException();

		const product = await this.prisma.user.findUnique({where: {id: productId}});
		if(!product) throw new BadRequestException("Product not found");
		
		const isExist = user.wishList.find(item => item.id === productId);
		
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				wishList: {
					[isExist ? 'disconnect' : 'connect']: {
						id: productId,
					}
				}
			}
		})
	}
}
