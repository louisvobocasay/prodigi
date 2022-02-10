import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClusterUtil, CoreEEnvironmentVariables, CoreHttpExceptionFilter, CoreValidationPipe } from '@online-festival/core';
import * as bodyParser from 'body-parser';
import { I18nService } from 'nestjs-i18n';
import * as path from 'path';
import { ApiModule } from './api.module';


const directory: string = path.join(__dirname, '../../../../', 'package.json');

async function bootstrap() {


  const app = await NestFactory.create(ApiModule);
  const packages = require(directory);
  app.setGlobalPrefix(packages.apiVersion);
  app.enableCors();
  app.use(
    bodyParser.urlencoded({
      verify: (req, res, buf, encoding) => {
        if (buf && buf.length) {
          //@ts-ignore
          req['rawBody'] = buf.toString(encoding || 'utf8');
        }
      },
      extended: true,
    }),
  );
  app.use(
    bodyParser.json({
      //@ts-ignore
      verify: (req: Request, res, buf, encoding) => {
        if (buf && buf.length) {
          //@ts-ignore
          req['rawBody'] = buf.toString(encoding || 'utf8');
        }
      },
    }),
  );

  const i18n: I18nService = app.get(I18nService);
  app.useGlobalPipes(new CoreValidationPipe());
  app.useGlobalFilters(new CoreHttpExceptionFilter(i18n));

  const isProduction =
    process.env.NODE_ENV === CoreEEnvironmentVariables.PRODUCTION;
  const swaggerPath = 'swagger/api';
  if (!isProduction) {
    const options = new DocumentBuilder()
      .setTitle(packages.name)
      .setVersion(packages.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerPath, app, document);

    await app.listen(process.env.PORT || 4440);
    const logger = new Logger();
    if (!isProduction) {
      logger.debug(
        `Application successfully launched on: ${await app.getUrl()}/${swaggerPath}`,
      );
    }
  }
}


if (
  process.env.NODE_ENV === CoreEEnvironmentVariables.PRODUCTION ||
  process.env.NODE_ENV === CoreEEnvironmentVariables.STAGING
) {
  ClusterUtil.clusterize(bootstrap);
} else {
  bootstrap();
}
