import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CodeDto, ConfirmDto } from './dto/auth.dto';
import { AuthRequest } from 'src/types';
import { AuthGuard } from './auth.guard';
import { UserClient } from 'src/users/user.client';

@Controller('/')
export class AuthController {

    constructor(
        private authService: AuthService,
        private userClient: UserClient,
    ) { }

    @UseGuards(AuthGuard)
    @Get('profile')
    async profile(@Request() req: AuthRequest) {

        const { data: user } = await this.userClient.getUserByBarcode(req.user.barcode);

        return {
            statusCode: 200,
            data: user
        };
    }

    @Post('code')
    async code(@Body() body: CodeDto) {
        return this.authService.code(body);
    }

    @Post('confirm')
    async confirm(@Body() body: ConfirmDto) {
        return this.authService.confirm(body);
    }

}
