import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string>('role', context.getHandler());

    if (!role) return true;

    const user = context.switchToHttp().getRequest().user;

    console.log('User:', user);
    console.log('Required Role:', role);

    return user?.role === role;
  }
}
