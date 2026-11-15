
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((result) => ({
        status: response.statusCode,
        message: result?.message ?? 'Success',
        data: result?.data !== undefined
          ? result.data
          : result ?? null,
      })),
    );
  }
}
