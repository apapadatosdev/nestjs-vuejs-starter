import { Module } from '@nestjs/common';
import { DemoentityService } from './demoentity.service';
import { DemoentityController } from './demoentity.controller';

@Module({
  controllers: [DemoentityController],
  providers: [DemoentityService]
})
export class DemoentityModule {}
