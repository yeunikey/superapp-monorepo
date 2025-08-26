import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { CreateUserDto } from "./dto/saveUser.dto";
import { ImageClient } from "src/images/image.client";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private readonly imageClient: ImageClient,

        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    async all() {
        const cached = await this.cacheManager.get<User>(`user:all`);

        if (cached) {
            return cached;
        }

        const users = await this.userRepo.find({
            loadEagerRelations: true
        });

        if (users) {
            await this.cacheManager.set(`user:all`, users, 180 * 1000);
        }

        return users;
    }

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

    async save(user: DeepPartial<User>) {
        await this.cacheManager.del(`user:${user.barcode}`);
        await this.cacheManager.del(`user:all`);

        return await this.userRepo.save(user);
    }

    async delete(id: string) {

        const user = await this.userRepo.findOne({ where: { barcode: id } });

        if (!user) {
            return null;
        }

        await this.cacheManager.del(`user:${user.barcode}`);

        return this.userRepo.delete(user.id);
    }

    async saveUserWithCache(user: CreateUserDto, isAdmin: boolean) {

        const existingUser = await this.userRepo.findOne({
            where: { barcode: user.barcode },
            loadEagerRelations: true
        });

        if (!existingUser && !isAdmin) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Пользователь не найден',
            };
        }

        if (existingUser?.imageId && existingUser.imageId !== user.imageId) {
            await this.imageClient.deleteImage(existingUser.imageId);
        }

        const entityToSave = isAdmin
            ? this.userRepo.create(user)
            : { ...existingUser, imageId: user.imageId };

        const savedUser = await this.userRepo.save(entityToSave);

        console.log(savedUser);

        await this.cacheManager.set(`user:${savedUser.barcode}`, savedUser, 180 * 1000);
        await this.cacheManager.del('user:all');

        return savedUser;
    }


}
