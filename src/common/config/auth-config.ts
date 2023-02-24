import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  cryptSalt: parseInt(process.env.CRYPT_SALT) || 10,
  jwtSecretKey: parseInt(process.env.JWT_SECRET_KEY) || 'secret123123',
  jwtSecretRefreshKey: parseInt(process.env.JWT_SECRET_REFRESH_KEY) || 'secret123123',
  tokenExpireTime: parseInt(process.env.TOKEN_EXPIRE_TIME) || '1h',
  tokenExpireRefreshTime: parseInt(process.env.TOKEN_REFRESH_EXPIRE_TIME) || '24h',
}));
