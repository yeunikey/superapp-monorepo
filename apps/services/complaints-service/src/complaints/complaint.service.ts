import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { Complaint } from "./entities/complaint.entity";

@Injectable()
export class ComplaintService {

    constructor(
        @InjectRepository(Complaint)
        private complaintRepo: Repository<Complaint>,

        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    async all() {
        const cached = await this.cacheManager.get<Complaint[]>(`complaint:all`);
        if (cached) return cached;

        const complaints = await this.complaintRepo.find();
        if (complaints) {
            await this.cacheManager.set(`complaint:all`, complaints, 180 * 1000);
        }

        return complaints;
    }

    async findByUser(barcode: string) {
        const cached = await this.cacheManager.get<Complaint[]>(`complaint:user:${barcode}`);

        if (cached) return cached;

        const complaints = await this.complaintRepo.find({ where: { sender: barcode } });

        if (complaints) {
            await this.cacheManager.set(`complaint:user:${barcode}`, complaints, 180 * 1000);
        }

        return complaints;
    }

    async find(id: string) {
        const cached = await this.cacheManager.get<Complaint>(`complaint:${id}`);
        if (cached) return cached;

        const complaint = await this.complaintRepo.findOne({
            where: { uniqueId: id },
        });

        if (complaint) {
            await this.cacheManager.set(`complaint:${id}`, complaint, 180 * 1000);
        }

        return complaint;
    }

    async save(complaint: DeepPartial<Complaint>) {

        await this.cacheManager.del(`complaint:all`);

        if (complaint.uniqueId) {
            await this.cacheManager.del(`complaint:${complaint.uniqueId}`);
            await this.cacheManager.del(`complaint:user:${complaint.sender}`);
        }

        return await this.complaintRepo.save(complaint);
    }

    async delete(id: string) {
        const existing = await this.complaintRepo.findOne({
            where: { uniqueId: id },
        });

        if (!existing) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Жалоба не найдена",
            };
        }

        await this.complaintRepo.delete({ uniqueId: id });
        await this.cacheManager.del(`complaint:${id}`);
        await this.cacheManager.del(`complaint:all`);
            await this.cacheManager.del(`complaint:user:${existing.sender}`);

        return {
            statusCode: HttpStatus.OK,
            message: "Жалоба успешно удалена",
        };
    }

}
