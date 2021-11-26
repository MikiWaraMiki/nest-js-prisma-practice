import { UserId } from "src/domain/user/UserID";
import { UserProfileText } from "src/domain/user/UserProfileText";

export class UserProfile {
    constructor(
        readonly userId: UserId,
        readonly userProfileText: UserProfileText
    ){}
}