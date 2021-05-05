import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.keys';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Injectable()
export class DatabaseService {}

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        //ssl: true,
        type: 'postgres' as const,
        host: config.get(Configuration.PG_HOST),
        port: parseInt(config.get(Configuration.PG_PORT)),
        database: config.get(Configuration.PG_NAME),
        username: config.get(Configuration.PG_USERNAME),
        password: config.get(Configuration.PG_PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
