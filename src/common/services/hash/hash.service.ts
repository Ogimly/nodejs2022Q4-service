import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashService {
  constructor(private config: ConfigService) {}

  public getHash = async (str: string): Promise<string> => {
    const cryptSalt = this.config.get<string>('auth.cryptSalt');

    return hash(str, cryptSalt);
  };

  public matchHash = async (str: string, hash: string): Promise<boolean> => {
    return compare(str, hash);
  };
}
