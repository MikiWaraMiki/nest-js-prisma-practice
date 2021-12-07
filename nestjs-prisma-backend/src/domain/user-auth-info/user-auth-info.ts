import { DomainException } from "../shared/exception/DomainException";
import { UserId } from "../user/UserID";

export class UserAuthInfo {
  constructor(
    readonly userId: UserId,
    readonly auth0UUID: string,
  ) {
    if(!auth0UUID)
      throw new DomainException("Auth0のUUIDが必要です")
  }
}
