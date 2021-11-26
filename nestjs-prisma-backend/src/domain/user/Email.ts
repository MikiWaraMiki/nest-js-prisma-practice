
export class Email {
    private static EMAIL_REGULAR_PATTERN = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    private static EMAIL_MAX_LENGTH = 256


    readonly value: string

    constructor(value: string) {
        if (!value) {
            throw new Error("メールアドレスの入力は必須です")
        }
        
        if (value.length > Email.EMAIL_MAX_LENGTH) {
            throw new Error("メールアドレスの最大長は256文字です")
        }

        if (value.match(Email.EMAIL_REGULAR_PATTERN)) {
            throw new Error("メールアドレスの形式が正しくありません")
        }

        this.value = value
    }
}