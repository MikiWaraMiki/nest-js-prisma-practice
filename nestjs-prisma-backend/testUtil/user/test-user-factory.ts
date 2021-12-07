import { Email } from "src/domain/user/Email";
import { Name } from "src/domain/user/Name";
import { User } from "src/domain/user/User";
import { UserId } from "src/domain/user/UserID";

export class TestUserFactory {
  constructor() {}

  create(
    {
      userId = UserId.create(),
      email = new Email("user-example@example.com"),
      name = new Name("example")
    }
  ): User{
    return User.reConstructor(
      userId,
      email,
      name
    )
  }
}
