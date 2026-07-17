import { SetMetadata } from '@nestjs/common';

export const permissionKey = process.env.PERMISSIONS_KEY;

export const Permissions = (entity: string, action: string) =>
  SetMetadata(permissionKey, { entity, action });
