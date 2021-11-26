import { ulid } from 'ulid'

export class UserId {
    private constructor(
        public readonly value: string
    ) {
    }

    static create(): UserId {
        const value = ulid()
        return new UserId(
            value
        )
    }

    static reConstructor(value: string): UserId {
        return new UserId(value)
    }
}