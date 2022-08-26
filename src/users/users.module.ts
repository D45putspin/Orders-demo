import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, USER_MODEL } from './users.model';
import { UsersService } from './users.service';
import { ThirdPartyModule } from 'src/third-party/third-party.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL, schema: UserSchema }]),
    ThirdPartyModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
