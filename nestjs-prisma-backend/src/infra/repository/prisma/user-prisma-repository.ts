import { PrismaClient } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { User } from 'src/domain/user/User';
import { UserId } from "src/domain/user/UserID";
import { UserRepository } from "src/domain/user/UserRepository";
import { User as UserRecord } from '@prisma/client'
import { Email } from "src/domain/user/Email";
import { Name } from "src/domain/user/Name";

@Injectable()
export class UserPrismaRepository implements UserRepository {
    constructor(private prisma: PrismaClient) {}

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.userId.value,
                email: user.email.value,
                name: user.name.value,
            }
        })
    }

    async findByUserId(userID: UserId): Promise<User | undefined> {
        const result = await this.prisma.user.findUnique({
            where: {
                id: userID.value
            },
        })

        if (!result) return undefined

        return this.convertToModelFromRecord(result)
    }

    private convertToModelFromRecord(record: UserRecord): User {
        const userId = UserId.reConstructor(record.id)
        return User.reConstructor(
            userId,
            new Email(record.email),
            new Name(record.name),
        )
    }
}