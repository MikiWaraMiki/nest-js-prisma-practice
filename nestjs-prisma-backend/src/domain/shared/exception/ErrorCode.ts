export const ERROR_TYPE = {
  INVALID_INPUT: 100,
  UNKNOWN: 500
} as const;

export type ErrorCode = typeof ERROR_TYPE[keyof typeof ERROR_TYPE]
