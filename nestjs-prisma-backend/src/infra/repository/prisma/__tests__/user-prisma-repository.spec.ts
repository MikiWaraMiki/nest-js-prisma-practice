import { prisma, truncateAllTable} from "testUtil/prisma-test-helper";
import {UserPrismaRepository} from "../user-prisma-repository";
import {User} from "src/domain/user/User";
import {UserId} from "src/domain/user/UserID";
import {Email} from "src/domain/user/Email";
import {Name} from "src/domain/user/Name"

describe("saveメソッドのテスト", () => {
    let userRepository: UserPrismaRepository
    beforeAll(async () => {
        userRepository = new UserPrismaRepository(prisma);
    })

    beforeEach(async () => {
        await truncateAllTable();
    }, 10000);
    
    afterAll(async () => {
        await truncateAllTable();
        await prisma.$disconnect()
    });
    
    it('ユーザーが保存されてユーザーIDで検索ができること', async () => {
        const user = User.reConstructor(
            UserId.create(),
            new Email("hogehoge@example.com"),
            new Name("test1"),
        )
        await userRepository.save(user)

        const result = await userRepository.findByUserId(user.userId)

        expect(result.userId).toEqual(user.userId)
    })

    it('ユーザーが存在しない場合はundefinedを返すこと', async () => {
        const userId = UserId.create()

        const result = await userRepository.findByUserId(userId)

        expect(result).toBeUndefined()
    })
})