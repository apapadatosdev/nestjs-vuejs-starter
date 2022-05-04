import { PartialType } from '@nestjs/mapped-types';
import { CreateDemoentityDto } from './create-demoentity.dto';

export class UpdateDemoentityDto extends PartialType(CreateDemoentityDto) {}
