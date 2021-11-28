import { User } from "src/domain/user/User";
import { UserId } from "src/domain/user/UserID";

export interface UserRepository {
    create(user: User): Promise<void>
    findByUserId(userID: UserId): Promise<User>
}