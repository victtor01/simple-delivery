import { CreateManagerDto } from "../dto/create-manager.dto";
import { Manager } from "../entities/manager.entity";

export abstract class ManagersRepository {
    abstract save(data: CreateManagerDto): Promise<Manager>
    abstract findByEmail(email: string): Promise<Manager>
    abstract findById(id: string): Promise<Manager>
    abstract findWithStores(managerId: string): Promise<Manager>
}