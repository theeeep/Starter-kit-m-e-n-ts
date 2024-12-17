import { Get, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import type { Health } from '../../../core/schemas/health.schema';
import quicker from '../../../core/utils/quicker';

@JsonController('/health')
@OpenAPI({ summary: 'Health check endpoints' })
export class HealthController {
  @Get('/')
  @OpenAPI({ summary: 'Check API health status' })
  async check(): Promise<Health> {
    const applicationHealth = quicker.getApplicationHealth();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: applicationHealth.environment,
      uptime: Number(process.uptime().toFixed(2)),
      memory: {
        used: Number((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)),
        total: Number((process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)),
      },
    };
  }
}
