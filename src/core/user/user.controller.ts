import {Body, Controller, Get} from '@nestjs/common';
import { UserService } from './user.service';
import {User} from "@prisma/client";
import {Auth} from "../../utils/decorators/auth.decorator";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
	
	
	@Auth()
	@Get('findAll')
	async GetAllUsers() {
		return this.userService.GetAllUsers()
	}
}
