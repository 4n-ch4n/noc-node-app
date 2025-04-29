import { LogEntity } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe('send-email-logs.ts', () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should send email and save log', async () => {
    const wasSent = await sendEmailLogs.execute('mail@example.com');

    expect(wasSent).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      message: 'Log email sent',
      level: 'low',
      origin: 'send-email-logs.ts',
    });
  });

  test('should not send email and save error log', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    const wasSent = await sendEmailLogs.execute('mail@example.com');

    expect(wasSent).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      message: 'Error: Email log not sent',
      level: 'high',
      origin: 'send-email-logs.ts',
    });
  });
});
