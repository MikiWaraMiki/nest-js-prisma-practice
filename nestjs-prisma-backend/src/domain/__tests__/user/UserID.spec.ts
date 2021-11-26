import { UserId } from "../../user/UserID"

describe("UserID test", () => {
    describe("不変条件テスト", () => {
        it("空文字の場合はエラーが発生すること", () => {
            const target = () => {
                UserId.reConstructor("")
            }
            expect(target).toThrow(Error)
            expect(target).toThrow("ユーザーIDは必須です")
        })
        it("26文字でない場合はエラーが発生すること", () => {
            const target = () => {
                UserId.reConstructor("a".repeat(27))
            }
            expect(target).toThrow(Error)
            expect(target).toThrow("ユーザーIDの文字列長が正しくありません")
        })
    })
    describe("UserIDの生成テスト", () => {
        it("26文字のULIDで生成されること", () => {
            const userID = UserId.create()

            expect(userID.value.length).toEqual(26)
        })
    })
})