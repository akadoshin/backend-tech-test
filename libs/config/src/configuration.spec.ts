import config from './configuration';

describe('Configuration', () => {
  it('should return default configuration', () => {
    const configuration = config();

    expect(configuration).toEqual({
      version: expect.any(Symbol),
      environment: 'test',
      jwtSecret: 'secret',
      jwtExpirationTime: '60s',
      redis: {
        host: 'localhost',
        port: 6379,
        ttl: 600,
      },
      microservices: {
        user: {
          prefix: 'user',
          port: 3001,
          database: 'database.sqlite',
        },
        task: {
          prefix: 'task',
          port: 3002,
          database: 'database.sqlite',
        },
      },
    });
  });
});
