import {BadRequestException, HttpStatus, Injectable, Req, Res, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {Request, Response} from "express";
import {AuthDto, RegisterDto} from "./dto/auth.dto";
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
	
	async login(dto: AuthDto, req: Request, res: Response){
		const user = await this.userService.GetByEmail(dto.email);
		if(!user) throw new BadRequestException('Bad data');
		const verify = await argon2.verify(user.password, dto.password);
		if(!verify) throw new BadRequestException('Bad data');
		this.createTokens(user.id, req, res)
		res.status(HttpStatus.OK).json({message: 'login successfully', id: user.id});
	}
	
	async register(dto: RegisterDto, req: Request, res: Response){
		const user = await this.userService.GetByEmail(dto.email);
		if(user) throw new BadRequestException('User already exist.');
		const newUser = await this.userService.create(dto);
		this.createTokens(newUser.id, req, res)
		res.status(HttpStatus.OK).json({message: 'User created successfully', id: newUser.id});
	}
	
	async logout(req: Request, res: Response){
		res.cookie('access_token', '', {
			httpOnly: true,
			expires: new Date(0),
		});
		
		res.cookie('refresh_token', '', {
			httpOnly: true,
			expires: new Date(0),
		});
		
		return res.status(HttpStatus.OK).json({message: 'success'});
	}
	
	createTokens(id: string, req: Request, res: Response){
		const token = this.jwtService.sign({id}, {
			expiresIn: "15m"
		})
		
		const refreshToken = this.jwtService.sign({id}, {
			expiresIn: "7d"
		})
		
		res.cookie("token", token, {httpOnly: true})
		res.cookie("refresh_token", refreshToken, {httpOnly: true})
	}
	
	refreshTokens(req: Request, res: Response){
		const refreshToken = req.cookies.refresh_token;
		if(!refreshToken) throw new UnauthorizedException();
		const verify = this.jwtService.verify(refreshToken);
		if(!verify) throw new UnauthorizedException();
		this.createTokens(verify.id, req, res);
	}
}
