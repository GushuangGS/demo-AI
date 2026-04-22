import { Injectable } from '@nestjs/common';

interface HealthResponse {
  name: string;
  message: string;
  timestamp: string;
}

@Injectable()
export class AppService {
  getHealth(): HealthResponse {
    return {
      name: 'errand-server',
      message: 'NestJS errand service is running.',
      timestamp: new Date().toISOString(),
    };
  }
}
