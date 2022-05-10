import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BunyanLoggerModule } from 'nestjs-bunyan';
import { TypeOrmConfigService } from 'typeorm.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoentityModule } from './demoentity/demoentity.module';
import  {LoggingBunyan}  from '@google-cloud/logging-bunyan';
import { LogLevel } from 'bunyan';

// Creates a Bunyan Cloud Logging client
const loggingBunyan = new LoggingBunyan({projectId: "nest-monitoring-349716", keyFilename: "./google-logging.json",});


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    BunyanLoggerModule.forRoot({
      isGlobal: true,
      isEnableRequestLogger: true,
      bunyan: {
        name: 'nestjs-template',
        streams: [
          // Log to the console at 'info' and above
          {stream: process.stdout, level: process.env.LOCAL_LOGGING_LEVEL as LogLevel},
          // And log to Cloud Logging, logging at 'info' and above
          loggingBunyan.stream(process.env.CLOUD_LOGGING_LEVEL as LogLevel),
        ],
      
      },
    }),
    DemoentityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
