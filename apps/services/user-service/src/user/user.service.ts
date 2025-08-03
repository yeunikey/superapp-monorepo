import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    async find(barcode: string) {

        const cached = await this.cacheManager.get<User>(`user:${barcode}`);
        if (cached) {
            return cached;
        }

        const user = await this.userRepo.findOne({
            where: { barcode },
            loadEagerRelations: true
        });

        if (user) {
            await this.cacheManager.set(`user:${barcode}`, user, 180 * 1000);
        }

        return user;
    }

    async save(student: DeepPartial<User>) {
        await this.userRepo.save(student);

        await this.cacheManager.del(`user:${student.barcode}`);
        await this.cacheManager.del(`user:all`);
    }

    async delete(id: string) {

        const user = await this.userRepo.findOne({ where: { barcode: id } });

        if (!user) {
            return null;
        }

        await this.cacheManager.del(`user:${user.barcode}`);

        return this.userRepo.delete(user.id);
    }

}
