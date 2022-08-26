import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [GeneralController],
  imports: [UsersModule],
  providers: [GeneralService],
})
export class GeneralModule {}
