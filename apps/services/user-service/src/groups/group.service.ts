import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "./entities/group.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class GroupService {

    constructor(
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
        
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    async find(code: string) {

        const cached = await this.cacheManager.get<Group>(`group:${code}`);
        if (cached) {
            return cached;
        }

        const group = await this.groupRepository.findOne({
            where: {
                name: code
            }
        });

        if (group) {
            await this.cacheManager.set(`group:${code}`, group, 180 * 1000);
        }

        return group;
    }

    async delete(code: string) {

        const group = await this.groupRepository.findOne({
            where: {
                name: code
            }
        });
        if (group) {
            await this.cacheManager.del(`group:${code}`);
        }

        return this.groupRepository.delete(code);
    }

}
