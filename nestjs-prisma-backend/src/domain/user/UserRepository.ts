import { User } from "src/domain/user/User";

export interface UserRepository {
    create(user: User): Promise<void>
}