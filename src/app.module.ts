import { Module } from '@nestjs/common';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import {ConfigModule} from "@nestjs/config";
import { ProductModule } from './core/product/product.module';
import { CategoryModule } from './core/category/category.module';
import { ColorModule } from './core/color/color.module';
import { ReviewModule } from './core/review/review.module';
import { OrderModule } from './core/order/order.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),PrismaModule, AuthModule, UserModule, ProductModule, CategoryModule, ColorModule, ReviewModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
