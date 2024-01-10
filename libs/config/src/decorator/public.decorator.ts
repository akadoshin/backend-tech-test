import { SetMetadata } from '@nestjs/common';

/**
 * @description
 * This decorator is used to set the public routes
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
