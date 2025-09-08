import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "./entities/group.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { CreateGroupDto } from "./dto/create-group.dto";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class GroupService {

    constructor(
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,

        @InjectRepository(User)
        private userRepository: Repository<User>,


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
            where: { name: code },
            relations: ["users"],
        });

        if (!group) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Группа не найдена"
            }
        }

        if (group.users && group.users.length > 0) {
            for (const user of group.users) {
                user.group = null;
                await this.cacheManager.del(`user:${user.barcode}`);
            }
            await this.userRepository.save(group.users);
        }
        await this.cacheManager.del(`user:all`);

        if (group) {
            await this.cacheManager.del(`group:${code}`);
            await this.cacheManager.del(`group:all`);
        }

        await this.groupRepository.delete(group.id);

        return {
            statusCode: HttpStatus.OK
        };
    }

    async new(group: CreateGroupDto) {
        const existing = await this.groupRepository.findOne({
            where: { name: group.name },
        });

        if (existing) {
            return {
                statusCode: HttpStatus.CONFLICT,
                message: `Группа с именем ${group.name} уже существует`,
            };
        }

        const entity = this.groupRepository.create(group);
        const saved = await this.groupRepository.save(entity);

        await this.cacheManager.set(`group:${saved.id}`, saved, 180 * 1000);
        await this.cacheManager.del("group:all");

        return {
            statusCode: HttpStatus.OK,
            data: saved,
        };
    }

    async edit(group: CreateGroupDto) {

        if (!group.id) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Не указан id группы",
            };
        }

        const existing = await this.groupRepository.findOne({
            where: { id: group.id },
        });

        if (!existing) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Такой группы не существует",
            };
        }

        existing.name = group.name;

        const saved = await this.groupRepository.save(existing);

        await this.cacheManager.set(`group:${saved.id}`, saved, 180 * 1000);
        await this.cacheManager.del("group:all");

        return {
            statusCode: HttpStatus.OK,
            data: saved,
        };
    }

}
