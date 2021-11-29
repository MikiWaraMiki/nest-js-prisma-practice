import { Email } from "src/domain/user/Email";
import { Name } from "src/domain/user/Name";
import { UserId } from "src/domain/user/UserID";
import { UserProfile } from "src/domain/user/UserProfile";
import { UserProfileText } from "src/domain/user/UserProfileText";

export class User {
    private constructor(
        public readonly userId: UserId,
        public readonly email: Email,
        public readonly name: Name,
    ) {
    }

    /**
    updateProfile(userProfileText: UserProfileText): User {
        const updateUserProfile = new UserProfile(
            this.userId,
            userProfileText
        )
        return new User(
            this.userId,
            this.email,
            this.name,
            updateUserProfile
        )
    }
     **/

    static reConstructor(userId: UserId, email: Email, name: Name): User {
        return new User(userId, email, name)
    }
}