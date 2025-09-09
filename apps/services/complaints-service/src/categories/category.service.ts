import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryRepo: Repository<Category>,

        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    async all() {
        const cached = await this.cacheManager.get<Category[]>(`category:all`);

        if (cached) {
            return cached;
        }

        const categories = await this.categoryRepo.find();

        if (categories) {
            await this.cacheManager.set(`category:all`, categories, 180 * 1000);
        }

        return categories;
    }

    async find(id: number) {

        const cached = await this.cacheManager.get<Category>(`category:${id}`);

        if (cached) {
            return cached;
        }

        const category = await this.categoryRepo.findOne({
            where: { id },
            loadEagerRelations: true
        });

        if (category) {
            await this.cacheManager.set(`category:${id}`, category, 180 * 1000);
        }

        return category;
    }

    async save(category: DeepPartial<Category>) {
        await this.cacheManager.del(`category:${category.id}`);
        await this.cacheManager.del(`category:all`);

        return await this.categoryRepo.save(category);
    }

    async delete(id: number) {

        const category = await this.categoryRepo.findOne({
            where: { id },
        });

        if (!category) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Категория не найден",
            };
        }

        await this.cacheManager.del(`category:${category.id}`);
        await this.cacheManager.del("category:all");

        await this.categoryRepo.delete(category.id);

        return {
            statusCode: HttpStatus.OK,
            message: "Категория успешно удалена",
        };
    }

    async edit(category: DeepPartial<Category>) {

        if (!category.id) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Не указан ID категории",
            };
        }

        const existingCategory = await this.categoryRepo.findOne({
            where: { id: category.id },
        });

        if (!existingCategory) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Категория не найдена",
            };
        }

        existingCategory.title = category.title ?? existingCategory.title;
        existingCategory.content = category.content ?? existingCategory.content;

        const savedCategory = await this.categoryRepo.save(existingCategory);

        await this.cacheManager.del(`category:${savedCategory.id}`);
        await this.cacheManager.del(`category:all`);

        return {
            statusCode: HttpStatus.OK,
            data: savedCategory,
        };
    }

}
