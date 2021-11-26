import { Email } from "../../user/Email"

describe('Email', () => {
    describe('不変条件例外テスト', () => {
        it('空の場合は例外が発生すること', () => {
            const target = () => {
                new Email("")
            }
            expect(target).toThrow(Error)
            expect(target).toThrow("メールアドレスの入力は必須です")
        }),
        it('257文字以上の場合はエラーが発生すること', () => {
            const target = () => {
                new Email("a".repeat(257))
            }
            expect(target).toThrow(Error)
            expect(target).toThrow("メールアドレスの最大長は256文字です")
        }),
        test.each([
            ["hogeho:g:e@example.com"],
            ["hogehoge@exmaple!.com"],
            ["hogehoge@@example.com"],
        ])("メールアドレスの形式が不正な場合はエラーが発生すること", (invalidEmail) => {
            const target = () => {
                new Email(invalidEmail)
            }
            expect(target).toThrow(Error)
            expect(target).toThrow("メールアドレスの形式が正しくありません")
        })
    }),
    describe("正常系テスト", () => {
        it('メールアドレスが256文字以内で正しく入力されている場合はエラーが発生しないこと', () => {
            const value = "hogehoghoge+example@example.com"
            const email = new Email(value)

            expect(email.value).toEqual(value)
        })
    })
})