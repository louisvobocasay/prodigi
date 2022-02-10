import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as moment from 'moment';
import { I18nService } from 'nestjs-i18n';
import { resolve } from 'path';
import { CoreEEnvironmentVariables } from '../constants';

@Catch()
export class CoreHttpExceptionFilter implements ExceptionFilter {
  module: string;
  /**
   *
   */
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionWillBeThrown: any = {
      path: request.path,
      status,
      method: request.method,
    };

    const { message, stack, response } = exception;
    if (exception.query) {
      exceptionWillBeThrown.query = exception.query;
    }
    exceptionWillBeThrown.message = message;
    const lang = (
      (request.headers['accepted-language'] as string) || 'en'
    ).substring(0, 2);
    const translatationOption: any = { lang };
    if (response) {
      const ex = {};
      const translateErrors = async (errors, initial) => {
        for (const key in errors) {
          const error = errors[key];
          if (!Array.isArray(error)) {
            initial[key] = {};
            await translateErrors(error, initial[key]);
          } else {
            initial[key] = [];
            for (const err of error) {
              const { module, code, args } = err;
              translatationOption.args = args;
              initial[key].push(
                await this.i18n.t(
                  (module || 'generic') + '.' + code,
                  translatationOption,
                ),
              );
            }
          }
        }
      };

      if (response.errors) {
        await translateErrors(response.errors, ex);
        exceptionWillBeThrown.exception = ex;
      } else {
        const { module, code, args } = response;
        if (code) {
          translatationOption.args = args;
          exceptionWillBeThrown.exception = await this.i18n.t(
            (module || 'generic') + '.' + code,
            translatationOption,
          );
        } else {
          if (exceptionWillBeThrown.status === HttpStatus.UNAUTHORIZED) {
            exceptionWillBeThrown.exception = await this.i18n.t(
              'generic.UNAUTHORIZED_ACCESS',
              translatationOption,
            );
          }
        }
      }
    }

    if (process.env.NODE_ENV !== CoreEEnvironmentVariables.PRODUCTION) {
      exceptionWillBeThrown.stack = stack;
    }

    this.writeLog(exceptionWillBeThrown, request);
    res.status(status).json(exceptionWillBeThrown);
  }

  private async writeLog(error: { [key: string]: any }, request: Request) {
    const dirpath: string = resolve(
      __dirname,
      '../../..',
      'logs',
      `${moment().format('DD-MM-YYYY')}.log`,
    );
    const folderDirpath: string = resolve(__dirname, '../../..', 'logs');
    const isFolderExists: boolean = fs.existsSync(folderDirpath);

    if (!isFolderExists) {
      fs.mkdirSync(folderDirpath);
    }

    fs.exists(dirpath, (isExisted: boolean) => {
      if (!isExisted) {
        fs.writeFile(
          dirpath,
          `-----------------${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
          { flag: 'a' },
          (err) => {
            this.writeLog(error, request);
          },
        );
      } else {
        fs.appendFile(
          dirpath,
          this.parseException(error, request),
          (err) => {},
        );
      }
    });
  }
  private parseException(error: { [key: string]: any }, request: Request) {
    return `-----------------${moment().format('MMMM Do YYYY, h:mm:ss a')}
        rMethod         : ${request.method},
        rPath           : ${request.path},
        rIP             :${request.ip}
        --------------------------------------
        rException      : ${JSON.stringify(error)}
        rStack          : ${JSON.stringify(error.stack || '')}`;
  }
}
