import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpStatus, HttpException, UseGuards, Res, ValidationPipe, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { DemoentityService } from './demoentity.service';
import { CreateDemoentityDto } from './dto/create-demoentity.dto';
import { UpdateDemoentityDto } from './dto/update-demoentity.dto';

import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/AuthUser';
import { Bunyan, ReqLogger } from 'nestjs-bunyan';

@Controller('demoentity')
//@UseGuards(JwtAuthGuard)
export class DemoentityController {
  constructor(private readonly demoentityService: DemoentityService) {}
  @ReqLogger() private readonly logger: Bunyan

  currentUser() : AuthUser  {
    return {
      id: 0,
      email: "",
      roles: "",
      permissions: ""
    };
  }

  @Post()
  // EXAMPLE OF ADDING VALIDATION PIPE RIGHT ON THE PARAMETER - but its simpler to set this globally
  //async create(@Request() req, @Body(ValidationPipe) createDemoentityDto: CreateDemoentityDto) { 
  // ALTERNATIVELY WE CAN DEFINE VALIDATION GROUPS:
  //async create(@Request() req, @Body(ValidationPipe({ groups: ['validation_group_xyz'] })) createDemoentityDto: CreateDemoentityDto) { 
  // WE CAN ALSO ADD VALIDATION PIPES WITH A DECORATOR:
  //@UsePipes(ValidationPipe)
  //async create(@Request() req, @Body(ValidationPipe) createDemoentityDto: CreateDemoentityDto) { 
  async create(@Request() req, @Body() createDemoentityDto: CreateDemoentityDto) {
    const rslt = await this.demoentityService.create(createDemoentityDto, this.currentUser());
    return rslt;
  }

  @Get()
  async findAll() {
    this.logger.info("info controller");
    const rslt = await this.demoentityService.findAll(this.currentUser(), null);
    return rslt;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const rslt = await this.demoentityService.findOne(+id, this.currentUser());
    return rslt;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDemoentityDto: UpdateDemoentityDto) {
    const rslt = await this.demoentityService.update(+id, updateDemoentityDto, this.currentUser());
    return rslt;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const rslt = await this.demoentityService.remove(+id, this.currentUser());
    return rslt;
  }
}
