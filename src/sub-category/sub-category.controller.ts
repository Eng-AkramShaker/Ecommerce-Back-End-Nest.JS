import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';
import { AuthGuard } from '../auth/guard/auth.guard.js';
import { Role } from '../category/enum/role.enum.js';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto.js';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto.js';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly service: SubCategoryService) {}

  @Post()
  @SetMetadata('role', Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() dto: CreateSubCategoryDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @SetMetadata('role', Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() dto: UpdateSubCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @SetMetadata('role', Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
