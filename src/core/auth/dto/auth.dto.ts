import {IsEmail, IsString, MinLength} from "class-validator";

export class AuthDto {
	@IsEmail()
	@IsString()
	email: string;
	
	@IsString()
	@MinLength(6)
	password: string;
}
export class RegisterDto {
	@IsEmail()
	@IsString()
	email: string;
	
	@IsString()
	@MinLength(6)
	password: string;
}