import { PrismaClient } from '@prisma/client';
import {cleanupDatabase, setupDatabase} from "./util/prisma-test-helper";
import {UserPrismaRepository} from "../user-prisma-repository";
import {User} from "../../../../domain/user/User";
import {UserId} from "../../../../domain/user/UserID";
import {Email} from "../../../../domain/user/Email";
import {Name} from "../../../../domain/user/Name"

const client = new PrismaClient();
const userRepository = new UserPrismaRepository(client);

beforeEach(async () => {
    await cleanupDatabase();
    await setupDatabase();
});

afterAll(async () => {
    await client.$disconnect();
});

describe("saveメソッドのテスト", () => {
    it('ユーザーが保存されてユーザーIDで検索ができること', async () => {
        const user = User.reConstructor(
            UserId.create(),
            new Email("hogehoge@example.com"),
            new Name("test1"),
        )
        await userRepository.create(user)

        const result = await userRepository.findByUserId(user.userId)

        expect(result.userId).toEqual(user.userId)
    })
})