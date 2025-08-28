import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Inject,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AuthRequest } from 'src/types';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('groups')
export class GroupController {

    constructor(
        private readonly groupService: GroupService,
        private readonly userService: UserService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    @Get('/all')
    async getAllUsers() {

        return {
            statusCode: HttpStatus.OK,
            data: await this.groupService.all()
        };
    }

    @Post("/new")
    @UseGuards(AuthGuard)
    async newGroup(
        @Body() dto: CreateGroupDto,
        @Req() { user: { barcode } }: AuthRequest
    ) {

        const currentUser = await this.userService.find(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для выполнения операции',
            };
        }

        return this.groupService.new(dto);
    }

    @Post("/edit")
    @UseGuards(AuthGuard)
    async editGroup(
        @Body() dto: CreateGroupDto,
        @Req() { user: { barcode } }: AuthRequest
    ) {

        const currentUser = await this.userService.find(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для выполнения операции',
            };
        }

        return this.groupService.edit(dto);
    }

    @Delete(':code')
    @UseGuards(AuthGuard)
    async deleteGroup(
        @Param('code') code: string,
        @Req() { user: { barcode } }: AuthRequest
    ) {
        const currentUser = await this.userService.find(barcode);

        if (!currentUser || !currentUser.role || !['admin', 'dev'].includes(currentUser.role.key)) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: 'Нет прав для выполнения операции',
            };
        }

        return this.groupService.delete(code);
    }

}
