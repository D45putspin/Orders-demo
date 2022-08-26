import { Module } from '@nestjs/common';
import { ThirdPartyEmailService } from './email.service';

@Module({
  providers: [ThirdPartyEmailService],
  exports: [ThirdPartyEmailService],
})
export class ThirdPartyModule {}
