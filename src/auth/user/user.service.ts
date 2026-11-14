import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { RestPasswordDto } from './dto/rest-password.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: any,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async findByEmail(email: string) {
    return this.userModel
      .findOne({ email: email.trim().toLowerCase() })
      .select('+password')
      .exec();
  }

  async login(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync(
      {
        sub: user._id.toString(),
        email: user.email,
      },
      {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
        expiresIn: '1d',
      },
    );

    return {
      access_token: token,
    };
  }

  // CREATE
  async createUser(createUserDto: CreateUserDto) {
    const email = createUserDto.email.trim().toLowerCase();

    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    const createdUser = new this.userModel({
      ...createUserDto,
      email,
      password: hashedPassword,
      role: createUserDto.role ?? 'user',
      active: createUserDto.active ?? true,
    });

    try {
      await createdUser.save();
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }

    const user = createdUser.toObject();
    delete user.password;

    return user;
  }

  // READ ALL
  async getAllUsers(req: any) {
    const { limit, skip, sort, name, email, role } = req.query;

    return {
      status: 200,
      message: 'Users retrieved successfully',
      data: await this.userModel
        .find({
          ...(name && { name: { $regex: name, $options: 'i' } }),
          ...(email && { email: { $regex: email, $options: 'i' } }),
          ...(role && { role: { $regex: role, $options: 'i' } }),
        })
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec(),
    };
  }

  // READ ONE
  async getUserById(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // UPDATE
  async updateUser(id: string, dto: UpdateUserDto) {
    const existingUser = await this.userModel.findById(id).exec();

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const updateData: any = { ...dto };

    if (dto.email) {
      const email = dto.email.trim().toLowerCase();
      const duplicateUser = await this.userModel
        .findOne({ email, _id: { $ne: id } })
        .exec();

      if (duplicateUser) {
        throw new ConflictException('Email already exists');
      }

      updateData.email = email;
    }

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 12);
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      })
      .select('-password')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Reset Password
  async resetPassword(email: RestPasswordDto) {
    const user = await this.userModel.findOne({ email: email.email }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // user.verificationCode = code;
    // await user.save();

    return code;
  }

  // DELETE
  async deleteUser(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User deleted successfully',
      user,
    };
  }
}
