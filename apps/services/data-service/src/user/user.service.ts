import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { CreateUserDto } from "./dto/saveUser.dto";
import { ImageClient } from "src/images/image.client";
import { GroupService } from "src/groups/group.service";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private readonly imageClient: ImageClient,
        private readonly groupService: GroupService,

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
        const user = await this.userRepo.findOne({
            where: { barcode: id },
            relations: ["role"],
        });

        if (!user) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Пользователь не найден",
            };
        }

        if (user.role) {
            return {
                statusCode: HttpStatus.FORBIDDEN,
                message: "Нельзя удалить пользователя с назначенной ролью",
            };
        }

        if (user.imageId) {
            await this.imageClient.deleteImage(user.imageId);
        }

        await this.cacheManager.del(`user:${user.barcode}`);
        await this.cacheManager.del("user:all");

        await this.userRepo.delete(user.id);

        return {
            statusCode: HttpStatus.OK,
            message: "Пользователь успешно удален",
        };
    }

    async saveUserWithCache(user: CreateUserDto) {

        const existingUser = await this.userRepo.findOne({
            where: { barcode: user.barcode },
            loadEagerRelations: true
        });

        if (!existingUser) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Пользователь не найден',
            };
        }

        if (existingUser?.imageId && existingUser.imageId !== user.imageId) {
            await this.imageClient.deleteImage(existingUser.imageId);
        }

        const entityToSave = { ...existingUser, imageId: user.imageId };

        const savedUser = await this.userRepo.save(entityToSave);

        await this.cacheManager.set(`user:${savedUser.barcode}`, savedUser, 180 * 1000);
        await this.cacheManager.del('user:all');

        return {
            statusCode: HttpStatus.OK,
            data: savedUser
        };
    }

    async new(user: CreateUserDto) {

        const barcodeTaken = await this.userRepo.findOne({
            where: { barcode: user.barcode },
        });

        if (barcodeTaken) {
            return {
                statusCode: HttpStatus.CONFLICT,
                message: `Пользователь с barcode ${user.barcode} уже существует`,
            };
        }

        const entityToSave = this.userRepo.create(user);

        const savedUser = await this.userRepo.save(entityToSave);

        await this.cacheManager.set(`user:${savedUser.barcode}`, savedUser, 180 * 1000);
        await this.cacheManager.del('user:all');

        return {
            statusCode: HttpStatus.OK,
            data: savedUser
        };
    }

    async edit(user: CreateUserDto) {
        const existingUser = await this.userRepo.findOne({
            where: { barcode: user.barcode },
            relations: ["group"]
        });

        if (!existingUser) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Такого пользователя не существует"
            };
        }

        if (existingUser.imageId && existingUser.imageId !== user.imageId) {
            await this.imageClient.deleteImage(existingUser.imageId);
        }

        existingUser.name = user.name;
        existingUser.surname = user.surname;

        if (user.group === null) {
            existingUser.group = null;
        } else if (user.group?.id) {
            existingUser.group = await this.groupService.findById(user.group.id);
        }

        existingUser.imageId = user.imageId ?? null;

        const savedUser = await this.userRepo.save(existingUser);

        await this.cacheManager.set(`user:${savedUser.barcode}`, savedUser, 180 * 1000);
        await this.cacheManager.del("user:all");

        return {
            statusCode: HttpStatus.OK,
            data: savedUser
        };
    }

}
