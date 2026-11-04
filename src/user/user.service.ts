import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto.js';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: any) {}

  async createUser(userDto: UserDto) {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async getAllUsers() {
    return this.userModel.find().exec();
  }

  async getUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async updateUser(id: string, userDto: UserDto) {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true }).exec();
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
