import { ulid } from 'ulid';

export class UserId {
  private static USERID_LENGTH = 26;

  readonly value: string;

  private constructor(value: string) {
    if (!value) {
      throw new Error('ユーザーIDは必須です');
    }

    if (value.length != UserId.USERID_LENGTH) {
      throw new Error('ユーザーIDの文字列長が正しくありません');
    }

    this.value = value;
  }

  static create(): UserId {
    const value = ulid();
    return new UserId(value);
  }

  static reConstructor(value: string): UserId {
    return new UserId(value);
  }
}
