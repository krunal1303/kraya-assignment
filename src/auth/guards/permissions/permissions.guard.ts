import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { permissionKey } from 'src/auth/decorators/permissions.decorator';

@Injectable()
// PermissionsGuard - Uses Reflector to decide whether to allow or deny the request.
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  // permissionKey - is a key to store metadata -> permissions: {entity: 'ITEM', action: 'READ'}
  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get(permissionKey, context.getHandler());

    if (!permissions) return true;

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (user.isAdmin) return true;

    // console.log(user.userRoles, 'user.userRoles---');

    const hasPermission = user.userRoles.some((userRole) =>
      userRole.role.rolePermissions.some((rolePermission) =>
        rolePermission.permission.entity === permissions?.entity &&
        rolePermission.permission.action === permissions?.action,
      ),
    );

    if (!hasPermission) {
      throw new ForbiddenException("You don't have the permission");
    }

    return true;
  }
}
