import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ProductPayloadDto {
	@IsString()
	@IsNotEmpty()
	id: string
	@IsNumber()
	@IsNotEmpty()
	price: number
	@IsNumber()
	quantity: number
}