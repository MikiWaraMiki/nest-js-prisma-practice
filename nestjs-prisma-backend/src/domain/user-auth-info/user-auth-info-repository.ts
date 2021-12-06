import { UserAuthInfo } from "src/domain/user-auth-info/user-auth-info";

export interface UserAuthInfoRepository {
  findByAuth0UUID(auth0UUID: string): Promise<UserAuthInfo | undefined>
}
