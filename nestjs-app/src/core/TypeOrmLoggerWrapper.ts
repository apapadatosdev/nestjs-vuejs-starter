import { Logger as TypeOrmLogger, QueryRunner } from "typeorm";
import { LoggerOptions as TypeOrmLoggerOptions } from "typeorm/logger/LoggerOptions";
import { Bunyan, InjectLogger } from 'nestjs-bunyan';
import { Injectable } from "@nestjs/common";
//import { Logger } from "@nestjs/common";

/**
 * Effectively ripped out from:
 * https://github.com/nestjs/nest/issues/3657
 * &
 * https://github.com/typeorm/typeorm/blob/master/src/logger/SimpleConsoleLogger.ts
 */
export class TypeOrmLoggerWrapper implements TypeOrmLogger {
//   static ForConnection(connectionName: string, options: TypeOrmLoggerOptions) {
//     const logger = new Logger(`TypeORM[${connectionName}]`);
//     return new TypeOrmLoggerContainer(logger, options);
//   }

  constructor(    
    private readonly _options: TypeOrmLoggerOptions,
    //private readonly _logger: Logger,
    private readonly _logger: Bunyan
  ) {}

  

  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (
      this._options === "all" ||
      this._options === true ||
      (this._options instanceof Array && this._options.indexOf("query") !== -1)
    ) {
      const sql =
        query +
        (parameters && parameters.length
          ? " -- PARAMETERS: " + this.stringifyParams(parameters)
          : "");
      this._logger.trace({sql}, "[typeorm runtime log]");
    }
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    if (
      this._options === "all" ||
      this._options === true ||
      (this._options instanceof Array && this._options.indexOf("error") !== -1)
    ) {
      const sql =
        query +
        (parameters && parameters.length
          ? " -- PARAMETERS: " + this.stringifyParams(parameters)
          : "");
      this._logger.error({sql, error}, `[typeorm runtime log] query failed`);      
    }
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    const sql =
      query +
      (parameters && parameters.length
        ? " -- PARAMETERS: " + this.stringifyParams(parameters)
        : "");
    this._logger.warn({sql, time}, ` [typeorm runtime log]query is slow`);    
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    if (
      this._options === "all" ||
      (this._options instanceof Array && this._options.indexOf("schema") !== -1)
    ) {
      this._logger.info(message, "[typeorm runtime log] schema");
    }
  }

  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string, queryRunner?: QueryRunner) {
    this._logger.info(message, "[typeorm runtime log] migration");
  }

  /**
   * Perform logging using given logger, or by default to the this._logger.
   * Log has its own level and message.
   */
  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case "log":
        if (
          this._options === "all" ||
          (this._options instanceof Array &&
            this._options.indexOf("log") !== -1)
        )
          this._logger.info(message, "[typeorm runtime log]");
        break;
      case "info":
        if (
          this._options === "all" ||
          (this._options instanceof Array &&
            this._options.indexOf("info") !== -1)
        )
          this._logger.debug(message, "[typeorm runtime log]");
        break;
      case "warn":
        if (
          this._options === "all" ||
          (this._options instanceof Array &&
            this._options.indexOf("warn") !== -1)
        )
          this._logger.warn(message, "[typeorm runtime log]");
        break;
    }
  }

  /**
   * Converts parameters to a string.
   * Sometimes parameters can have circular objects and therefor we are handle this case too.
   */
  protected stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
}