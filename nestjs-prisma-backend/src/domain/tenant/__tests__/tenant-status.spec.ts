import { TenantStatus, TENANT_STUTUS_VARIATION } from "../tenant-status"

describe('TenantStatusクラスのテスト', () => {
  describe('canTransitのテスト', () => {
    it('IN_READYからACTIVEに遷移する場合はtrueを返すこと', () => {
      const inready = new TenantStatus(TENANT_STUTUS_VARIATION.IN_READY)
      const active = new TenantStatus(TENANT_STUTUS_VARIATION.ACTIVE)

      expect(inready.canTransit(active)).toBeTruthy()
    })

    it('IN_READYからEND_OF_CONTRACTに遷移する場合はtrueを返すこと', () => {
      const inready = new TenantStatus(TENANT_STUTUS_VARIATION.IN_READY)
      const endOfContract = new TenantStatus(TENANT_STUTUS_VARIATION.END_OF_CONTRACT)

      expect(inready.canTransit(endOfContract)).toBeTruthy
    })

    it('IN_READYからIN_READYに遷移する場合はfalseを返すこと', () => {
      const inready = new TenantStatus(TENANT_STUTUS_VARIATION.IN_READY)
      const inready2 = new TenantStatus(TENANT_STUTUS_VARIATION.IN_READY)

      expect(inready.canTransit(inready2)).toBeFalsy
    })

    it('ACITVEからEND_OF_CONTRACTに遷移する場合はtrueを返すこと', () => {
      const active = new TenantStatus(TENANT_STUTUS_VARIATION.ACTIVE)
      const endOfContract = new TenantStatus(TENANT_STUTUS_VARIATION.END_OF_CONTRACT)


      expect(active.canTransit(endOfContract)).toBeTruthy
    })

    test.each([
      new TenantStatus(TENANT_STUTUS_VARIATION.IN_READY),
      new TenantStatus(TENANT_STUTUS_VARIATION.ACTIVE)
    ])('ACTIVEから、END_OF_CONTRACT以外に遷移する場合はfalseを返すこと', (status) => {
      const active = new TenantStatus(TENANT_STUTUS_VARIATION.ACTIVE)

      expect(active.canTransit(status)).toBeFalsy
    })

    test.each([
      new TenantStatus(TENANT_STUTUS_VARIATION.IN_READY),
      new TenantStatus(TENANT_STUTUS_VARIATION.ACTIVE),
      new TenantStatus(TENANT_STUTUS_VARIATION.END_OF_CONTRACT)
    ])('END_OF_CONTRACTからは、どのステータス遷移に対してもfalseを返すこと', (status) => {
      const endOfContract = new TenantStatus(TENANT_STUTUS_VARIATION.END_OF_CONTRACT)

      expect(endOfContract.canTransit(status)).toBeFalsy
    })
  })
})
