import { ErrorCode, ERROR_TYPE } from "src/domain/shared/exception/ErrorCode";

export class DomainException extends Error {
  private errorCode: ErrorCode

  constructor(
    e?: string,
    errorCode?: ErrorCode
  ) {
    super(e)

    if (!errorCode) {
      this.errorCode = ERROR_TYPE.INVALID_INPUT
    } else {
      this.errorCode = errorCode
    }
  }
}
