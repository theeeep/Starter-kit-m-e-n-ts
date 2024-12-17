import type { Request, Response } from 'express';

export interface MockRequest {
  ip?: string;
  method?: string;
  originalUrl?: string;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string>;
  query?: Record<string, string>;
}

export interface MockResponse {
  status?: jest.Mock;
  json?: jest.Mock;
  send?: jest.Mock;
  end?: jest.Mock;
  locals?: Record<string, unknown>;
}

export interface MockNext extends jest.Mock {
  (error?: Error | unknown): void;
}
