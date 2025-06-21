import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt"
import {ConfigService} from "@nestjs/config";
import {UserService} from "../../core/user/user.service";
import {Request} from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
	constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req.cookies?.token
			]),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow("JWT_SECRET")
		});
	}
	
	
	async validate(payload: {id: string}) {
		const user = await this.userService.GetById(payload.id);
		if (!user) throw new UnauthorizedException();
		return {id: user.id};
	}
}