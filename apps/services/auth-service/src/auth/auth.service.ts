import { CodeDto, ConfirmDto } from './dto/auth.dto';
import { HttpStatus, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mailer/mail.service';
import { UserClient } from 'src/users/user.client';

@Injectable()
export class AuthService {

    constructor(
        private userClient: UserClient,
        private jwtService: JwtService,
        private mailService: MailService
    ) { }

    private readonly codeMap = new Map<string, { code: number; timeout: NodeJS.Timeout }>();

    generateCode() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    async code({ barcode }: CodeDto) {

        const { data: user } = await this.userClient.getUserByBarcode(barcode);

        if (!user) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Такого пользователя не существует"
            };
        }

        const code = this.generateCode();
        if (this.codeMap.has(user.barcode)) {
            return {
                statusCode: HttpStatus.NOT_IMPLEMENTED,
                message: "Код уже отправлен (Код можно отправлять раз 3 минуты)"
            };
        }

        const timeout = setTimeout(() => {
            this.codeMap.delete(user.barcode);
        }, 3 * 60 * 1000);

        this.codeMap.set(user.barcode, { code, timeout });

        await this.mailService.sendEmail(user, code)

        return {
            statusCode: 200,
        };
    }

    async confirm({ code, barcode }: ConfirmDto) {

        const { data: user } = await this.userClient.getUserByBarcode(barcode);

        if (!user) {
            return {
                statusCode: 400,
                message: "Такого пользователя не существует"
            };
        }

        if (!this.codeMap.has(barcode)) {
            return {
                statusCode: 400,
                message: "Нет заявки с кодом"
            };
        }

        if (this.codeMap.get(barcode)?.code != code) {
            return {
                statusCode: 400,
                message: "Неправильный код"
            };
        }

        this.codeMap.delete(barcode);

        const payload = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            role: user.role?.key ?? undefined,
            group: user.group?.name ?? undefined,
            imageId: user.imageId ?? undefined,
            scores: user.scores,
            barcode: user.barcode
        };

        return {
            statusCode: 200,
            data: {
                token: await this.jwtService.signAsync(payload),
                user: user
            }
        };
    }

}
