import {Body, Controller, Get, Param, Patch} from '@nestjs/common';
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

	@Auth()
	@Patch('profile/favorites/:productId')
	async toggleWishlist(@UserId() user:string, @Param('productId') productId:string) {
		return this.userService.toggleFavorite(user,productId)
	}
}
