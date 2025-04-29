import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl"

describe('log.repository.impl.ts', () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('saveLog should call the datasource with arguments', async () => {
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.low,
      origin: 'log.repository.impl.test.ts',
    });

    await logRepositoryImpl.saveLog(log);

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    
  });

  test('getLogs should call the datasource with arguments', async () => {
    await logRepositoryImpl.getLogs(LogSeverityLevel.low);

    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
  });
  
})
