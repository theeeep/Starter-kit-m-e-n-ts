export type tHttpResponse = {
  success: boolean;
  statusCode: number;
  request: {
    ip: string | null;
    method: string;
    url: string;
  };
  message: string;
  data: unknown;
};

export type tHttpError = {
  success: boolean;
  statusCode: number;
  request: {
    ip: string | null;
    method: string;
    url: string;
  };
  message: string;
  data: unknown;
  stack?: string;
};
