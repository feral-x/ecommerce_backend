import { Module } from '@nestjs/common';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import {ConfigModule} from "@nestjs/config";
import { ProductModule } from './core/product/product.module';
import { CategoryModule } from './core/category/category.module';
import { ReviewModule } from './core/review/review.module';
import { OrderModule } from './core/order/order.module';
import { FilesModule } from './core/files/files.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),PrismaModule, AuthModule, UserModule, ProductModule, CategoryModule, ReviewModule, OrderModule, FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
