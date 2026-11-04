import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { createObserveModule } from '@nestjs/observe';
import { UserModule } from './user/user.module.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  // mongodb
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Ecommerce-db'),
    UserModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
