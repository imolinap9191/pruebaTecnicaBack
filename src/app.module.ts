import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import {
  DB_NAME,
  DB_TYPE,
  HOST,
  PORT,
  USER_DB_NAME,
  USER_DB_PASSWORD,
} from '../config';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: DB_TYPE,
      host: HOST,
      username: USER_DB_NAME,
      password: USER_DB_PASSWORD,
      port: PORT,
      database: DB_NAME,
      entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
      synchronize: false,
    }),
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
