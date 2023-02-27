import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({ description: 'Access token', format: 'string' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token', format: 'string' })
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
