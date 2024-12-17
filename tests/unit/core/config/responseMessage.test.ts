import responseMessage from '../../../../src/core/config/responseMessage';

describe('Response Messages', () => {
  it('should have static messages', () => {
    expect(responseMessage.SUCCESS).toBe('Success');
    expect(responseMessage.INTERNAL_SERVER_ERROR).toBe('Internal server error');
    expect(responseMessage.VALIDATION_ERROR).toBe('Validation error');
    expect(responseMessage.UNAUTHORIZED).toBe('Unauthorized');
    expect(responseMessage.FORBIDDEN).toBe('Forbidden');
    expect(responseMessage.BAD_REQUEST).toBe('Bad request');
  });

  it('should generate not found message with URL', () => {
    const url = '/api/test';
    expect(responseMessage.NOT_FOUND(url)).toBe(`Cannot ${url} not found`);
  });
});
