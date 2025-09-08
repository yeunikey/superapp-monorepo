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
import { AuthRequest } from 'src/types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthGuard } from 'src/guard/auth.guard';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { DeepPartial } from 'typeorm';
import { UserClient } from 'src/users/user.client';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService,
        private readonly userClient: UserClient,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    @Get('/')
    async getAllCategories() {

        const categories = await this.categoryService.all();

        return {
            statusCode: HttpStatus.OK,
            data: categories
        };
    }

    @Post()
    async saveCategory(
        @Body() category: DeepPartial<Category>,
        @Req() { user: { barcode } }: AuthRequest
    ) {

        const { data: currentUser } = await this.userClient.getUserByBarcode(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для выполнения операции',
            };
        }

        await this.categoryService.save(category);

        return {
            statusCode: HttpStatus.OK,
        };
    }

    @Post('/edit')
    async editCategory(
        @Body() category: DeepPartial<Category>,
        @Req() { user: { barcode } }: AuthRequest
    ) {

        const { data: currentUser } = await this.userClient.getUserByBarcode(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для выполнения операции',
            };
        }

        return this.categoryService.edit(category);
    }

    @Delete(':id')
    async deleteCategory(
        @Param('id') id: number,
        @Req() { user: { barcode } }: AuthRequest
    ) {

        const { data: currentUser } = await this.userClient.getUserByBarcode(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для выполнения операции',
            };
        }

        return this.categoryService.delete(id);
    }

}
