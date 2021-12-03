import { DomainException } from "src/domain/shared/exception/DomainException";
import { ERROR_TYPE } from "src/domain/shared/exception/ErrorCode";

export class Email {
  private static EMAIL_REGULAR_PATTERN =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  private static EMAIL_MAX_LENGTH = 256;

  readonly value: string;

  constructor(value: string) {
    if (!value) {
      throw new DomainException(
        'メールアドレスの入力は必須です',
        ERROR_TYPE.INVALID_INPUT
      );
    }

    if (value.length > Email.EMAIL_MAX_LENGTH) {
      throw new DomainException(
        'メールアドレスの最大長は256文字です',
        ERROR_TYPE.INVALID_INPUT
      );
    }

    if (!value.match(Email.EMAIL_REGULAR_PATTERN)) {
      throw new DomainException(
        'メールアドレスの形式が正しくありません',
        ERROR_TYPE.INVALID_INPUT
      );
    }

    this.value = value;
  }
}
