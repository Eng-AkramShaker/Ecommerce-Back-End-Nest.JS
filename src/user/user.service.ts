import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto.js';

@Injectable()
export class UserService {
  private readonly items: UserDto[] = [];

  findAll(): UserDto[] {
    return this.items;
  }

  create(dto: UserDto): UserDto {
    this.items.push(dto);
    return dto;
  }
}
