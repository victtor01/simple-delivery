import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
 
export const IS_PUBLIC_KEY_STORE = 'isPublicKeyStore';
export const PublicStore = () => SetMetadata(IS_PUBLIC_KEY_STORE, true);