import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_GUARD_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_GUARD_KEY, true);
