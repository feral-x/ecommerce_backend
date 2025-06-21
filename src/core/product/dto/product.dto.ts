import {IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateProductDto {
	@IsString()
	title: string
	@IsString()
	description: string
	@IsNotEmpty()
	@IsNumber()
	price: number
	@IsNumber()
	quantity:number
	@IsString()
	@IsOptional()
	@IsHexColor()
	color:string
}