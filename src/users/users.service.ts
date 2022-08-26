import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreationDto } from './dto/createUser.dto';
import { UserModel, USER_MODEL } from './users.model';
import { ThirdPartyEmailService } from 'src/third-party/email.service';

import * as bcrypt from 'bcrypt';
import { UserRole } from './user.interfaces';
import { AUTH_CONSTANTS } from 'src/auth/config/constants';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserModel>,
    private readonly emailService: ThirdPartyEmailService,
  ) {}
  async checkPassword(type: string, variable: any, password: string) {
    let user;
    switch (type) {
      case 'email':
        user = await this.userModel.findOne({ email: variable });
        return await bcrypt.compare(password, user.password);
    }
    return false;
  }

  async create(
    userCreationDto: UserCreationDto & { confirmationCode: string },
  ) {
    const registeredUser = await this.userModel.findOne({
      email: userCreationDto.email,
    });

    if (registeredUser)
      throw new HttpException(
        'AUTH.USER_ALREADY_EXISTS',
        HttpStatus.BAD_REQUEST,
      );

    const createdUser = new this.userModel(userCreationDto);
    return await createdUser.save();
  }

  async getById(userId: string): Promise<UserModel> {
    return this.userModel.findById(userId).lean().exec();
  }

  findOne(email: string): Promise<UserModel> {
    return this.userModel.findOne({ email }).exec();
  }
  async checkIfAdminExists() {
    const exists = await this.userModel.findOne({ email: 'ADM@ADM.com' });

    if (!exists) {
      const hashedPassword = await bcrypt.hash(
        'password123$',
        AUTH_CONSTANTS.saltRounds,
      );
      const newAdmin = new this.userModel({
        fullname: 'ADMIN',
        email: 'ADM@ADM.com',
        dob: '2000-01-30T00:00:00.000Z',
        password: hashedPassword,
      });

      await newAdmin.save();
      console.log(
        'created new Admin! email: "ADM@ADM.com" password: "password123$" ',
      );
    }
  }
}
