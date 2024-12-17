import type { OpenAPIObject } from '@nestjs/swagger';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';

interface SwaggerSchema {
  type: string;
  properties?: Record<string, SwaggerSchema>;
  items?: SwaggerSchema;
  required?: string[];
  enum?: string[];
  format?: string;
  description?: string;
  example?: unknown;
  $ref?: string;
}

export const getSwaggerSpec = (): Partial<OpenAPIObject> => {
  // Get metadata from routing-controllers
  const schemas = validationMetadatasToSchemas();
  const storage = getMetadataArgsStorage();

  // Generate OpenAPI spec
  const spec = routingControllersToSpec(storage, {
    routePrefix: '/api',
  });

  return {
    ...spec,
    openapi: '3.1.0',
    info: {
      title: 'Backend API',
      description: 'Backend API Documentation',
      version: '1.0.0',
    },
    components: {
      schemas: schemas as Record<string, SwaggerSchema>,
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  };
};
