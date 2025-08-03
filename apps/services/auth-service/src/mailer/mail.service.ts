import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {

    constructor(private readonly mailerService: MailerService) { }

    async sendEmail(user: User, code: number): Promise<void> {

        try {
            await this.mailerService.sendMail({
                to: `${user.barcode}@astanait.edu.kz`,
                from: "support@unilabs.studio",
                subject: 'Подтверждение аккаунта',
                template: 'index',
                context: {
                    studentName: user.name,
                    code: code
                },
            });

            console.log('Email sent successfully to ' + `${user.barcode}@astanait.edu.kz`);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
