import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const UserId = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const user = request.user;
		console.log(user);
		if (!user || !user.id) {
			throw new Error('User not found in request');
		}
		
		return user.id;
	},
);