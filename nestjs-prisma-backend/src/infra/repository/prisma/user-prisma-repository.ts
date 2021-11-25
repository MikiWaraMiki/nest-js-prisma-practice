import { Prisma } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/repository/prisma/prisma-service";

@Injectable()
export class TaskPrismaRepository {
    constructor(private prisma: PrismaService) {}

    async save(): Promise<User> {
        
    }
}