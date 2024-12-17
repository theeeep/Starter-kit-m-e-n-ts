import { Expose } from 'class-transformer';
import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';

export class SystemHealthDTO {
  @Expose()
  @IsArray()
  @IsNumber({}, { each: true })
  cpuUsage!: number[];

  @Expose()
  @IsString()
  totalMemory!: string;

  @Expose()
  @IsString()
  freeMemory!: string;
}

export class ApplicationHealthDTO {
  @Expose()
  @IsString()
  environment!: string;

  @Expose()
  memoryUsage!: {
    heapTotal: string;
    heapUsed: string;
  };

  @Expose()
  @IsString()
  uptime!: string;
}

export class HealthResponse {
  @Expose()
  @IsString()
  status!: string;

  @Expose()
  @IsDateString()
  timestamp!: string;
}
