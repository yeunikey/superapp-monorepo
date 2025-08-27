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

    async all() {

        const cached = await this.cacheManager.get<Group>(`group:all`);

        if (cached) {
            return cached;
        }

        const groups = await this.groupRepository.find();

        if (groups) {
            await this.cacheManager.set(`group:all`, groups, 180 * 1000);
        }

        return groups;
    }

    async findByName(code: string) {

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

    async findById(id: number) {

        const cached = await this.cacheManager.get<Group>(`group:id:${id}`);
        if (cached) {
            return cached;
        }

        const group = await this.groupRepository.findOne({
            where: {
                id
            }
        });

        if (group) {
            await this.cacheManager.set(`group:id:${id}`, group, 180 * 1000);
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
