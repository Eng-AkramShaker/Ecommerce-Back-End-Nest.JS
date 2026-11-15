import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CreateCategoryDto } from './dto/category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { Role } from './enum/role.enum.js';
import { AuthGuard } from '../auth/guard/auth.guard.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() dto: CreateCategoryDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @SetMetadata('role', Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
