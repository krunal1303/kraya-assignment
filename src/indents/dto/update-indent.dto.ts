import { PartialType } from '@nestjs/mapped-types';
import { CreateIndentDto } from './create-indent.dto';

export class UpdateIndentDto extends PartialType(CreateIndentDto) { }