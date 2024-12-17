import type { Request, Response } from 'express';
import type { MockNext, MockRequest } from './types';

export const createMockRequest = (overrides?: Partial<MockRequest>): Request => {
  const req = {
    ip: '127.0.0.1',
    method: 'GET',
    originalUrl: '/api/v1/test',
    headers: {},
    body: {},
    params: {},
    query: {},
    get: (name: string) => req.headers[name.toLowerCase()],
    ...overrides,
  } as Request;

  return req;
};

export const createMockResponse = (): Response => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
    locals: {},
    getHeader: jest.fn(),
    setHeader: jest.fn(),
    removeHeader: jest.fn(),
  } as unknown as Response;

  return res;
};

export const createMockNext = (): MockNext => {
  return jest.fn();
};

export const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

export const mockConfig = {
  ENV: 'test',
  PORT: 3000,
  SERVER_URL: 'http://localhost:3000',
  DATABASE_URL: 'mongodb://localhost:27017/test',
};
