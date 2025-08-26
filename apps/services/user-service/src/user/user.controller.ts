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
    Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthRequest } from 'src/types';
import { CreateUserDto } from './dto/saveUser.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {

    constructor(
        private readonly userService: UserService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    @Get('/all')
    async getAllUsers(@Req() { user: { barcode } }: AuthRequest) {

        const user = await this.userService.find(barcode);

        if (!user) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Такого юзера не существует"
            }
        }

        if (!user.role || !['admin', 'dev'].includes(user.role.key)) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Такого юзера не существует"
            }
        }

        return {
            statusCode: HttpStatus.OK,
            data: await this.userService.all()
        };
    }

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
    async saveUser(
        @Body() user: CreateUserDto,
        @Req() { user: { barcode } }: AuthRequest
    ) {
        const requestUser = await this.userService.find(barcode);
        const isAdmin =
            requestUser?.role?.key === 'admin' || requestUser?.role?.key === 'dev';

        if (!requestUser) {
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Вы не авторизованы',
            };
        }

        if (!isAdmin && user.barcode !== requestUser.barcode) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Вы можете редактировать только свой профиль',
            };
        }

        return this.userService.saveUserWithCache(user, isAdmin);
    }

    @Delete(':barcode')
    async deleteUser(@Param('barcode') barcode: string) {
        return this.userService.delete(barcode);
    }

}
