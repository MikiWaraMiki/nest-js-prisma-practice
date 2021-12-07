import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/user/UserRepository";

@Injectable()
export class UserSignUpUsecase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}
}
