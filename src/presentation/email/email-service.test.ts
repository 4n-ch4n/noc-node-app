import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from "./email-service"

describe('email-service.ts', () => {
  const mockSendMail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });
  
  const emailService = new EmailService();

  test('should send email', async () => {
    const options: SendMailOptions = {
      to: 'mail@example.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>',
    };

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: '<h1>Test</h1>',
      subject: 'Test',
      to: 'mail@example.com',
    });
  });
  
  test('should send email with attachments', async () => {
    const email = 'example@mail.com';

    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: 'Logs of server',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { fileName: 'logs-all.log', path: './logs/logs-all.log' },
        { fileName: 'logs-high.log', path: './logs/logs-high.log' },
        { fileName: 'logs-medium.log', path: './logs/logs-medium.log' },
      ]),
    });
  });
});
