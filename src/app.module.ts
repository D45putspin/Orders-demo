import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MasterGuard } from './common/guards';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';
console.log(
  'DB Connection: ',
  process.env.DB_CONNECTION || 'mongodb://localhost:27017/mozantechDatabase',
);
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DB_CONNECTION ||
        'mongodb://localhost:27017/decalogueserverdb',
      { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: MasterGuard,
    },
  ],
})
export class AppModule {}
