import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';

import { SuppliersService } from './suppliers.service.js';
import { CreateSuppliersDto } from './dto/create-suppliers.dto.js';
import { UpdateSuppliersDto } from './dto/update-suppliers.dto.js';
import { AuthGuard } from '../auth/guard/auth.guard.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';
import { Role } from '../category/enum/role.enum.js';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', Role.ADMIN)
  create(@Body() dto: CreateSuppliersDto) {
    return this.suppliersService.create(dto);
  }

  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateSuppliersDto) {
    return this.suppliersService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(id);
  }
}
