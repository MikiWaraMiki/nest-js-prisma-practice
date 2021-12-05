import { ulid } from "ulid";
import { DomainException } from "../shared/exception/DomainException";

export class TenantId {
  private constructor(
    readonly value: string
  ) {
    if ( !value ) throw new DomainException("テナントIDが入力されていません")

    if (value.length != 26) throw new DomainException("テナントIDの文字数が正しくありません")
  }

  static create(): TenantId {
    const id = ulid()
    return new TenantId(id)
  }

  static reConstructor(value: string): TenantId {
    return new TenantId(value)
  }
}
