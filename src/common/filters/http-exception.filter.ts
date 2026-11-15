import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message =
      typeof error === 'string'
        ? error
        : error && typeof error === 'object' && 'message' in error
          ? error.message
          : 'Internal server error';

    response.status(status).json({
      status,
      message,
      data: null,
    });
  }
}
