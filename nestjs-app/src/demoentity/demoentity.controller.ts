import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemoentityService } from './demoentity.service';
import { CreateDemoentityDto } from './dto/create-demoentity.dto';
import { UpdateDemoentityDto } from './dto/update-demoentity.dto';

@Controller('demoentity')
export class DemoentityController {
  constructor(private readonly demoentityService: DemoentityService) {}

  @Post()
  create(@Body() createDemoentityDto: CreateDemoentityDto) {
    return this.demoentityService.create(createDemoentityDto);
  }

  @Get()
  findAll() {
    return this.demoentityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demoentityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoentityDto: UpdateDemoentityDto) {
    return this.demoentityService.update(+id, updateDemoentityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoentityService.remove(+id);
  }
}
