
export class Name {
    private static MAX_NAME_LENGTH = 256

    readonly value: string

    constructor(value: string) {
        if (value.length > Name.MAX_NAME_LENGTH) {
            throw new Error("名前は256文字以内で入力してください")
        }
        this.value = value
    }
}