import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParseJsonBody = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const value = request.body;
		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	},
)