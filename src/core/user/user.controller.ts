import {Body, Controller, Get} from '@nestjs/common';
import { UserService } from './user.service';
import {User} from "@prisma/client";
import {Auth} from "../../utils/decorators/auth.decorator";
import {UserId} from "../../utils/decorators/GetId";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
	
	
	@Auth()
	@Get('profile')
	async GetAllUsers(@UserId() id:string) {
		return this.userService.GetProfile(id)
	}
}
