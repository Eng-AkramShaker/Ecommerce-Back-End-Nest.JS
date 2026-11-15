import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import type { Request } from 'express';

import { RequestProductService } from './request-product.service.js';
import { CreateRequestProductDto } from './dto/create-request-product.dto.js';
import { UpdateRequestProductDto } from './dto/update-request-product.dto.js';

import { AuthGuard } from '../auth/guard/auth.guard.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';
import { Role } from '../category/enum/role.enum.js';

type AuthRequest = Request & {
  user: {
    sub: string;
    role: string;
  };
};

@Controller('request-product')
@UseGuards(AuthGuard)
export class RequestProductController {
  constructor(private readonly requestService: RequestProductService) {}

  @Post()
  create(@Body() dto: CreateRequestProductDto, @Req() req: AuthRequest) {
    return this.requestService.create(dto, req.user.sub);
  }

  @Get()
  @UseGuards(RolesGuard)
  @SetMetadata('role', Role.ADMIN)
  findAll() {
    return this.requestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.requestService.findOne(id, req.user.sub, req.user.role);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRequestProductDto,
    @Req() req: AuthRequest,
  ) {
    return this.requestService.update(id, dto, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.requestService.remove(id, req.user.sub);
  }
}
