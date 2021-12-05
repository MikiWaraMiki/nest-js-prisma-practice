export const TENANT_STUTUS_VARIATION = {
  IN_READY: 'in_ready',
  ACTIVE: 'active',
  END_OF_CONTRACT: 'end_of_contract'
}
type TENANT_STATUS = typeof TENANT_STUTUS_VARIATION[
  keyof typeof TENANT_STUTUS_VARIATION
]

const TENANT_STATUS_TRANSITION = {
  [TENANT_STUTUS_VARIATION.IN_READY]: [
    TENANT_STUTUS_VARIATION.ACTIVE,
    TENANT_STUTUS_VARIATION.END_OF_CONTRACT
  ],
  [TENANT_STUTUS_VARIATION.ACTIVE]: [
    TENANT_STUTUS_VARIATION.END_OF_CONTRACT
  ]
}

export class TenantStatus {
  constructor(
    readonly value: TENANT_STATUS
  ) {

  }

  canTransit(nextStatus: TenantStatus): boolean {
    const keys = Object.keys(TENANT_STATUS_TRANSITION)

    if (!keys.includes(this.value))
      return false

    const values = TENANT_STATUS_TRANSITION[this.value]

    if (!values.includes(nextStatus.value))
      return false

    return true
  }
}
