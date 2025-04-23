import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[]
}

interface Attachments {
  fileName: string;
  path: string;
}

export class EmailService {
  constructor() {}

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      });

      return true;
    } catch (error) {

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject  = 'Logs of server';
    const htmlBody = `
      <h3>Logs of system - NOC</h3>
      <p>laaaaaaaaaaaaaaaaaaaallla</p>
      <P>See logs</P>
    `;

    const attachments: Attachments[] = [
      { fileName: 'logs-all.log', path: './logs/logs-all.log' },
      { fileName: 'logs-high.log', path: './logs/logs-high.log' },
      { fileName: 'logs-medium.log', path: './logs/logs-medium.log' },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments })
  }
}
