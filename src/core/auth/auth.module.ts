import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {GetJwtConfig} from "../../configs/jwt.config";
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import {JwtStrategy} from "../../utils/strategies/jwt.strategy";

@Module({
	imports: [UserModule, JwtModule.registerAsync(GetJwtConfig())],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
