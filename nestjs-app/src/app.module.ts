import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'typeorm.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoentityModule } from './demoentity/demoentity.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    DemoentityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
