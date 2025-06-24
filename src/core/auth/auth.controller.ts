import {Body, Controller, HttpCode, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDto} from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
	
	@Post('login')
	async login(@Body() dto: AuthDto, @Req() req, @Res() res) {
		return this.authService.login(dto, req, res)
	}
	
	@Post('register')
	async register(@Body() dto: AuthDto, @Req() req, @Res() res) {
		return this.authService.register(dto, req, res)
	}
	
	@Post('logout')
	async logout(@Req() req, @Res() res){
		return this.authService.logout(req, res)
	}
	
	@Post('refresh')
	async refresh(@Req() req, @Res() res){
		return this.authService.refreshTokens(req, res)
	}
	
}
