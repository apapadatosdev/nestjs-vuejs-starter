import { Module } from '@nestjs/common';
import { DemoentityService } from './demoentity.service';
import { DemoentityController } from './demoentity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demoentity } from './entities/demoentity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Demoentity])
  ],
  controllers: [DemoentityController],
  providers: [DemoentityService]
})
export class DemoentityModule {}
