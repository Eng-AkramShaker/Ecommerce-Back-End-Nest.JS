import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { createObserveModule } from '@nestjs/observe';
import { UserModule } from './user/user.module.js';
import { ConfigModule } from '@nestjs/config';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  // mongodb
  imports: [
    // mongoose
    MongooseModule.forRoot('mongodb://localhost:27017/Ecommerce-db'),

    UserModule,

    // config
    ConfigModule.forRoot({}),

    // jwt
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) || 3600 },
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
