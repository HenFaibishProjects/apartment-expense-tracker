/* eslint-disable */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'your@email.com',
        pass: process.env.SMTP_PASS || 'your_password',
      },
    });
  }

  async sendActivationCode(to: string, code: string) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000/api';
    const activateUrl = `${baseUrl}/activate?email=${encodeURIComponent(to)}&code=${code}`;
    const mailOptions = {
      from: '"Real Manager" <zzzi10@gmail.com>',
      to,
      subject: '🔒 Your Activation Code',
      text: `Welcome to Real Manager!\n\nYour activation code is: ${code}\n\nClick here to verify:\n${activateUrl}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (err) {
      console.error('❌ Failed to send email:', err);
    }
  }

  async sendPasswordResetEmail(to: string | undefined, token: string) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password.html?token=${token}`;

    const mailOptions = {
      from: '"Estate Manager" <zzzi10@gmail.com>',
      to,
      subject: '🔒 Password Reset Request',
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
