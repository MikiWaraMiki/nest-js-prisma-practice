import { DomainException } from "src/domain/shared/exception/DomainException";

export class TenantAuth0ID {
  constructor(
    readonly value: string
  ) {
    if (!value) throw new DomainException("Auth0のテナント識別IDが必須です")
  }
}
