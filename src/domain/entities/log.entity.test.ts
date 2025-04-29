import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('log.entity.ts', () => {
  const dataObj = {
    message: 'Hello world',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts',
  }

  test('should create a log entity instance', () => {

    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a log entity instance from JSON', () => {
    const json = `{"message":"Service http://google.com working","level":"low","createdAt":"2025-04-24T21:49:51.160Z","origin":"check-service.ts"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('Service http://google.com working');
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe('check-service.ts');
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a log entity instance from object', () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
})
