import {IsArray, IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";

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
	@ValidateNested({ each: true })
	@IsArray()
	categories: number[]
	@IsArray()
	images: Express.Multer.File[]
}