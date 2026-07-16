import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { permissionKey } from 'src/auth/decorators/permissions.decorator';

@Injectable()
// PermissionsGuard - Uses Reflector to decide whether to allow or deny the request.
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.get(permissionKey, context.getHandler());

    if (!permission) return true;

    return true;
  }
}
