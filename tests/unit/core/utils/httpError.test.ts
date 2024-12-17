import HttpError from '../../../../src/core/utils/httpError';
import { createMockRequest } from '../../../helpers/testUtils';

describe('HttpError', () => {
  it('should pass error object to next function with default status code', () => {
    // Arrange
    const req = createMockRequest();
    const error = new Error('Test error');
    const next = jest.fn();

    // Act
    HttpError(next, error, req);

    // Assert
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: 500,
        message: error.message,
        data: null,
        request: {
          method: req.method,
          url: req.originalUrl,
          ip: req.ip,
        },
        stack: error.stack,
      })
    );
  });

  it('should pass error object to next function with custom status code', () => {
    // Arrange
    const req = createMockRequest();
    const error = new Error('Test error');
    const next = jest.fn();
    const statusCode = 400;

    // Act
    HttpError(next, error, req, statusCode);

    // Assert
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode,
        message: error.message,
        data: null,
        request: {
          method: req.method,
          url: req.originalUrl,
          ip: req.ip,
        },
        stack: error.stack,
      })
    );
  });

  it('should handle non-Error objects', () => {
    // Arrange
    const req = createMockRequest();
    const error = { message: 'Test error' };
    const next = jest.fn();

    // Act
    HttpError(next, error, req);

    // Assert
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: 500,
        message: 'Internal server error',
        data: null,
        request: {
          method: req.method,
          url: req.originalUrl,
          ip: req.ip,
        },
      })
    );
  });
});
