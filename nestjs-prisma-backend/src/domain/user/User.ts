import { Email } from "src/domain/user/Email";
import { Name } from "src/domain/user/Name";
import { UserId } from "src/domain/user/UserID";

export class User {
    private constructor(
        public readonly userId: UserId,
        public readonly email: Email,
        public readonly name: Name
    ) {
    }

    static reConstructor(userId: UserId, email: Email, name: Name): User {
        return new User(userId, email, name)
    }
}