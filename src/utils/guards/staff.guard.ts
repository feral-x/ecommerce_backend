import {Reflector} from "@nestjs/core";
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "../../core/prisma/prisma.service";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector, private readonly prisma: PrismaService) {
	}
	
	async  canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles',[context.getHandler(), context.getHandler()]);
		
		if(!requiredRoles) return false;
		
		const req = context.switchToHttp().getRequest();
		const userId = req.user?.id;
		
		if(!userId) return false;
		
		const user = await this.prisma.user.findUnique({where: {id: userId}});
		if(!user) return false;
		return requiredRoles.includes(user.role)
		
	}
}