export class UserProfileText {
    private static MAX_LENGTH = 2000

    readonly value: string

    constructor(value: string) {
        if (value == "") {
            throw new Error("プロフィール文が入力されていません")
        }

        if (value.length > UserProfileText.MAX_LENGTH) {
            throw new Error("プロフィール文は2000文字以内で入力してください")
        }

        this.value = value
    }
}