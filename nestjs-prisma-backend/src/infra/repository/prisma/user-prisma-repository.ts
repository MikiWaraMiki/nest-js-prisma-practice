import { Prisma } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { User } from "src/domain/user/User";
import { UserRepository } from "src/domain/user/UserRepository";
import { PrismaService } from "src/infra/repository/prisma/prisma-service";

@Injectable()
export class UserPrismaRepository implements UserRepository {
    constructor(private prisma: PrismaService) {}

    async create(user: User): Promise<void> {
        this.prisma.user.create({
            data: {
                id: user.userId.value,
                email: user.email.value,
                name: user.name.value,
                profile: {
                    create: {
                        user_id: user.userId.value,
                        text: user.userProfile.userProfileText.value,
                    }
                }
            }
        })
    }
}