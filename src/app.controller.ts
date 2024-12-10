import { Controller, Get, Ip, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getIp')
  getIp(@Req() req: Request): string {
    console.log(req);
    return '';
  }
}
