import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { Repository } from "typeorm";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private roleRepo: Repository<Role>,

        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    async find(key: string) {

        const cached = await this.cacheManager.get<Role>(`role:${key}`);
        if (cached) {
            return cached;
        }

        const role = await this.roleRepo.findOne({
            where: {
                key
            }
        });

        if (role) {
            await this.cacheManager.set(`role:${key}`, role, 180 * 1000);
        }

        return role;
    }

    async delete(key: string) {

        const role = await this.roleRepo.findOne({
            where: {
                key
            }
        });

        if (role) {
            await this.cacheManager.del(`role:${key}`);
        }

        return this.roleRepo.delete(key);
    }

}
