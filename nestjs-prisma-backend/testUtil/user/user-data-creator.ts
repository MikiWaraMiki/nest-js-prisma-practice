import { Email } from "src/domain/user/Email";
import { Name } from "src/domain/user/Name";
import { User } from "src/domain/user/User";
import { UserId } from "src/domain/user/UserID";
import { UserRepository } from "src/domain/user/UserRepository";

export class UserDataCreator {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async create(
    {
      userId = UserId.create(),
      email = new Email("user-example@example.com"),
      name = new Name("example")
    }
  ): Promise<User>{
    const user = User.reConstructor(
      userId,
      email,
      name
    )

    await this.userRepository.save(user)

    return user
  }
}
