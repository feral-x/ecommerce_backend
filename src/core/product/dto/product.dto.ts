import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateProductDto {
	@IsString()
	title: string
	@IsString()
	description: string
	@IsNotEmpty()
	@IsNumber()
	price: number
}