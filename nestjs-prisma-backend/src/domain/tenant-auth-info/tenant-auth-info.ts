import { TenantId } from "src/domain/tenant/tenant-id";
import { TenantAuth0ID } from "./tenant-auth0-id";

export class TenantAuthInfo {
  constructor(
    readonly tenantId: TenantId,
    readonly tenantAuth0ID: TenantAuth0ID
  ){}
}
