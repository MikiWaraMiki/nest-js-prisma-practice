import { PrismaClient } from '@prisma/client';
import {truncateAllTable} from "src/../test/util/prisma-test-helper";
import {UserPrismaRepository} from "../user-prisma-repository";
import {User} from "src/domain/user/User";
import {UserId} from "src/domain/user/UserID";
import {Email} from "src/domain/user/Email";
import {Name} from "src/domain/user/Name"

const client = new PrismaClient();
const userRepository = new UserPrismaRepository(client);

beforeEach(async () => {
    await truncateAllTable();
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