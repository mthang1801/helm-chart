import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConnectionDto } from './dtos/connection.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Hiển thị trang chủ với giao diện form
  @Get()
  @Render('index') // Tên view là 'index.ejs'
  getHome() {
    return {};
  }

  @Post('postgres')
  async checkPostgres(@Body() connectionDto: ConnectionDto): Promise<string> {
    const { hostname, port, username, password, database } = connectionDto;

    const options = {
      type: 'postgres',
      host: hostname,
      port: port,
      username: username,
      password: password,
      database: database,
    };
    console.log('🚀 ~ AppController ~ checkPostgres ~ options:', options);

    return await this.appService.checkPostgresConnection(options);
  }

  @Post('redis')
  async checkRedis(@Body() connectionDto: ConnectionDto): Promise<string> {
    return this.appService.checkRedisConnection(connectionDto);
  }
}
