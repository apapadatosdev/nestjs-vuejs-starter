import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmLoggerWrapper } from 'src/core/TypeOrmLoggerWrapper';
import { Bunyan, InjectLogger } from 'nestjs-bunyan';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  @InjectLogger() private readonly _logger: Bunyan

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('DATABASE_HOST'),
      port: this.config.get<number>('DATABASE_PORT'),
      database: this.config.get<string>('DATABASE_NAME'),
      username: this.config.get<string>('DATABASE_USER'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',      
      logger: new TypeOrmLoggerWrapper(["warn", "error"], this._logger),
      logging: ["warn", "error", "info", "query"],
      maxQueryExecutionTime: this.config.get<number>('MAX_QUERY_EXEC_WARNING_TIME'),
      synchronize: true, // never use TRUE in production!
    };
  }
}