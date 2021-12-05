import { DomainException } from "../shared/exception/DomainException";

export class TenantName {
  private static MAX_TENANT_NAME_LENGTH = 256
  constructor(
    readonly value: string
  ) {
    if (!value) throw new DomainException("テナント名が入力されていません")

    if (value.length > TenantName.MAX_TENANT_NAME_LENGTH)
      throw new DomainException("テナント名が256文字以内で入力してください")
  }
}
