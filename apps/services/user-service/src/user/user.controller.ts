import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    Req,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthRequest } from 'src/types';
import { CreateUserDto } from './dto/saveUser.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { ImageClient } from 'src/images/image.client';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly imageClient: ImageClient,
    ) { }

    @Get(':barcode')
    async getUserByBarcode(@Param('barcode') barcode: string) {

        const user = await this.userService.find(barcode);

        if (!user) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Такого юзера не существует"
            }
        }
        return user;
    }

    @Post()
    async saveUser(@Body() user: CreateUserDto, @Req() { user: { barcode } }: AuthRequest) {
        const requestUser = await this.userService.find(barcode);
        const isAdmin = requestUser?.role?.key === 'admin' || requestUser?.role?.key === 'dev';

        if (!requestUser) {
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: "Вы не авторизованы"
            };
        }

        if (!isAdmin) {
            if (user.barcode !== requestUser.barcode) {
                return {
                    statusCode: HttpStatus.FORBIDDEN,
                    message: "Вы можете редактировать только свой профиль"
                };
            }

            const existingUser = await this.userService.find(user.barcode);

            if (!existingUser) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Пользователь не найден"
                };
            }

            if (existingUser.imageId && existingUser.imageId !== user.imageId) {
                await this.imageClient.deleteImage(existingUser.imageId);
            }

            existingUser.imageId = user.imageId;

            return this.userService.save(existingUser);
        }

        const targetUser = await this.userService.find(user.barcode);

        if (targetUser && targetUser.imageId && targetUser.imageId !== user.imageId) {
            await this.imageClient.deleteImage(targetUser.imageId);
        }

        return this.userService.save(user);
    }

    @Delete(':barcode')
    async deleteUser(@Param('barcode') barcode: string) {
        return this.userService.delete(barcode);
    }

}
