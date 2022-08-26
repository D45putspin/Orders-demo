import { Controller, Get, OnModuleInit, Req, Res } from '@nestjs/common';
import { Public } from 'src/common/guards';
import { UsersService } from 'src/users/users.service';
import { GeneralService } from './general.service';

@Controller('general')
export class GeneralController implements OnModuleInit {
  constructor(
    private readonly generalService: GeneralService,
    private readonly usersService: UsersService,
  ) {}
  onModuleInit() {
    this.usersService.checkIfAdminExists();
  }
}
