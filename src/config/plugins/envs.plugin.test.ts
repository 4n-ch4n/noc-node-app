import { envs } from "./envs.plugin";

describe('envs.plugin.ts', () => {
  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'mail@example.com',
      MAILER_SECRET_KEY: 'xxxx xxxx xxxx xxxx',
      MONGO_URL: "mongodb://random:123456789@localhost:27017",
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'random',
      MONGO_PASS: '123456789'
    });
  });

  test('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugin');

      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});