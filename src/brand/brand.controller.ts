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

import { BrandService } from './brand.service.js';
import { CreateBrandDto } from './dto/create-brand.dto.js';
import { UpdateBrandDto } from './dto/update-brand.dto.js';
import { AuthGuard } from '../auth/guard/auth.guard.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';
import { Role } from '../category/enum/role.enum.js';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', Role.ADMIN)
  create(@Body() dto: CreateBrandDto) {
    return this.brandService.create(dto);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateBrandDto) {
    return this.brandService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @SetMetadata('role', Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
