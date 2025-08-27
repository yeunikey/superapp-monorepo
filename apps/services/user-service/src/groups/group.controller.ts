import {
    Controller,
    Get,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {

    constructor(
        private readonly groupService: GroupService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    @Get('/all')
    async getAllUsers() {

        return {
            statusCode: HttpStatus.OK,
            data: await this.groupService.all()
        };
    }

}
