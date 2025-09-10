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
        return {
            statusCode: HttpStatus.OK,
            data: user
        };
    }

    @Post()
    async saveUser(
        @Body() user: CreateUserDto,
        @Req() { user: { barcode } }: AuthRequest
    ) {
        if (barcode !== user.barcode) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Вы можете изменять только своё изображение',
            };
        }

        return this.userService.saveUserWithCache(user);
    }

    @Post('/new')
    async new(
        @Body() user: CreateUserDto,
        @Req() { user: { barcode } }: AuthRequest
    ) {
        const currentUser = await this.userService.find(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для выполнения операции',
            };
        }

        return this.userService.new(user);
    }

    @Post('/edit')
    async edit(
        @Body() user: CreateUserDto,
        @Req() { user: { barcode } }: AuthRequest
    ) {
        const currentUser = await this.userService.find(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для выполнения операции',
            };
        }

        return this.userService.edit(user);
    }

    @Delete(':barcode')
    async deleteUser(
        @Param('barcode') deleteBarcode: string,
        @Req() { user: { barcode } }: AuthRequest
    ) {

        const currentUser = await this.userService.find(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для выполнения операции',
            };
        }

        return this.userService.delete(deleteBarcode);
    }

}
