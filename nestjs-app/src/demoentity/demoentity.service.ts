import { Injectable } from '@nestjs/common';
import { CreateDemoentityDto } from './dto/create-demoentity.dto';
import { UpdateDemoentityDto } from './dto/update-demoentity.dto';

@Injectable()
export class DemoentityService {
  create(createDemoentityDto: CreateDemoentityDto) {
    return 'This action adds a new demoentity';
  }

  findAll() {
    return `This action returns all demoentity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} demoentity`;
  }

  update(id: number, updateDemoentityDto: UpdateDemoentityDto) {
    return `This action updates a #${id} demoentity`;
  }

  remove(id: number) {
    return `This action removes a #${id} demoentity`;
  }
}
