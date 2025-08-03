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

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {

    constructor(
        private readonly userService: UserService
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

        if (!requestUser || !requestUser.role || requestUser.role.key != 'admin') {
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: "У вас нет прав"
            }
        }

        return this.userService.save(user);
    }

    @Delete(':barcode')
    async deleteUser(@Param('barcode') barcode: string) {
        return this.userService.delete(barcode);
    }

}
