import { Controller, Get } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

type HealthStatus = {
  status: string;
  db: string;
  timestamp: string;
};

@Controller('health')
export class HealthController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get()
  async check(): Promise<HealthStatus> {
    const dbStatus = this.connection.readyState === 1 ? 'up' : 'down';

    return {
      status: 'up',
      db: dbStatus,
      timestamp: new Date().toISOString(),
    };
  }
}
