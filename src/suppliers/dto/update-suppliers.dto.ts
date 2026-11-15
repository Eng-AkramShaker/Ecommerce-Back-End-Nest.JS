import { PartialType } from '@nestjs/mapped-types';
import { CreateSuppliersDto } from './create-suppliers.dto.js';

export class UpdateSuppliersDto extends PartialType(CreateSuppliersDto) {}
