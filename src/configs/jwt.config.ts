import {JwtModuleAsyncOptions} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

export function GetJwtConfig():JwtModuleAsyncOptions{
	return {
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => {
			return {
				secret: configService.get<string>('JWT_SECRET'),
			}
		}
	}
}