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
import { NewService } from './news.service';
import { AuthRequest } from 'src/types';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserClient } from 'src/users/user.client';
import { CreateNewsDto } from './dto/create-new.dto';

@Controller('news')
export class NewController {
    constructor(
        private readonly newService: NewService,
        private readonly userClient: UserClient,
    ) { }

    @Get('/all')
    async getAll(@Req() { user: { barcode } }: AuthRequest) {

        const { data: currentUser } = await this.userClient.getUserByBarcode(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для просмотра новостей',
            };
        }

        return {
            statusCode: HttpStatus.OK,
            data: await this.newService.all(),
        };
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        const news = await this.newService.find(id);

        if (!news) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Новость не найдена',
            };
        }

        return {
            statusCode: HttpStatus.OK,
            data: news,
        };
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @Body() dto: CreateNewsDto,
        @Req() { user: { barcode } }: AuthRequest,
    ) {
        const { data: currentUser } = await this.userClient.getUserByBarcode(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для создания новостей',
            };
        }

        return this.newService.createNew(dto);
    }

    @Post(':id')
    @UseGuards(AuthGuard)
    async edit(
        @Param('id') id: number,
        @Body() dto: CreateNewsDto,
        @Req() { user: { barcode } }: AuthRequest,
    ) {
        const { data: currentUser } = await this.userClient.getUserByBarcode(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для редактирования новостей',
            };
        }

        return this.newService.editNew(id, dto);
    }

    @Delete(':id')
   @UseGuards(AuthGuard)
 async delete(
        @Param('id') id: number,
        @Req() { user: { barcode } }: AuthRequest,
    ) {
        const { data: currentUser } = await this.userClient.getUserByBarcode(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для удаления новостей',
            };
        }

        return this.newService.delete(id);
    }
}
