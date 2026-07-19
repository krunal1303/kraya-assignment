import { SetMetadata } from '@nestjs/common';

export const permissionKey = 'permissions';

export const Permissions = (entity: string, action: string) =>
  SetMetadata(permissionKey, { entity, action });