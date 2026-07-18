import { PartialType } from '@nestjs/mapped-types';
import { CreateMiDto } from './create-mi.dto';

export class UpdateMiDto extends PartialType(CreateMiDto) { }