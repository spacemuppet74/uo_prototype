import { sp, PermissionKind } from "@pnp/sp";
import SpBaseApiConfig from "./spBaseConfig";

class SpDepartmentApi extends SpBaseApiConfig {
  constructor() {
    super();
  }

  fetchDepartments() {
    return this.web.lists
      .getByTitle("uo_roles")
      .items.orderBy("Title")
      .get();
  }
}

const spDepartmentApi = new SpDepartmentApi();
export default spDepartmentApi;
