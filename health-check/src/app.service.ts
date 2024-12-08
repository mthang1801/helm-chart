import { BadRequestException, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { DataSource } from 'typeorm';
import { ConnectionDto } from './dtos/connection.dto';

@Injectable()
export class AppService {
  // Kiểm tra kết nối Postgres
  async checkPostgresConnection(options: any): Promise<string> {
    try {
      const dataSource = new DataSource(options);
      await dataSource.initialize();
      await dataSource.destroy(); // Đóng kết nối sau khi kiểm tra
      return 'Postgres connection is successful!';
    } catch (error) {
      throw new BadRequestException(
        `Failed to connect to Postgres: ${error.message}`,
      );
    }
  }

  // Kiểm tra kết nối Redis
  async checkRedisConnection({
    hostname,
    port,
    username,
    password,
  }: ConnectionDto): Promise<string> {
    const redis = new Redis({ host: hostname, port, username, password });
    try {
      await redis.ping();
      redis.disconnect(); // Đóng kết nối Redis
      return 'Redis connection is successful!';
    } catch (error) {
      throw new BadRequestException(
        `Failed to connect to Redis: ${error.message}`,
      );
    }
  }
}
