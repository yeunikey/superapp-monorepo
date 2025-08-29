import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { New } from "./entities/news.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { CreateNewsDto } from "./dto/create-new.dto";
import { ImageClient } from "src/images/image.client";

@Injectable()
export class NewService {

    constructor(
        @InjectRepository(New)
        private newRepo: Repository<New>,
        private readonly imageClient: ImageClient,
        
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    async all() {
        const cached = await this.cacheManager.get<New>(`new:all`);

        if (cached) {
            return cached;
        }

        const news = await this.newRepo.find();

        if (news) {
            await this.cacheManager.set(`new:all`, news, 180 * 1000);
        }

        return news;
    }

    async find(id: number) {

        const cached = await this.cacheManager.get<New>(`new:${id}`);

        if (cached) {
            return cached;
        }

        const newItem = await this.newRepo.findOne({
            where: { id },
        });

        if (newItem) {
            await this.cacheManager.set(`new:${id}`, newItem, 180 * 1000);
        }

        return newItem;
    }

    async save(newItem: DeepPartial<New>) {
        await this.cacheManager.del(`new:${newItem.id}`);
        await this.cacheManager.del(`new:all`);

        return await this.newRepo.save(newItem);
    }

    async delete(id: number) {

        const newItem = await this.newRepo.findOne({
            where: { id },
        });

        if (!newItem) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Новость не найдена",
            };
        }

        if (newItem.imageId) {
            await this.imageClient.deleteImage(newItem.imageId);
        }

        await this.cacheManager.del(`new:${newItem.id}`);
        await this.cacheManager.del("new:all");

        await this.newRepo.delete(newItem.id);

        return {
            statusCode: HttpStatus.OK,
            message: "Новость успешно удалена",
        };
    }

    async createNew(dto: CreateNewsDto) {
        const entity = this.newRepo.create({
            title: dto.title,
            content: dto.content,
            imageId: dto.imageId ?? null,
        });

        const saved = await this.newRepo.save(entity);

        // инвалидируем кэш
        await this.cacheManager.del("new:all");

        return {
            statusCode: HttpStatus.OK,
            data: saved,
        };
    }

    async editNew(id: number, dto: CreateNewsDto) {
        const existing = await this.newRepo.findOne({ where: { id } });

        if (!existing) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Новость не найдена",
            };
        }

        // если картинка поменялась — удалим старую
        if (existing.imageId && existing.imageId !== dto.imageId) {
            await this.imageClient.deleteImage(existing.imageId);
        }

        existing.title = dto.title;
        existing.content = dto.content;
        existing.imageId = dto.imageId ?? null;

        const saved = await this.newRepo.save(existing);

        await this.cacheManager.set(`new:${saved.id}`, saved, 180 * 1000);
        await this.cacheManager.del("new:all");

        return {
            statusCode: HttpStatus.OK,
            data: saved,
        };
    }

}
