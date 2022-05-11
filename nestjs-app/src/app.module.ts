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
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './core/http-exception-filter';
import { AuthModule } from './auth/auth.module';


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
          (
            new LoggingBunyan(
              {projectId: "nest-monitoring-349716",  
              credentials: {
                client_email: process.env.GOOGLE_CLOUD_SERVICE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_CLOUD_SERVICE_PKEY,                
              }
            
            })
          ).stream(process.env.CLOUD_LOGGING_LEVEL as LogLevel),
        ],
      
      },
    }),
    AuthModule,
    DemoentityModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService
  ],
})
export class AppModule {}
