import { User } from 'src/domain/user/User';
import { UserId } from 'src/domain/user/UserID';

export interface UserRepository {
  save(user: User): Promise<void>;
  findByUserId(userID: UserId): Promise<User | undefined>;
}
