import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const UserId = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const user = request.user;
		
		if (!user || !user.userId) {
			throw new Error('User not found in request');
		}
		
		return user.userId;
	},
);