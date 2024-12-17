export default {
  // Success Messages
  SUCCESS: 'Success',
  CREATED: 'Created successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',

  // Error Messages
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  NOT_FOUND: (resource: string) => `${resource} not found`,
  INTERNAL_SERVER_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation error',

  // Rate Limiting
  TOO_MANY_REQUESTS: 'Too many requests, please try again later',

  // Health Check
  HEALTH_CHECK: 'Health check successful',

  // Database
  DATABASE_CONNECTION_ERROR: 'Database connection error',
  DATABASE_OPERATION_ERROR: 'Database operation error',
};
