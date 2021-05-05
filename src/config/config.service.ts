import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';
@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  constructor() {
    const isDevelopment = process.env.APP_ENV !== 'production';
    if (isDevelopment) {
      const envFilePath = __dirname + '/../../.env';
      const existFile = existsSync(envFilePath);
      if (!existFile) {
        console.log('.env doesnt exists');
        process.exit(0);
      }
      this.envConfig = parse(readFileSync(envFilePath));
    } else {
      this.envConfig = {
        APP_PORT: process.env.APP_PORT,
      };
    }
  }
  get(key: string): string {
    return this.envConfig[key];
  }
}
